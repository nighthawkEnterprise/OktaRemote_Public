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
    
  
chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    var allValues= Object.values(items);
    // console.log(allKeys);
    // console.log(allValues);
});
async function checkVerification() {
    console.log("IN checkVerification");
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
        verifiedSuccessfully();
    } else {
        verifiedUnsuccessfully();
    }
    // console.log('configObj in main Function: ', configObj);
    return configObj;
}
async function construct() {
    let configObj = await mainFunction();
    if(!configObj.verified) {
        tabcontent4.style.display = "block";
        tablinks1.style.display = 'none';
        tablinks2.style.display= 'none';

        return false; 
    } else {
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
        tabcontent1.style.display = "none";
        tabcontent2.style.display = "none";
        tabcontent3.style.display = "none";
        tabcontent4.style.display = "none";
        tabcontent5.style.display = "none";
    
        tablinks1.className = tablinks1.className.replace(" active", "");
        tablinks2.className = tablinks2.className.replace(" active", "");
        tablinks3.className = tablinks3.className.replace(" active", "");
        tablinks4.className = tablinks4.className.replace(" active", "");
    
        tabcontent1.style.display = "block";
        tablinks1.style.backgroundColor = "white";
        tablinks2.style.backgroundColor = "#ECECEC";
        tablinks3.style.backgroundColor = "#ECECEC";
        tablinks4.style.backgroundColor = "#ECECEC";  
        tablinks5.style.backgroundColor = "#ECECEC";        

        
        tablinks1.style.color = "black";
        tablinks2.style.color = "#193465";
        tablinks3.style.color = "#193465";
        tablinks4.style.color = "#193465";
    }
})
tablinks2.addEventListener("click", async function() {
    let config = await construct();
    if(config) {
        tabcontent1.style.display = "none";
        tabcontent2.style.display = "none";
        tabcontent3.style.display = "none";
        tabcontent4.style.display = "none";
        tabcontent5.style.display = "none";


        tablinks1.className = tablinks1.className.replace(" active", "");
        tablinks2.className = tablinks2.className.replace(" active", "");
        tablinks3.className = tablinks3.className.replace(" active", "");
        tablinks4.className = tablinks4.className.replace(" active", "");
    
        tabcontent2.style.display = "block";

        tablinks1.style.backgroundColor = "#ECECEC";
        tablinks2.style.backgroundColor = "white";
        tablinks3.style.backgroundColor = "#ECECEC";
        tablinks4.style.backgroundColor = "#ECECEC";
        tablinks5.style.backgroundColor = "#ECECEC";        
    
        tablinks1.style.color = "#193465";
        tablinks2.style.color = "black";
        tablinks3.style.color = "#193465";
        tablinks4.style.color = "#193465";
        tablinks5.style.color = "#193465";
    }
})
tablinks3.addEventListener("click", async function() {

    tabcontent1.style.display = "none";
    tabcontent2.style.display = "none";
    tabcontent3.style.display = "none";
    tabcontent4.style.display = "none";
    tabcontent5.style.display = "none";


    tablinks1.className = tablinks1.className.replace(" active", "");
    tablinks2.className = tablinks2.className.replace(" active", "");
    tablinks3.className = tablinks3.className.replace(" active", "");
    tablinks4.className = tablinks4.className.replace(" active", "");

    tabcontent3.style.display = "block";
    
    
    tablinks1.style.backgroundColor = "#ECECEC";
    tablinks2.style.backgroundColor = "#ECECEC";
    tablinks3.style.backgroundColor = "white";
    tablinks4.style.backgroundColor = "#ECECEC";
    tablinks5.style.backgroundColor = "#ECECEC";        
    
    tablinks1.style.color = "#193465";
    tablinks2.style.color = "#193465";
    tablinks3.style.color = "black";
    tablinks4.style.color = "#193465";
    tablinks5.style.color = "#193465";

})
tablinks4.addEventListener("click", async function() {
    tabcontent1.style.display = "none";
    tabcontent2.style.display = "none";
    tabcontent3.style.display = "none";
    tabcontent4.style.display = "none";
    tabcontent5.style.display = "none";

    tablinks1.className = tablinks1.className.replace(" active", "");
    tablinks2.className = tablinks2.className.replace(" active", "");
    tablinks3.className = tablinks3.className.replace(" active", "");
    tablinks4.className = tablinks4.className.replace(" active", "");

    tabcontent4.style.display = "block";
    
    
    tablinks1.style.backgroundColor = "#ECECEC";
    tablinks2.style.backgroundColor = "#ECECEC";
    tablinks3.style.backgroundColor = "#ECECEC";
    tablinks4.style.backgroundColor = "white";
    tablinks5.style.backgroundColor = "#ECECEC";

    
    tablinks1.style.color = "#193465";
    tablinks2.style.color = "#193465";
    tablinks3.style.color = "#193465";
    tablinks4.style.color = "black";
    tablinks5.style.color = "#193465";

})
tablinks5.addEventListener("click", async function() {
    tabcontent1.style.display = "none";
    tabcontent2.style.display = "none";
    tabcontent3.style.display = "none";
    tabcontent4.style.display = "none";
    tabcontent5.style.display = "none";

    tablinks1.className = tablinks1.className.replace(" active", "");
    tablinks2.className = tablinks2.className.replace(" active", "");
    tablinks3.className = tablinks3.className.replace(" active", "");
    tablinks4.className = tablinks4.className.replace(" active", "");
    tablinks5.className = tablinks5.className.replace(" active", "");
    
    tabcontent5.style.display = "block";
    
    
    tablinks1.style.backgroundColor = "#ECECEC";
    tablinks2.style.backgroundColor = "#ECECEC";
    tablinks3.style.backgroundColor = "#ECECEC";
    tablinks4.style.backgroundColor = "#ECECEC";
    tablinks5.style.backgroundColor = "white";
    
    tablinks1.style.color = "#193465";
    tablinks2.style.color = "#193465";
    tablinks3.style.color = "#193465";
    tablinks4.style.color = "#193465";
    tablinks5.style.color = "black";

})
upload.addEventListener("click", async function() {
    let myHeaders = new Headers();
    let configObj = await mainFunction();
    let backgroundUrl = backgroundInput.value;
    let logoUrl = logoInput.value;
    configObj.backgroundUrl = backgroundUrl;
    configObj.logoUrl = logoUrl;
    // console.log("checking configObj", configObj);
    let bgEntryLength = configObj.backgroundUrl.length > 3;
    let lgEntryLength = configObj.logoUrl.length > 3;
    // console.log("bgEntryLength: ", bgEntryLength);
    // console.log("logoEntryLength: ", lgEntryLength);
    inputForm.style.display= "none";
    uploadLoadContainer.style.display="block";

    if(bgEntryLength && lgEntryLength) {
        // console.log("DOUBLE");
        inputForm.style.display = "none";
        uploadImagesEntry(configObj);
    } else if(bgEntryLength && !lgEntryLength) {
        // console.log("SIngle");
        onlyUploadImages(configObj);
        chrome.tabs.reload();
    }else if(!bgEntryLength && lgEntryLength) {
        // console.log("ngle");
        onlyUploadLogo(configObj); 
        chrome.tabs.reload();
    } else {
        alert("Must enter valid URL");
        uploadLoadContainer.style.display = "none";
        inputForm.style.display = "flex";
    }
   
})
async function onlyUploadImages(configObj) {
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
        uploadLoadContainer.style.display="none";
        inputForm.style.display="flex";;
        chrome.tabs.reload();
        return result;
    })
    .catch(error => {
        alert("Error loading Page", error);
        uploadLoadContainer.style.display="none";

    });
}
function errorUploadCatch(err) {
    alert(err);
    uploadLoadContainer.style.display="none";
    inputForm.style.display = "flex";
}
async function onlyUploadLogo(configObj) {
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
        uploadLoadContainer.style.display="none";
        inputForm.style.display="flex";;
        chrome.tabs.reload();
        return result;
    })
    .catch(error => {
        alert("Error Updating Image", error);
        uploadLoadContainer.style.display="none";    });
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
async function uploadImagesEntry(configObj) {
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
        uploadLogoEntry(configObj);
    })
    .catch(error => console.log('error', error));
}
async function uploadLogoEntry(configObj) {
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
        // console.log(result);
        uploadLoadContainer.style.display="none";
        inputForm.style.display="flex";;
        
        chrome.tabs.reload();

        return result;
    })
    .catch(error => {
        alert('Error uploading image', error);
        uploadLoadContainer.style.display="none";

    });
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
        uploadLoadContainer.style.display="none";
        inputForm.style.display="flex";;
        chrome.tabs.reload();

        return result;
    })
    .catch(error => {
        alert("Error uploading image: ", error);
        uploadLoadContainer.style.display="none";
    });
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
                verifiedSuccessfully(); 
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
async function verifiedSuccessfully() {
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
    console.log("VERIFIED Unsuccessfully IN FUNCTION");
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

finance.addEventListener("click", function() {
    financeDisplay.style.display = "block";
    travelDisplay.style.display = "none";
    healthcareDisplay.style.display = "none";
    supportDisplay.style.display = "none";
})
travel.addEventListener("click", function() {
    financeDisplay.style.display = "none";
    travelDisplay.style.display = "block";
    healthcareDisplay.style.display = "none";
    supportDisplay.style.display = "none";
})
healthcare.addEventListener("click", function() {
    financeDisplay.style.display = "none";
    travelDisplay.style.display = "none";
    healthcareDisplay.style.display = "block";
    supportDisplay.style.display = "none";
})
support.addEventListener("click", function() {
    financeDisplay.style.display = "none";
    travelDisplay.style.display = "none";
    healthcareDisplay.style.display = "none";
    supportDisplay.style.display = "block";
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
