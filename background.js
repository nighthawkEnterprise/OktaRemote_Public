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

async function construct() {
   const tenant = await getTenant;
   const token = await getToken;
   const brandId = await getBrandId;
   const themeId = await getThemeId;
   const verified = await getVerfication;
   let config = {
       tenant,
       token,
       brandId,
       themeId,
       verified
   }
   console.log('Tenant: ', tenant);
   console.log('Token: ', token);
   console.log('BrandId: ', brandId);
   console.log('ThemeId: ', themeId);
   console.log('Verified: ', verified);
   return config;

}
// construct();

// async function createRandos() {
//    let x = 1;
//    let config = await construct();
//    var myHeaders = new Headers();
//    console.log("IN CREATE RANDOS : ", config);
//    myHeaders.append("Authorization", `SSWS ${config.token}`);
//    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");
//    myHeaders.append("Content-Type", "application/json");
//    let profile = JSON.stringify({
//        "profile": {
//            "firstName": "Demo",
//            "lastName": `U${x}`,
//            "email": `demo.u${x}@atko.com`,
//            "login": `demo.u${x}@atko.com`
//        }
//    });
//    var requestOptions = {
//        method: 'POST',
//        headers: myHeaders,
//        body: profile,
//        redirect: 'follow'
//    };

//    fetch(`${config.tenant}/api/v1/users?activate=false`, requestOptions)
//    .then(response => response.text())
//    .then(result => {
//        console.log("Result: ", result);
//    })
//    .catch(err => console.log(err));
// }
// createRandos();



async function createAndDeleteUsers(userCount = 1) {
   let oktaRemoteConfig = await construct();
   async function oktaApiCall(method = 'POST', apiPath = '/api/v1/users?activate=false', data = undefined) {
      var requestHeaders = new Headers();
      requestHeaders.append("Authorization", `SSWS ${oktaRemoteConfig.token}`);
      requestHeaders.append("Content-Type", "application/json");
      requestHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709"); // Used for Okta Remote
      var requestOptions = {
         method: method,
         headers: requestHeaders,
         body: !!data ? JSON.stringify(data) : undefined,
         redirect: 'follow'
      };
      return await fetch(`${oktaRemoteConfig.tenant}${apiPath}`, requestOptions)
         .then(response => response.json())
         .then(result => {
            console.log("Result: ", result);
            return result;
         })
         .catch(err => console.warn(err));
   }
   // Team members - User, Manager, team member (IT approver, HR approver)
   function fakeUser(x){
      return {
         profile: {
               firstName: "Demo",
               lastName: `U${x}`,
               email: `demo.u${x}@atko.com`,
               login: `demo.u${x}@atko.com`
         }
      }
   }
   async function createUser(userProfile) {
      return await oktaApiCall('POST','/api/v1/users?activate=false', userProfile)
   }
   async function deleteUser(userId) {
      await oktaApiCall('DELETE', `/api/v1/users/${userId}`); // One to deactivate
      await oktaApiCall('DELETE', `/api/v1/users/${userId}`); // One to delete
   }
   async function createAndDeleteUser(x = 1) {
      let newUser = fakeUser(x) // Generate a numbered fake user
      // console.log('creating user ', newUser);
      let createdUser = await createUser(newUser) // Create the user
      // console.log('created a user ', createdUser);
      console.log('deleting user ', createdUser.id);
      await deleteUser(createdUser.id); 
      return createdUser; 
      // return newUser;
   }
   await Promise.all([...Array(userCount).keys()].map(async (x) => { 
      // Create an array of size userCount and map it to new Promises
      return createAndDeleteUser(x+1);
    })).then(userList => {
      console.log(`created and deleted ${userList.length} users `, userList);
    }).catch(e => {
      console.warn(e);
    })
}
createAndDeleteUsers(100);