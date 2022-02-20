// GOOGLE CHROME POPUP ISSUES FOR SECONDARY MONITORS
if (
    // From testing the following conditions seem to indicate that the popup was opened on a secondary monitor
    window.screenLeft < 0 ||
    window.screenTop < 0 ||
    window.screenLeft > window.screen.width ||
    window.screenTop > window.screen.height
  ) {
    chrome.runtime.getPlatformInfo(function (info) {
      if (info.os === 'mac') {
        const fontFaceSheet = new CSSStyleSheet()
        fontFaceSheet.insertRule(`
          @keyframes redraw {
            0% {
              opacity: 1;
            }
            100% {
              opacity: .99;
            }
          }
        `)
        fontFaceSheet.insertRule(`
          html {
            animation: redraw 1s linear infinite;
          }
        `)
        document.adoptedStyleSheets = [
          ...document.adoptedStyleSheets,
          fontFaceSheet,
        ]
      }
    })
  }    
 // GOOGLE CHROME EXTENSION POPUP ISSUE 
//  chrome.identity.launchWebAuthFlow(
//     {'url': '<url-to-do-auth>', 'interactive': true},
//     function(redirect_url) { console.log("redirect_url") });
    

var authClient = new OktaAuth({issuer: 'https://konkoheights.okta.com', clientId: "0oa3ujhpwpzSyUsAF5d7", redirectUri: "https://lcjafejhcahcaaklgpdafhfkaaajimkn.chromiumapp.org"});
console.log("AUTHCLIENT: ", authClient);
authClient.session.exists().then(async function(exists) {
    if(exists) {
        console.log("exists!!");
        let token = await authClient.token.getWithPopup();
        console.log("TOKEN: ", token);
        // try {
        //     let token = await authClient.token.getWithPopup();
        //     console.log("token: ", token);
        // }
        // catch(err) {
        //     console.log("error: ", err);
        // }
    } else {
        console.log("DOES NOT Exists");
        try {
            let token = await authClient.token.getWithoutPrompt();
            console.log("token: ", token);
        }
        catch(err) {
            console.log("error: ", err);
        }
    }
});
// Name of session is called SID 
// chrome.cookies.getAll(
//     details: CookieDetails,
//     callback?: function,
//   )
// console.log("Session STORAGE: ", sessionStorage);
// console.log("LOCAL STORAGE: ", localStorage);
chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    var allValues= Object.values(items);
    console.log("allkeys: ", allKeys);
    console.log("All Values: ", allValues);
});
async function checkVerification() {
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
    const brandId = await getBrandId;
    const themeId = await getThemeId;
    const verified = await getVerfication;
    let configObj = 
    {
        tenant,
        token,
        brandId,
        themeId,
        verified,
    }
    if(configObj.verified) {
        constructVerification(configObj);
    }
}
checkVerification();
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
    const brandId = await getBrandId;
    const themeId = await getThemeId;
    const verified = await getVerfication;

    let configObj = {
        tenant,
        token,
        brandId,
        themeId,
        verified
    }
    if(verified) {
        tenantInput.value = tenant;
        tokenInput.value = token;
        configObj.initialVerification = false; 
        verifiedSuccessfully(configObj);
    } else {
        verifiedUnsuccessfully();
    }
    return configObj;
}
async function construct() {
    let configObj = await mainFunction();
    if(!configObj.verified) {
        tabcontent4.style.display = "block";
        tablinks1.style.display = 'none';
        tablinks2.style.display= 'none';
        tablinks5.style.display = 'none';
        tablinks6.style.display = 'none';
        tablinks7.style.display = 'none';
        tablinks8.style.display = 'none';


        return false; 
    } else {
        resetLinks();
        tablinks1.style.display = 'block';
        tablinks2.style.display= 'block';
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
        resetLinks();
        tabcontent1.style.display = "block";
        tablinks1.className = tablinks1.className.replace(" active", "");
        tablinks1.style.backgroundColor = "white";
        tablinks1.style.color = "black";
    }
})
tablinks2.addEventListener("click", async function() {
    let config = await construct();
    if(config) {
        resetLinks();
        tabcontent2.style.display = "block";
        tablinks2.className = tablinks2.className.replace(" active", "");
        tablinks2.style.backgroundColor = "white";
        tablinks2.style.color = "black";
    }
})
tablinks3.addEventListener("click", async function() {
    resetLinks();
    tabcontent3.style.display = "block";
    tablinks3.className = tablinks3.className.replace(" active", "");
    tablinks3.style.backgroundColor = "white";
    tablinks3.style.color = "black";
})
tablinks4.addEventListener("click", async function() {
    resetLinks();
    tabcontent4.style.display = "block";
    tablinks4.className = tablinks4.className.replace(" active", "");
    tablinks4.style.backgroundColor = "white";
    tablinks4.style.color = "black";
})
tablinks5.addEventListener("click", async function() {
    resetLinks();
    tabcontent5.style.display = "block";
    tablinks5.className = tablinks5.className.replace(" active", "");
    tablinks5.style.backgroundColor = "white";
    tablinks5.style.color = "black";
})
tablinks6.addEventListener("click", async function() {
    resetLinks();
    tabcontent6.style.display = "block";
    tablinks6.className = tablinks6.className.replace(" active", "");
    tablinks6.style.backgroundColor = "white";
    tablinks6.style.color = "black";
})
tablinks7.addEventListener("click", async function() {
    resetLinks();
    tabcontent7.style.display = "block";
    tablinks7.className = tablinks7.className.replace(" active", "");
    tablinks7.style.backgroundColor = "white";
    tablinks7.style.color = "black";
})
tablinks8.addEventListener("click", async function() {
    resetLinks();
    tabcontent8.style.display = "block";
    tablinks8.className = tablinks8.className.replace(" active", "");
    tablinks8.style.backgroundColor = "white";
    tablinks8.style.color = "black";
})
function resetLinks() {   
    tablinks1.style.backgroundColor = "#ECECEC";
    tablinks2.style.backgroundColor = "#ECECEC";
    tablinks3.style.backgroundColor = "#ECECEC";
    tablinks4.style.backgroundColor = "#ECECEC";
    tablinks5.style.backgroundColor = "#ECECEC";
    tablinks6.style.backgroundColor = "#ECECEC";
    tablinks7.style.backgroundColor = "#ECECEC";
    tablinks8.style.backgroundColor = "#ECECEC";

    tabcontent1.style.display = "none";
    tabcontent2.style.display = "none";
    tabcontent3.style.display = "none";
    tabcontent4.style.display = "none";
    tabcontent5.style.display = "none";
    tabcontent6.style.display = "none";
    tabcontent7.style.display = "none";
    tabcontent8.style.display = "none";

    tablinks1.style.color = "#193465";
    tablinks2.style.color = "#193465";
    tablinks3.style.color = "#193465";
    tablinks4.style.color = "#193465";
    tablinks5.style.color = "#193465";
    tablinks6.style.color = "#193465";
    tablinks7.style.color = "#193465";
    tablinks8.style.color = "#193465";
    
    
}

uploadImageDiv.addEventListener("click", async function() {
    let myHeaders = new Headers();
    let configObj = await mainFunction();
    uploadImageEntry.style.display = 'none';
    verificationLoaderImage.style.display = "block";
    let backgroundUrl = backgroundInputURL.value;
    configObj.backgroundUrl = backgroundUrl;
    uploadImagesEntry(configObj);
})
uploadIconDiv.addEventListener("click", async function() {
    let myHeaders = new Headers();
    let configObj = await mainFunction();
    uploadIconEntry.style.display = 'none';
    verificationLoaderIcon.style.display = "block";
    let logoURL = logoInputURL.value;
    configObj.logoUrl = logoURL;
    uploadLogoEntry(configObj);
})
async function uploadImagesEntry(configObj) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${configObj.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");

    const bgUrlToObject= async()=> {
        const image = configObj.backgroundUrl;
        const response = await fetch(image).catch(err => errorUploadImageCatch(err));
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpg', {type: blob.type});
        return file;
      }
    var file = await bgUrlToObject();
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
        let resultJSON = JSON.parse(result);       
        let errorFlagged = typeof(resultJSON.errorCode) != "undefined";
        if(!errorFlagged) { 
            uploadImageEntry.style.display = 'block';
            backgroundInputURL.style.border= "none";
            backgroundInputURL.value = "";
            backgroundInputURL.placeholder = "Enter background image url...";
            verificationLoaderImage.style.display = "none";
            chrome.tabs.reload();
        }  else {
            errorUploadImageCatch("Could not upload the image");
        }
    })
    .catch(error => errorUploadImageCatch(err));
}

function errorUploadImageCatch(err) {
    backgroundInputURL.style.borderLeft= "solid 1px red";
    backgroundInputURL.placeholder = "Image not supported by Okta API. Please try again!";
    backgroundInputURL.value = ""; 
    verificationLoaderImage.style.display="none";
    verificationLoaderIcon.style.display="none";
    uploadImageEntry.style.display = "block";
}
async function uploadLogoEntry(configObj) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${configObj.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");

    const logoUrlToObject= async()=> {
        const image = configObj.logoUrl;
        const response = await fetch(image).catch(err => errorUploadLogoCatch(err));
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpg', {type: blob.type});
        return file;
      }
    var file = await logoUrlToObject();
    var formdata = new FormData();
    formdata.append("file", file);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    fetch(`${configObj.tenant}/api/v1/brands/${configObj.brandId}/themes/${configObj.themeId}/logo`, requestOptions)
    .then(response => response.text())
    .then(result => {
        let resultJSON = JSON.parse(result);       
        let errorFlagged = typeof(resultJSON.errorCode) != "undefined";
        if(!errorFlagged) { 
            logoInputURL.style.border= 'none';
            verificationLoaderIcon.style.display = "none"; 
            logoInputURL.value = "";
            logoInputURL.placeholder = "Enter logo image url here...";
            uploadIconEntry.style.display = 'block';
            chrome.tabs.reload();
        } else {
            errorUploadLogoCatch("Could not upload Logo... Found in Post Request");
        }

        return result;
    })
    .catch(error => {
        alert('Error uploading logo', error);
        verificationLoaderIcon.style.display = "none"; 
        uploadIconEntry.style.display = 'block';
    });
}
function errorUploadLogoCatch(err) {
    logoInputURL.style.borderLeft= "solid 1px red";
    logoInputURL.placeholder = "Image not supported by Okta API. Please try again!";
    logoInputURL.value = ""; 
    verificationLoaderIcon.style.display="none";
    uploadImageEntry.style.display = "block";
    uploadIconEntry.style.display = "block";

}
async function onlyUploadImages(configObj) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${configObj.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");
    const bgUrlToObject= async()=> {
        const image = configObj.backgroundUrl;
        const response = await fetch(image).catch(err => errorUploadCatch(err));
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpeg', {type: blob.type});
        return file;
      }
    var file = await bgUrlToObject();
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
        configObj.loader.style.display="none";
        configObj.imageDiv.style.display="block";
        chrome.tabs.reload();
        return result;
    })
    .catch(err => {
        console.log("ERROR: ", err);
        alert("Error loading Page", err);
        configObj.loader.style.display="none";

    });
}
async function onlyUploadLogo(configObj) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${configObj.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");
    const bgUrlToObject= async()=> {
        const image = configObj.logoUrl;
        let fileName = "image.jpg";
        const response = await fetch(image).catch(err => errorUploadCatch(err));
        const blob = await response.blob();
        if(blob.type == 'image/jpeg' || blob.type == "image/jpg") {
            fileName = "image.jpeg";
        }
        if(blob.type == 'image/png') {
            fileName= "image.png";
        }
        const file = await new File([blob], fileName, {type: blob.type});
        return file;
      }
    var file = await bgUrlToObject();
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    console.log("About to upload: ", file, " with config Obj recieved as : ", configObj);
    fetch(`${configObj.tenant}/api/v1/brands/${configObj.brandId}/themes/${configObj.themeId}/logo`, requestOptions)
    .then(response => response.text())
    .then(result => {
        configObj.loader.style.display="none";
        configObj.logoImageDiv.style.display="block";
        chrome.tabs.reload();
        return result;
    })
    .catch(err => {
        console.log("ERROR: ", err);
        alert("Error loading Page", err);
        configObj.loader.style.display="none";
 
    });
}



async function uploadImages(configObj) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${configObj.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");

    const bgUrlToObject= async()=> {
        const image = configObj.backgroundUrl;
        const response = await fetch(image).catch(err => errorUploadCatch(err));
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpg', {type: blob.type});
        return file;
      }
    var file = await bgUrlToObject();
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
        uploadLogo(configObj);
    })
    .catch(error => console.log('error', error));
}
async function uploadLogo(configObj) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${configObj.token}`);
    myHeaders.append("Cookie", "JSESSIONID=468D45D6CF3DC140D4260BA605FAD709");
    const logoUrlToObject= async()=> {
        const image = configObj.logoUrl;
        const response = await fetch(image).catch(err => errorUploadCatch(err));
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpg', {type: blob.type});
        return file;
      }
    var file = await logoUrlToObject();

    
    var formdata = new FormData();
    formdata.append("file", file);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${configObj.tenant}/api/v1/brands/${configObj.brandId}/themes/${configObj.themeId}/logo`, requestOptions)
    .then(response => response.text())
    .then(result => {
        configObj.image.style.display="block";
        configObj.loader.style.display="none";
        chrome.tabs.reload();

        return result;
    })
    .catch(error => console.log('error', error));
}



function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }



edit.addEventListener("click", async function() {
    tenantInput.disabled = false;
    tokenInput.disabled= false;
    verify.style.display="block";
    edit.style.display="none";
})

verify.addEventListener("click", verifyCheck);

async function verifyCheck() {
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
    verification(url, requestOptions, tenantEntry, tokenEntry);
}
async function constructVerification(configObj) {
    let myHeaders = new Headers();
    let tenantEntry = configObj.tenant;
    let tokenEntry  = configObj.token; 
    myHeaders.append("Authorization", `SSWS ${tokenEntry}`);
    myHeaders.append("Cookie", "JSESSIONID=857245CDDFCCB4DEAA4206ADE3C0AF83");
    let url = tenantEntry + "/api/v1/brands";
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    verification(url, requestOptions, tenantEntry, tokenEntry);
    
}
async function verification(url, requestOptions, tenantEntry, tokenEntry) {
    let configObj = {
        url,
        requestOptions,
        tenantEntry,
        tokenEntry
    }
    configObj.initialVerification = true;
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {   
            var resultObj = JSON.parse(result);
            let errorCheck = typeof(resultObj.errorSummary);
            if(errorCheck == 'undefined') {
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
                verifiedSuccessfully(configObj); 
                return themeObjConfig; 
            } else {
                chrome.storage.sync.set({"verified": false}, function() {
                    console.log("Verified Saved!");
                })
                verifiedUnsuccessfully();
                throw resultObj;
            
            }
        })
        .then(themeObjConfig => {
            getThemeId(themeObjConfig);
        })
        .catch(error => {
            let errorVar = typeof error.errorSummary; 
            if(errorVar == 'undefined') {
                alert("Verification Failed, please make sure tenant is in the format https://{domain}.okta.com")
            } else {
                alert(error.errorSummary);
            }
            chrome.storage.sync.set({"verified": false}, function() {
                console.log("Verified Saved!");
            })
            verifiedUnsuccessfully();
            verify.innerText = "Retry Verification";
            verifyForm.style.boxShadow = "0px 0px 35px 0px rgba(255,127,127,0.84)";

    });
}
async function verifiedSuccessfully(configObj) {
    let brandVerified = typeof(configObj.brandId);
    let themeVerified = typeof(configObj.themeId);
    
    if(brandVerified != "undefined" && themeVerified != "undefined") {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `SSWS ${configObj.token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=932FCA694E42A78DBD0C39EE3A4F9191");
        
        var raw = JSON.stringify({
          "primaryColorHex": "#ebebed",
          "secondaryColorHex": "#FFFFFF",
          "signInPageTouchPointVariant": "BACKGROUND_IMAGE",
          "endUserDashboardTouchPointVariant": "WHITE_LOGO_BACKGROUND",
          "errorPageTouchPointVariant": "OKTA_DEFAULT",
          "emailTemplateTouchPointVariant": "OKTA_DEFAULT"
        });

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`${configObj.tenant}/api/v1/brands/${configObj.brandId}/themes/${configObj.themeId}`, requestOptions)
          .then(response => response.text())
          .then(result => console.log("Set appropriate settings"))
          .catch(error => console.log('error', error));
    }
    verifyForm.style.boxShadow =  '0px 0px 14px 0px rgba(144,238,144,0.68)';
    verify.style.display = "none";
    edit.style.display = "block";
    tablinks1.style.display = 'block';
    tablinks2.style.display= 'block';
    verifyForm.style.display = 'block';
    tenantInput.disabled = true;
    tokenInput.disabled= true;
    return true;
}
async function verifiedUnsuccessfully() {
    verifyForm.style.boxShadow = "0px 0px 35px 0px rgba(255,127,127,0.84)";
    verify.style.display = "block";
    edit.style.display = "none";
    tablinks1.style.display = 'none';
    tablinks2.style.display= 'none';
    verifyForm.style.display = 'block';
    tabcontent1.style.display='none';
    tabcontent2.style.display='none';
    tabcontent3.style.display='none';
    tabcontent4.style.display='block';
    tenantInput.disabled = false;
    tokenInput.disabled= false;
    return true;
}
function getThemeId(themeObjConfig) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `SSWS ${themeObjConfig.tokenEntry}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`${themeObjConfig.tenantEntry}/api/v1/brands/${themeObjConfig.brandId}/themes`, requestOptions)
      .then(response => response.text())
      .then(result => {
            var resultObj = JSON.parse(result);
            let themeId = resultObj[0].id; 
            chrome.storage.sync.set({"themeId": themeId}, function() {
            })
            mainFunction();
      })
      .catch(error => console.log('error', error));
}
image1.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image1.src;
    image1.style.display= "none";
    verificationLoader.style.display = "block";
    image1Box.style.backgroundColor = "white";
    config.image = image1;
    config.loader =  verificationLoader;
    verificationLoader.style.backgroundColor = "white";
    config.logoUrl = "https://www.fblake.bank/assets/files/Ywd7MErv/FBOTL_App%20Images_Apple_Store_Icon.jpg"
    uploadImages(config);
});
image2.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image1.src;
    image2.style.display= "none";
    verificationLoader2.style.display = "block";
    image1Box.style.backgroundColor = "white";
    config.image = image2;
    config.backgroundUrl = image2.src;
    config.loader = verificationLoader2;

    config.logoUrl = "https://www.fblake.bank/assets/files/Ywd7MErv/FBOTL_App%20Images_Apple_Store_Icon.jpg"
    uploadImages(config);
})
image3.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image3.src;
    config.logoUrl = "https://www.fblake.bank/assets/files/Ywd7MErv/FBOTL_App%20Images_Apple_Store_Icon.jpg"
    image3.style.display= "none";
    verificationLoader3.style.display = "block";
    image2Box.style.backgroundColor = "white";
    config.loader = verificationLoader3;

    config.image = image3;

    uploadImages(config);
})
image4.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image4.src;
    config.logoUrl = "https://www.nejmcareercenter.org/getasset/475607b1-6d24-4291-a16a-e895ec099542/";
    image4.style.display= "none";
    verificationLoader4.style.display = "block";
    image3Box.style.backgroundColor = "white";
    config.image = image4;
    config.loader = verificationLoader4;

    uploadImages(config);
});
image5.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image5.src;
    config.logoUrl = "https://www.nejmcareercenter.org/getasset/475607b1-6d24-4291-a16a-e895ec099542/";    
    config.loader = verificationLoader5;
    image5.style.display= "none";
    verificationLoader5.style.display = "block";
    image1Box.style.backgroundColor = "white";
    config.image = image5;
    uploadImages(config);
})
image6.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image6.src;
    config.logoUrl = "https://www.nejmcareercenter.org/getasset/475607b1-6d24-4291-a16a-e895ec099542/";
    config.loader = verificationLoader6;
    
    image6.style.display= "none";
    verificationLoader6.style.display = "block";
    image1Box.style.backgroundColor = "white";
    config.image = image6;

    uploadImages(config);

})
image7.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image7.src;
    config.logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKUrKQ1JFkRT8MWTgLVZ3vP2zurzwvezHSrWrcWLJCNDl9TLIRFl-v7etSI7FXuGYaEc&usqp=CAU";
    config.loader = verificationLoader7;
    image7.style.display= "none";
    verificationLoader7.style.display = "block";
    image1Box.style.backgroundColor = "white";
    config.image = image7;
    uploadImages(config);
});
image8.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image8.src;
    config.logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKUrKQ1JFkRT8MWTgLVZ3vP2zurzwvezHSrWrcWLJCNDl9TLIRFl-v7etSI7FXuGYaEc&usqp=CAU";
    config.loader = verificationLoader8; 
    image8.style.display= "none";
    verificationLoader8.style.display = "block";
    image1Box.style.backgroundColor = "white";
    config.image = image8;
    uploadImages(config);
})
image9.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image9.src;
    config.logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKUrKQ1JFkRT8MWTgLVZ3vP2zurzwvezHSrWrcWLJCNDl9TLIRFl-v7etSI7FXuGYaEc&usqp=CAU";
    config.loader = verificationLoader9;
    image9.style.display= "none";
    verificationLoader9.style.display = "block";
    image9Box.style.backgroundColor = "white";
    config.image = image9;
    uploadImages(config);
})
image10.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image10.src;
    config.logoUrl = "https://www.pinclipart.com/picdir/big/8-88658_support-groups-dbsa-hands-together-logo-clipart.png";
    config.loader = verificationLoader10;
    image10.style.display= "none";
    verificationLoader10.style.display = "block";
    image1Box.style.backgroundColor = "white";
    config.image = image10;
    uploadImages(config);
});
image11.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image11.src;
    config.logoUrl = "https://www.pinclipart.com/picdir/big/8-88658_support-groups-dbsa-hands-together-logo-clipart.png";
    config.loader = verificationLoader11; 
    image11.style.display= "none";
    verificationLoader11.style.display = "block";
    image1Box.style.backgroundColor = "white";
    config.image = image11;
    uploadImages(config);
})
image12.addEventListener("click", async function() {
    let config = await mainFunction();
    config.backgroundUrl = image12.src;
    config.logoUrl = "https://www.pinclipart.com/picdir/big/8-88658_support-groups-dbsa-hands-together-logo-clipart.png";
    config.loader = verificationLoader12;    
    image12.style.display= "none";
    verificationLoader12.style.display = "block";
    image1Box.style.backgroundColor = "white";
    config.image = image12;
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
    fetch(`https://www.okta.com/oktaapi/integration/search?search=${search}`)
    .then(response => response.text())
    .then(result => {
        let jsonResult = JSON.parse(result);
        displayResult(jsonResult.results);
    })
})

backgroundInputSearch.addEventListener("keyup", debounce(saveInput, 400 ));
function debounce( callback, delay ) {
    let timeout;
    return function() {
        clearTimeout( timeout );
        timeout = setTimeout( callback, delay );
    }
}
async function saveInput(e){
    verificationLoadersOn();
    let search = backgroundInputSearch.value;
    search += " wallpaper";
    fetch(`https://serpapi.com/search.json?q=${search}&tbm=isch&ijn=0&tbs=itp:photos,isz:l&api_key=f5afc2bb0a4ba248ddf7494f8734116c2a983df10d3da2086c80fd858be405b8`)
        .then(response => response.text())
        .then(result => {
            let resultJson = JSON.parse(result);
            let imageResults = resultJson.images_results;
            sortImages(imageResults);
        })
}
async function sortImages(results) {
    let imageCount = 0;
    for(let i = 0; imageCount < 10; i++) {
    const imageToFile= async()=> {
        const image = results[i].original;
        const response = await fetch(image).catch(err => err);
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpg', {type: blob.type});
        return file;
      }
      var file = await imageToFile();
      if(file.type == 'image/jpeg' || file.type == 'image/png') {
        imageCount++;
        displayImages(results[i].original, imageCount);
      }
    }
}
function displayImages(results,count) {
    let resultCount = count + 6; 
    if(resultCount > 10 ) {
        resultCount = resultCount- 10; 
    }
    let el = `results${resultCount}`;
    let element = document.getElementById(`${el}`);
    let verficationLoaderId = resultCount + 12;
    if(verficationLoaderId > 22) {
        verficationLoaderId = verificationLoaderId - 10;
    } 
    let verficationLoaderString = `verificationLoader` + verficationLoaderId;
    let imageResultString = `imageResult` + resultCount; 
    element.innerHTML = `<img id=${imageResultString} src=${results} /> <div id=${verficationLoaderString}></div>`;
}
function displayResult(results) {
    tableBody.innerHTML = '';
    for(result of results) {
        let access = result.access.split(',');
        let integration = result.integration;
        let integrationRefined = integration.replace(/\s/g, "-");
        let row= document.createElement('tr');
        let saml = access.find(a =>a.includes("SAML"));
        let swa = access.find(a =>a.includes("SWA"));
        let provisioning = access.find(a =>a.includes("Provisioning"));
        let workflows = access.find(a =>a.includes("Workflows"));
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
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);
        tableBody.appendChild(row);
    }
}


// http://madewithenvy.com/ecosystem/articles/2015/exploring-order-flexbox-carousel/
const $carousel = document.querySelector('.carousel');
const $seats = document.querySelectorAll('.carousel-seat');
const $toggle = document.querySelectorAll('.toggle');

document.addEventListener("click", delegate(toggleFilter, toggleHandler));
// Common helper for event delegation.
function delegate(criteria, listener) {
  return function(e) {
    let el = e.target;
    do {
      if (!criteria(el)) {
        continue;
      }
      e.delegateTarget = el;
      listener.call(this, e);
      return;
    } while ((el = el.parentNode));
  };
}

// Custom filter to check for required DOM elements
function toggleFilter(elem) {
  return (elem instanceof HTMLElement) && elem.matches(".toggle");
  // OR
  // For < IE9
  // return elem.classList && elem.classList.contains('btn');
}

// Custom event handler function
function toggleHandler(e) {
  var $newSeat;
  const $el = document.querySelector('.is-ref');
  const $currSliderControl = e.delegateTarget;
  // Info: e.target is what triggers the event dispatcher to trigger and e.currentTarget is what you assigned your listener to.

  $el.classList.remove('is-ref');
  if ($currSliderControl.getAttribute('data-toggle') === 'next') {
    $newSeat = next($el);
    $carousel.classList.remove('is-reversing');
  } else {
    $newSeat = prev($el);
    $carousel.classList.add('is-reversing');
  }

  $newSeat.classList.add('is-ref');
  $newSeat.style.order = 1;
  for (var i = 2; i <= $seats.length; i++) {
    $newSeat = next($newSeat);
    $newSeat.style.order = i;
  }

  $carousel.classList.remove('is-set');
  return setTimeout(function() {
    return $carousel.classList.add('is-set');
  }, 50);

  function next($el) {
    if ($el.nextElementSibling) {
      return $el.nextElementSibling;
    } else {
      return $carousel.firstElementChild;
    }
  }

  function prev($el) {
    if ($el.previousElementSibling) {
      return $el.previousElementSibling;
    } else {
      return $carousel.lastElementChild;
    }
  }
}
// For Logo Carousel
const $logo_carousel = document.querySelector('.logo_carousel');
const $logo_seats = document.querySelectorAll('.logo_carousel-seat');
const $logo_toggle = document.querySelectorAll('.logo_toggle');

document.addEventListener("click", logo_delegate(logo_toggleFilter, logo_toggleHandler));

// Common helper for event delegation.
function logo_delegate(criteria, listener) {
  return function(e) {
    let el = e.target;
    do {
      if (!criteria(el)) {
        continue;
      }
      e.delegateTarget = el;
      listener.call(this, e);
      return;
    } while ((el = el.parentNode));
  };
}

// Custom filter to check for required DOM elements
function logo_toggleFilter(elem) {
  return (elem instanceof HTMLElement) && elem.matches(".logo_toggle");
  // OR
  // For < IE9
  // return elem.classList && elem.classList.contains('btn');
}
  function logo_toggleHandler(e) {
    var $logo_newSeat;
    const $el = document.querySelector('.logo_is-ref');
    const $currSliderControl = e.delegateTarget;
    // Info: e.target is what triggers the event dispatcher to trigger and e.currentTarget is what you assigned your listener to.
  
    $el.classList.remove('logo_is-ref');
    if ($currSliderControl.getAttribute('data-toggle') === 'next') {
      $logo_newSeat = next($el);
      $logo_carousel.classList.remove('logo_is-reversing');
    } else {
      $logo_newSeat = prev($el);
      $logo_carousel.classList.add('logo_is-reversing');
    }
  
    $logo_newSeat.classList.add('logo_is-ref');
    $logo_newSeat.style.order = 1;
    for (var i = 2; i <= $logo_seats.length; i++) {
      $logo_newSeat = next($logo_newSeat);
      $logo_newSeat.style.order = i;
    }
  
    $logo_carousel.classList.remove('logo_is-set');
    return setTimeout(function() {
      return $logo_carousel.classList.add('logo_is-set');
    }, 50);
  
    function next($el) {
      if ($el.nextElementSibling) {
        return $el.nextElementSibling;
      } else {
        return $logo_carousel.firstElementChild;
      }
    }
  
    function prev($el) {
      if ($el.previousElementSibling) {
        return $el.previousElementSibling;
      } else {
        return $logo_carousel.lastElementChild;
      }
    }
  }

  // Logo Carousel Done

results1.addEventListener("click", async function() {
    let config = await mainFunction();
    imageResult1.style.display= "none";
    verificationLoader13.style.display = "block";
    config.backgroundUrl = imageResult1.src;
    config.loader =  verificationLoader13;
    config.imageDiv = imageResult1;
    results1.style.backgroundColor = "white";
    config.image = imageResult1;
    verificationLoader13.style.backgroundColor = "white";
    onlyUploadImages(config);
});
results2.addEventListener("click", async function() {
    let config = await mainFunction();
    imageResult2.style.display= "none";
    verificationLoader14.style.display = "block";
    config.backgroundUrl = imageResult2.src;
    config.loader =  verificationLoader14;
    config.imageDiv = imageResult2;
    results2.style.backgroundColor = "white";
    config.image = imageResult2;
    verificationLoader14.style.backgroundColor = "white";
    onlyUploadImages(config);
});
results3.addEventListener("click", async function() {
    let config = await mainFunction();
    imageResult3.style.display= "none";
    verificationLoader15.style.display = "block";
    config.backgroundUrl = imageResult3.src;
    config.loader =  verificationLoader15;
    config.imageDiv = imageResult3;
    results3.style.backgroundColor = "white";
    config.image = imageResult3;
    verificationLoader15.style.backgroundColor = "white";
    onlyUploadImages(config);
});
results4.addEventListener("click", async function() {
    let config = await mainFunction();
    imageResult4.style.display= "none";
    verificationLoader16.style.display = "block";
    config.backgroundUrl = imageResult4.src;
    config.loader =  verificationLoader16;
    config.imageDiv = imageResult4;
    results4.style.backgroundColor = "white";
    config.image = imageResult4;
    verificationLoader16.style.backgroundColor = "white";
    onlyUploadImages(config);
});
results5.addEventListener("click", async function() {
    let config = await mainFunction();
    imageResult5.style.display= "none";
    verificationLoader17.style.display = "block";
    config.backgroundUrl = imageResult5.src;
    config.loader =  verificationLoader17;
    config.imageDiv = imageResult5;
    results5.style.backgroundColor = "white";
    config.image = imageResult5;
    verificationLoader17.style.backgroundColor = "white";
    onlyUploadImages(config);
});
results6.addEventListener("click", async function() {
    let config = await mainFunction();
    imageResult6.style.display= "none";
    verificationLoader18.style.display = "block";
    config.backgroundUrl = imageResult6.src;
    config.loader =  verificationLoader18;
    config.imageDiv = imageResult6;
    results10.style.backgroundColor = "white";
    config.image = imageResult6;
    verificationLoader18.style.backgroundColor = "white";
    onlyUploadImages(config);
});
results7.addEventListener("click", async function() {
    let config = await mainFunction();
    imageResult7.style.display= "none";
    verificationLoader19.style.display = "block";
    config.backgroundUrl = imageResult7.src;
    config.loader =  verificationLoader19;
    config.imageDiv = imageResult7;
    results7.style.backgroundColor = "white";
    config.image = imageResult7;        
    verificationLoader19.style.backgroundColor = "white";
    onlyUploadImages(config);
});

results8.addEventListener("click", async function() {
    let config = await mainFunction();
    imageResult8.style.display= "none";
    verificationLoader20.style.display = "block";
    config.backgroundUrl = imageResult8.src;
    config.loader =  verificationLoader20;
    config.imageDiv = imageResult8;
    results8.style.backgroundColor = "white";
    config.image = imageResult8;
    verificationLoader20.style.backgroundColor = "white";
    onlyUploadImages(config);
});

results9.addEventListener("click", async function() {
    let config = await mainFunction();
    imageResult9.style.display= "none";
    verificationLoader21.style.display = "block";
    config.backgroundUrl = imageResult9.src;
    config.loader =  verificationLoader21;
    config.imageDiv = imageResult9;
    results9.style.backgroundColor = "white";
    config.image = imageResult9;
    verificationLoader21.style.backgroundColor = "white";
    onlyUploadImages(config);
});

results10.addEventListener("click", async function() {
    let config = await mainFunction();
    imageResult10.style.display= "none";
    verificationLoader22.style.display = "block";
    config.backgroundUrl = imageResult10.src;
    config.loader =  verificationLoader22;
    config.imageDiv = imageResult10;
    results10.style.backgroundColor = "white";
    config.image = imageResult10;
    verificationLoader22.style.backgroundColor = "white";
    onlyUploadImages(config);
});

logoInputSearch.addEventListener("keyup", debounce(saveInputLogo, 400 ));
function debounce( callback, delay ) {
    let timeout;
    return function() {
        clearTimeout( timeout );
        timeout = setTimeout( callback, delay );
    }
}
function verificationLoadersOn() {
    imageResult1.style.display = "none";
    imageResult2.style.display = "none";
    imageResult3.style.display = "none";
    imageResult4.style.display = "none";
    imageResult5.style.display = "none";
    imageResult6.style.display = "none";
    imageResult7.style.display = "none";
    imageResult8.style.display = "none";
    imageResult9.style.display = "none";
    imageResult10.style.display = "none";

    verificationLoader13.style.display = 'block';
    verificationLoader14.style.display = 'block';
    verificationLoader15.style.display = 'block';
    verificationLoader16.style.display = 'block';
    verificationLoader17.style.display = 'block';
    verificationLoader18.style.display = 'block';
    verificationLoader19.style.display = 'block';
    verificationLoader20.style.display = 'block';
    verificationLoader21.style.display = 'block';

}
function verificationLoadersOnLogo() {
    imageResult11.style.display = "none";
    imageResult12.style.display = "none";
    imageResult13.style.display = "none";
    imageResult14.style.display = "none";
    imageResult15.style.display = "none";
    imageResult16.style.display = "none";
    imageResult17.style.display = "none";
    imageResult18.style.display = "none";
    imageResult19.style.display = "none";
    imageResult20.style.display = "none";

    verificationLoader24.style.display = 'block';
    verificationLoader25.style.display = 'block';
    verificationLoader26.style.display = 'block';
    verificationLoader27.style.display = 'block';
    verificationLoader28.style.display = 'block';
    verificationLoader29.style.display = 'block';
    verificationLoader30.style.display = 'block';
    verificationLoader31.style.display = 'block';
    verificationLoader32.style.display = 'block';
    verificationLoader33.style.display = 'block';


}

function displayImages(results,count) {
    let resultCount = count + 6; 
    if(resultCount > 10 ) {
        resultCount = resultCount- 10; 
    }
    let el = `results${resultCount}`;
    let element = document.getElementById(`${el}`);
    let verficationLoaderId = resultCount + 12;
    if(verficationLoaderId > 22) {
        verficationLoaderId = verificationLoaderId - 10;
    } 
    let verficationLoaderString = `verificationLoader` + verficationLoaderId;
    let imageResultString = `imageResult` + resultCount; 
    element.innerHTML = `<img id=${imageResultString} src=${results} /> <div id=${verficationLoaderString}></div>`;
}
function saveInputLogo(e){
    verificationLoadersOnLogo();
    let search = logoInputSearch.value;
    search += " logo";
    fetch(`https://serpapi.com/search.json?q=${search}&tbm=isch&ijn=0&tbs=itp:photos,isz:l&api_key=f5afc2bb0a4ba248ddf7494f8734116c2a983df10d3da2086c80fd858be405b8`)
        .then(response => response.text())
        .then(result => {
            let resultJson = JSON.parse(result);
            let imageResults = resultJson.images_results;
            sortLogos(imageResults);
    })
}
async function sortLogos(results) {
    let imageCount = 0;
    for(let i = 0; imageCount < 10; i++) {
    const imageToFile= async()=> {
        const image = results[i].original;
        const response = await fetch(image);
        const blob = await response.blob();
        const file = await new File([blob], 'image.jpg', {type: blob.type});
        return file;
      }
      var file = await imageToFile();
      if(file.type == "image/png")  {
        imageCount++;
        displayLogoImages(results[i].original, imageCount);
      }
    }
}
function displayLogoImages(results,count) {
    let resultCount = count + 16; 

    if(resultCount > 20 ) {
        resultCount = resultCount- 10; 
    }
    let el = `results${resultCount}`;
    let element = document.getElementById(`${el}`);
    let verficationLoaderId = resultCount + 13;
    if(verficationLoaderId > 33) {
        verficationLoaderId = verificationLoaderId - 10;
    } 
    let verficationLoaderString = `verificationLoader` + verficationLoaderId;
    let imageResultString = `imageResult` + resultCount; 
    element.innerHTML = `<img id=${imageResultString} src=${results} /> <div id=${verficationLoaderString}></div>`;
}

logoResultsListeners(); 
async function logoResultsListeners() {
    let config = await mainFunction();
    let logoResultsImage = document.querySelectorAll(".logoResultsImage");
    for(let i = 0 ; i < logoResultsImage.length; i++) {
        logoResultsImage[i].addEventListener("click", function() {
            logoResultsImage[i].children[0].style.display = "none";
            config.logoImageDiv = logoResultsImage[i].children[0];
            config.logoUrl = logoResultsImage[i].children[0].src;
            config.loader= logoResultsImage[i].children[1];
            config.loader.style.display = "block";
            config.loader.style.display = "white";
            onlyUploadLogo(config);
        })
    }
}



// let modalBtn = document.getElementById("modal-btn")
// let modal = document.querySelector(".modal")
// let closeBtn = document.querySelector(".close-btn")
// modalBtn.onclick = function(){
//   modal.style.display = "block"
// }
// closeBtn.addEventLIstner = function(){
//   modal.style.display = "none"
// }
