    let globalConfig = mainFunction();
    async function mainFunction() {
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
    var getBrandId = new Promise(function(resolve, reject){
        chrome.storage.sync.get("brandId",  ({brandId})=> {
            resolve(brandId);
        })
    });
    var getThemeId = new Promise(function(resolve, reject){
        chrome.storage.sync.get("themeId",  ({themeId})=> {
            resolve(themeId);
        })
    });
    const tenant = await getTenant;
    const token = await getToken;
    const verified = await getVerfication;
    const brandId = await getBrandId;
    const themeId = await getThemeId;

    let configObj = {
        tenant,
        token,
        verified,
        brandId,
        themeId
    }
    if(verified) {
        tenantInput.value = tenant;
        tokenInput.value = token;
        tenantInput.disabled = false;
        tokenInput.disabled = false;
    }
    console.log('configObj in main Function: ', configObj);
    return configObj;
}
async function construct() {
    let configObj = await mainFunction();
    if(!configObj.verified) {
        tabcontent4.style.display = "block";
        tabcontent1.style.disabled = true;
        tabcontent2.style.disabled = true;
        tabcontent3.style.disabled = true;
        return false; 
    } else {
        tabcontent1.style.display= "block";
        tablinks1.style.backgroundColor = "white";
        tablinks1.style.color = "black";
        return true;
    }
}
construct();
tablinks1.addEventListener("click", async function() {
    let config = await construct();
    if(config) {
        tabcontent1.style.display = "none";
        tabcontent2.style.display = "none";
        tabcontent3.style.display = "none";
        tabcontent4.style.display = "none";
    
        tablinks1.className = tablinks1.className.replace(" active", "");
        tablinks2.className = tablinks2.className.replace(" active", "");
        tablinks3.className = tablinks3.className.replace(" active", "");
        tablinks4.className = tablinks4.className.replace(" active", "");
    
        tabcontent1.style.display = "block";
        tablinks1.style.backgroundColor = "white";
        tablinks2.style.backgroundColor = "#ECECEC";
        tablinks3.style.backgroundColor = "#ECECEC";
        tablinks4.style.backgroundColor = "#ECECEC";        
        
        tablinks1.style.color = "black";
        tablinks2.style.color = "#193465";
        tablinks3.style.color = "#193465";
        tablinks4.style.color = "#193465";
    }

    // evt.currentTarget.className += " active";
  })

  tablinks2.addEventListener("click", async function() {
    let config = await construct();
    if(config) {
        tabcontent1.style.display = "none";
        tabcontent2.style.display = "none";
        tabcontent3.style.display = "none";
        tabcontent4.style.display = "none";

        tablinks1.className = tablinks1.className.replace(" active", "");
        tablinks2.className = tablinks2.className.replace(" active", "");
        tablinks3.className = tablinks3.className.replace(" active", "");
        tablinks4.className = tablinks4.className.replace(" active", "");
    
        tabcontent2.style.display = "block";

        tablinks1.style.backgroundColor = "#ECECEC";
        tablinks2.style.backgroundColor = "white";
        tablinks3.style.backgroundColor = "#ECECEC";
        tablinks4.style.backgroundColor = "#ECECEC";
        
        
        tablinks1.style.color = "#193465";
        tablinks2.style.color = "black";
        tablinks3.style.color = "#193465";
        tablinks4.style.color = "#193465";
    }
    // evt.currentTarget.className += " active";
  })
  tablinks3.addEventListener("click", async function() {
    let config = await construct();
    if(config) {
        tabcontent1.style.display = "none";
        tabcontent2.style.display = "none";
        tabcontent3.style.display = "none";
        tabcontent4.style.display = "none";
    
        tablinks1.className = tablinks1.className.replace(" active", "");
        tablinks2.className = tablinks2.className.replace(" active", "");
        tablinks3.className = tablinks3.className.replace(" active", "");
        tablinks4.className = tablinks4.className.replace(" active", "");
    
        tabcontent3.style.display = "block";
        
        
        tablinks1.style.backgroundColor = "#ECECEC";
        tablinks2.style.backgroundColor = "#ECECEC";
        tablinks3.style.backgroundColor = "white";
        tablinks4.style.backgroundColor = "#ECECEC";
        
        tablinks1.style.color = "#193465";
        tablinks2.style.color = "#193465";
        tablinks3.style.color = "black";
        tablinks4.style.color = "#193465";
    }
    // evt.currentTarget.className += " active";
  })

  tablinks4.addEventListener("click", async function() {
    let config = await construct();
    if(config) {
        tabcontent1.style.display = "none";
        tabcontent2.style.display = "none";
        tabcontent3.style.display = "none";
        tabcontent4.style.display = "none";
    
        tablinks1.className = tablinks1.className.replace(" active", "");
        tablinks2.className = tablinks2.className.replace(" active", "");
        tablinks3.className = tablinks3.className.replace(" active", "");
        tablinks4.className = tablinks4.className.replace(" active", "");
    
        tabcontent4.style.display = "block";
        
        
        tablinks1.style.backgroundColor = "#ECECEC";
        tablinks2.style.backgroundColor = "#ECECEC";
        tablinks3.style.backgroundColor = "#ECECEC";
        tablinks4.style.backgroundColor = "white";
        
        tablinks1.style.color = "#193465";
        tablinks2.style.color = "#193465";
        tablinks3.style.color = "#193465";
        tablinks4.style.color = "black";
    }

    // evt.currentTarget.className += " active";
  })

upload.addEventListener("click", async function() {
    let myHeaders = new Headers();
    let configObj = await mainFunction();
    let backgroundUrl = backgroundInput.value;
    let logoUrl = logoInput.value;
    configObj.backgroundUrl = backgroundUrl;
    configObj.logoUrl = logoUrl;
    console.log("checking configObj", configObj);
    let bgEntryLength = configObj.backgroundUrl.length > 3;
    let lgEntryLength = configObj.logoUrl.length > 3;
    console.log("bgEntryLength: ", bgEntryLength);
    console.log("logoEntryLength: ", lgEntryLength);

    if(bgEntryLength && lgEntryLength) {
        console.log("DOUBLE");
        uploadImages(configObj);
    } else if(bgEntryLength && !lgEntryLength) {
        console.log("SIngle");
        onlyUploadImages(configObj);
        chrome.tabs.reload();
    }else if(!bgEntryLength && lgEntryLength) {
        console.log("ngle");
        onlyUploadLogo(configObj); 
        chrome.tabs.reload();
    } else {
        alert("Must enter valid URL");
    }
   
})


async function onlyUploadImages(configObj) {
    console.log("CONFIG OBJ: ", configObj);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${configObj.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");

    const bgUrlToObject= async()=> {
        const image = configObj.backgroundUrl;
        console.log("_______IMG_:::", image);
        // const image = url;
        const response = await fetch(image);
        // here image is url/location of image
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpg', {type: blob.type});
        return file;
      }
    var file = await bgUrlToObject();
    

    console.log('file: ', file);
    
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${configObj.tenant}/api/v1/brands/${configObj.brandId}/themes/${configObj.themeId}/background-image`, requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log("BG UPDATED");
        chrome.tabs.reload();
        return result;
    })
    .catch(error => console.log('error', error));
}
async function onlyUploadLogo(configObj) {
    console.log("IN LOGO: ");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${configObj.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");

    const logoUrlToObject= async()=> {
        const image = configObj.logoUrl;
        // const image = url;
        const response = await fetch(image);
        // here image is url/location of image
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpg', {type: blob.type});
        return file;
      }
    var file = await logoUrlToObject();
    

    console.log('file: ', file);
    
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    // https://d1beu2ggn1u3f9uol1b6fkzb-wpengine.netdna-ssl.com/wp-content/uploads/logo.png
    // https://cdn.w600.comps.canstockphoto.com/construction-background-clipart_csp18453712.jpg

    fetch(`${configObj.tenant}/api/v1/brands/${configObj.brandId}/themes/${configObj.themeId}/logo`, requestOptions)
    .then(response => response.text())
    .then(result => {
        chrome.tabs.reload();
        return result;
    })
    .catch(error => console.log('error', error));
}

async function uploadImages(configObj) {
    console.log("CONFIG OBJ: ", configObj);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${configObj.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");

    const bgUrlToObject= async()=> {
        const image = configObj.backgroundUrl;
        // const image = url;
        const response = await fetch(image);
        // here image is url/location of image
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpg', {type: blob.type});
        return file;
      }
    var file = await bgUrlToObject();
    

    console.log('file: ', file);
    
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${configObj.tenant}/api/v1/brands/${configObj.brandId}/themes/${configObj.themeId}/background-image`, requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log("BG UPDATED");
        uploadLogo(configObj);
    })
    .catch(error => console.log('error', error));
}

async function uploadLogo(configObj) {
    console.log("IN LOGO: ", configObj.logoUrl);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${configObj.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");

    const logoUrlToObject= async()=> {
        const image = configObj.logoUrl;
        // const image = url;
        const response = await fetch(image);
        // here image is url/location of image
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpg', {type: blob.type});
        return file;
      }
    var file = await logoUrlToObject();
    

    console.log('file: ', file);
    
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    // https://d1beu2ggn1u3f9uol1b6fkzb-wpengine.netdna-ssl.com/wp-content/uploads/logo.png
    // https://cdn.w600.comps.canstockphoto.com/construction-background-clipart_csp18453712.jpg

    fetch(`${configObj.tenant}/api/v1/brands/${configObj.brandId}/themes/${configObj.themeId}/logo`, requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);
        chrome.tabs.reload();

        return result;
    })
    .catch(error => console.log('error', error));
}

verify.addEventListener("click", async function() {
    let myHeaders = new Headers();
    let tenantEntry = tenantInput.value;
    let tokenEntry  = tokenInput.value; 
    myHeaders.append("Authorization", `SSWS ${tokenEntry}`);
    myHeaders.append("Cookie", "JSESSIONID=857245CDDFCCB4DEAA4206ADE3C0AF83");
    let url = tenantEntry + "/api/v1/brands";

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    tokeningSystem = await mainFunction();
    console.log("TOKENING SYSTEM: ", tokeningSystem);

    verification(url, requestOptions, tenantEntry, tokenEntry);
})
function verification(url, requestOptions, tenantEntry, tokenEntry) {
    console.log("Making the call");
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
        // alert("Verification Successful");
        var resultObj = JSON.parse(result);
        console.log('Verification Successful', resultObj[0].id);
        chrome.storage.sync.set({"tenant": tenantEntry}, function() {
            console.log("Tenant Saved!");
        })
        chrome.storage.sync.set({"token": tokenEntry}, function() {
            console.log("Token Saved!");
        })
        chrome.storage.sync.set({"verified": true}, function() {
            console.log("Verified Saved!");
        })
        chrome.storage.sync.set({"brandId": resultObj[0].id}, function() {
            console.log("Brand Id Saved!");
        })
        let themeObjConfig = {};
        themeObjConfig.brandId = resultObj[0].id;
        themeObjConfig.tenantEntry = tenantEntry;
        themeObjConfig.tokenEntry = tokenEntry;
        return themeObjConfig; 

    })
    .then(themeObjConfig => {
        console.log("RESULT OBJ: ", themeObjConfig);
        getThemeId(themeObjConfig);
    })
    .catch(error => console.log('Verification Failed'));
}

function getThemeId(themeObjConfig) {
    console.log("IN THEME ID: ", themeObjConfig);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${themeObjConfig.tokenEntry}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    console.log(themeObjConfig.tenantEntry);
    fetch(`${themeObjConfig.tenantEntry}/api/v1/brands/${themeObjConfig.brandId}/themes`, requestOptions)
      .then(response => response.text())
      .then(result => {
            console.log("RESULT: ", result);
            var resultObj = JSON.parse(result);
            console.log('resultObj: ', resultObj);
            let themeId = resultObj[0].id; 
            chrome.storage.sync.set({"themeId": themeId}, function() {
                console.log("Theme Id Saved!");
            })
      })
      .catch(error => console.log('error', error));
}
chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    var allValues= Object.values(items);
    console.log(allKeys);
    console.log(allValues);
});



image1.addEventListener("click", async function() {
    console.log(image1.src);
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image1.src;
    // config.logoUrl = "https://penji.co/wp-content/uploads/2019/06/standard-chartered-finance-logo-design.jpg";
    config.logoUrl = "https://www.fblake.bank/assets/files/Ywd7MErv/FBOTL_App%20Images_Apple_Store_Icon.jpg"
    uploadImages(config);
});
image2.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image2.src;
    config.logoUrl = "https://www.fblake.bank/assets/files/Ywd7MErv/FBOTL_App%20Images_Apple_Store_Icon.jpg"
    uploadImages(config);
})
image3.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image3.src;
    config.logoUrl = "https://www.fblake.bank/assets/files/Ywd7MErv/FBOTL_App%20Images_Apple_Store_Icon.jpg"
    uploadImages(config);
})
image4.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image4.src;
    config.logoUrl = "https://www.nejmcareercenter.org/getasset/475607b1-6d24-4291-a16a-e895ec099542/";
    uploadImages(config);
});
image5.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image5.src;
    config.logoUrl = "https://www.nejmcareercenter.org/getasset/475607b1-6d24-4291-a16a-e895ec099542/";
    console.log("CONFIG AFTER UPDATE: ", config);
    uploadImages(config);

})
image6.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image6.src;
    config.logoUrl = "https://www.nejmcareercenter.org/getasset/475607b1-6d24-4291-a16a-e895ec099542/";
    uploadImages(config);

})
image7.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image7.src;
    config.logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKUrKQ1JFkRT8MWTgLVZ3vP2zurzwvezHSrWrcWLJCNDl9TLIRFl-v7etSI7FXuGYaEc&usqp=CAU";
    uploadImages(config);
});
image8.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image8.src;
    config.logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKUrKQ1JFkRT8MWTgLVZ3vP2zurzwvezHSrWrcWLJCNDl9TLIRFl-v7etSI7FXuGYaEc&usqp=CAU";
    uploadImages(config);
})
image9.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image9.src;
    config.logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKUrKQ1JFkRT8MWTgLVZ3vP2zurzwvezHSrWrcWLJCNDl9TLIRFl-v7etSI7FXuGYaEc&usqp=CAU";
    uploadImages(config);
})

image10.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image10.src;
    config.logoUrl = "https://www.pinclipart.com/picdir/big/8-88658_support-groups-dbsa-hands-together-logo-clipart.png";
    uploadImages(config);
});
image11.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image11.src;
    config.logoUrl = "https://www.pinclipart.com/picdir/big/8-88658_support-groups-dbsa-hands-together-logo-clipart.png";
    uploadImages(config);
})
image12.addEventListener("click", async function() {
    let config = await mainFunction();
    console.log("Global Config: ", config);
    config.backgroundUrl = image12.src;
    config.logoUrl = "https://www.pinclipart.com/picdir/big/8-88658_support-groups-dbsa-hands-together-logo-clipart.png";
    uploadImages(config);
})



oinSearch.addEventListener("keyup", async function(e) {
   
   let search = e.target.value;
   if(search !== '') {
    searchPlaceHolder.style.display="none";
    searchResults.style.display = "block";
   } else {
    searchPlaceHolder.style.display="block";
    searchResults.style.display = "none";
   }
  
   console.log('search: ', search);
   fetch(`https://www.okta.com/oktaapi/integration/search?search=${search}`)
    .then(response => response.text())
    .then(result => {
        let jsonResult = JSON.parse(result);
        displayResult(jsonResult.results);
    })
})

function displayResult(results) {
    console.log("In Display Results: ", results);
    tableBody.innerHTML = '';
    for(result of results) {
        console.log("Result: ", result);
        let access = result.access.split(',');
        let integration = result.integration;
        let integrationRefined = integration.replace(/\s/g, "-");
        console.log('newSTRING: ', integrationRefined);
        console.log(access);
        let row= document.createElement('tr');

        let saml = access.find(a =>a.includes("SAML"));
        let swa = access.find(a =>a.includes("SWA"));
        let provisioning = access.find(a =>a.includes("Provisioning"));
        let workflows = access.find(a =>a.includes("Workflows"));
        console.log("SAML: ", saml);
        console.log("SWA: ", swa);
        console.log("Provisioning: ", provisioning);
        console.log("workflows: ", workflows);

        
        let td1= document.createElement("td");
        let targetLink = `https://www.okta.com/integrations/${integrationRefined}/#overview`;
        td1.setAttribute('id', 'logoTd')
        let imgDiv = document.createElement("div");
        let img = document.createElement("img");
        let aLink = document.createElement("a");
        aLink.setAttribute('href', targetLink);
        aLink.setAttribute('target', "_blank");
        img.setAttribute('id','searchImage');
        img.src = result.logo;
        imgDiv.appendChild(img);
        aLink.appendChild(imgDiv);
        td1.appendChild(aLink);

        let td2 = document.createElement('td');
        let name = document.createTextNode(result.integration);
        td2.appendChild(name);
        td2.setAttribute('id', 'nameField');
        
        let td3 = document.createElement('td');
        if(saml) {
            let icon = document.createElement('i');
            icon.setAttribute('class', 'fa fa-times');
            td3.appendChild(icon);
        }

        let td4 = document.createElement('td');
        if(swa) {
            let icon = document.createElement('i');
            icon.setAttribute('class', 'fa fa-times');
            td4.appendChild(icon);
        }
        
        let td5 = document.createElement('td');
        if(provisioning) {
            let icon = document.createElement('i');
            icon.setAttribute('class', 'fa fa-times');
            td5.appendChild(icon);
        }

        let td6 = document.createElement('td');
        if(workflows) {
            let icon = document.createElement('i');
            icon.setAttribute('class', 'fa fa-times');
            td6.appendChild(icon);
        }
        // <i class="fa fa-times"></i>
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);
        tableBody.appendChild(row);
    }
}