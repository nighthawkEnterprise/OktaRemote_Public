var getToken = new Promise(function(resolve, reject){
    chrome.storage.sync.get("token",  ({token})=> {
        resolve(token);
    })
});
var getTenant = new Promise(function(resolve, reject){
    chrome.storage.sync.get("tenant",  ({tenant})=> {
        resolve(tenant);
    })
});
var getVerfication = new Promise(function(resolve, reject){
    chrome.storage.sync.get("verified",  ({verified})=> {
        resolve(verified);
    })
});


async function construct() {
    const tenant = await getTenant;
    const token = await getToken;
    // const brandId = await getBrandId;
    // const themeId = await getThemeId;
    const verified = await getVerfication;
    let config = {
        tenant,
        token,
        verified
    }
    console.log('Tenant: ', tenant);
    console.log('Token: ', token);
    return config;

}
construct();


// Application removal application
async function dupeRemoval() {
    console.log("Making Create Rando Call");
    let config = await construct();
    var myHeaders = new Headers();
    console.log("IN CREATE RANDOS : ", config);
    myHeaders.append("Authorization", `SSWS ${config.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");
    myHeaders.append("Content-Type", "application/json");
    let changer= Math.floor(Math.random() * 30000);
    
    let profile = JSON.stringify({
        "profile": {
            "firstName": "Isaaciah",
            "lastName": "Brockian",
            "email": `isaac${changer}@gmail.com`,
            "login": `isaac${changer}@gmail.com`
        }
    });
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${config.tenant}/api/v1/apps?limit=100`, requestOptions)
    .then(response => response.text())
    .then(result => {
        // console.log("Result: ", result);
        let resultJSON = JSON.parse(result);
        console.log('resultJSON: ', resultJSON);
        let dupeApps = [];
        // console.log("result.JSON: ", resultJSON);
        for(let i = 0; i < resultJSON.length; i++) {
            // console.log('App label: ', resultJSON[i].label);
            if((resultJSON[i].label).includes(')')) {
                // console.log('Dupe App!', resultJSON[i]);
                dupeApps.push(resultJSON[i]);
            }
        }
        console.log("Dupe Apps: ", dupeApps);
        deactivateApps(dupeApps);
    })
    function deactivateApps(dupeApps) {
        // console.log('in delete apps', dupeApps);
    
        var requestOptionsDeactivate = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: {}
        };
        for(let i = 0; i < dupeApps.length; i++ ) {
            let id = dupeApps[i].id;
            fetch(`${config.tenant}/api/v1/apps/${id}/lifecycle/deactivate`, requestOptionsDeactivate)
            .then(response => response.text())
            .then(result => {
                // console.log("Result: ", result);
                return result
            })
            .then(result => deleteApps(id))
            .catch(err => console.log(err));
        }
        deleteApps(dupeApps);
    }
    function deleteApps(id) {
        // console.log(" IN DELETE APP");
        var requestOptionsDelete = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
            
        fetch(`${config.tenant}/api/v1/apps/${id}`, requestOptionsDelete)
        .then(response => response.text())
        .then(result => {
            console.log("Result: ", result);
            
        })
        .catch(err => console.log(err));
    }
}

async function rateLimitTest() {
    let config = await construct();
    var myHeaders = new Headers();
    console.log("In Rate Limit Function: ", config);
    myHeaders.append("Authorization", `SSWS ${config.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    setInterval(getUsers, 1200)
    let i = 1; 
    function getUsers() {
        
        fetch(`${config.tenant}/api/v1/users`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let resultJSON = JSON.parse(result);
            console.log(`Call ${i}: `, resultJSON);
            i++;    
        })
        .catch(err => err)
    }
}

// dupeRemoval();

rateLimitTest();
