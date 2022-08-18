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
// ______________________ LOADERS __________________________________
construct();
checkVerification();
defaultImageListeners();
logoResultsListeners(); 
imageResultsListener();


async function mainFunction() {
    // console.log("IN MAIN");
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
chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    var allValues= Object.values(items);
});

async function checkVerification() {
    checkVerificationTracker("App opened");
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



async function imageResultsListener() {
    let resultsImageOptions = document.querySelectorAll(".resultsImage");
    for(let i = 0; i < resultsImageOptions.length; i++) {
        resultsImageOptions[i].addEventListener("click", async function() {
            let config = await mainFunction();
            backgroundImageTrack();
            let currentResultsImageBox = resultsImageOptions[i];
            let currentResultsImageBoxChildren = currentResultsImageBox.children;
            let currentResultsImage = currentResultsImageBoxChildren[0];
            let currentResultsLoader = currentResultsImageBoxChildren[1];
            // console.log("currentResultsImageBox: ", currentResultsImageBox);
            // console.log("currentResultsImage : ", currentResultsImage.src);
            // console.log("currentResultsLoader : ", currentResultsLoader);
            config.backgroundUrl = currentResultsImage.src;
            config.loader = currentResultsLoader;
            config.imageDiv = currentResultsImage;
            config.image = currentResultsImage;

            currentResultsImage.style.display = "none";
            currentResultsLoader.style.display = "block";

            currentResultsImageBox.style.backgroundColor = "white";
            currentResultsLoader.style.backgroundColor = "white";
            console.log("config: ", config);
            onlyUploadImages(config);
        })
    }
}
async function logoResultsListeners() {
    let config = await mainFunction();
    let logoResultsImage = document.querySelectorAll(".logoResultsImage");
    for(let i = 0 ; i < logoResultsImage.length; i++) {
        logoResultsImage[i].addEventListener("click", function() {
            logoClickedTrack();
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
async function defaultImageListeners() {
    let defaultImages = document.querySelectorAll(".image");
    for(let i = 0; i < defaultImages.length; i++) {
        defaultImages[i].addEventListener("click", async function() {
            let config = await mainFunction();
            defaultImageClickedTrack();
            let currentImageBox = defaultImages[i];
            let currentImageBoxChildren = defaultImages[i].children;
            let currentImage = currentImageBoxChildren[0];
            let currentLoader = currentImageBoxChildren[1];
            console.log(currentImage.id);
            if(currentImage.src.includes("finance")) {
                config.logoUrl = "./imgs/logo/finance-logo.jpeg";
            } 
            if(currentImage.src.includes("healthcare")) {
                config.logoUrl = "./imgs/logo/health-logo.png";
            } 
            if(currentImage.src.includes("informationaltechnology")) {
                config.logoUrl = "./imgs/logo/it-logo.png";
            } 
            if(currentImage.src.includes("travel")) {
                config.logoUrl = "./imgs/logo/travel-logo.png";
            } 
            if(currentImage.src.includes("okta")) {
                config.logoUrl = "./imgs/logo/okta-logo.png";
            } 
            config.backgroundUrl = currentImage.src;
            config.loader = currentLoader;
            config.image = currentImage;
            currentImage.style.display= "none";
            currentImageBox.style.backgroundColor = "white";
            currentLoader.style.display = "block";
            uploadImages(config);
        });
    }
}

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
})
tablinks2.addEventListener("click", async function() {
    let config = await construct();
    tablink2Track("tabLink2 Opened");
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
})
tablinks3.addEventListener("click", async function() {
    tablink3Track("tabLink3 Opened");

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
})
tablinks4.addEventListener("click", async function() {
    tablink4Track("TabLink4 opened");
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
})

uploadImageDiv.addEventListener("click", async function() {
    uploadImageTracker("Image Upload from URL Attempted");
    let myHeaders = new Headers();
    let configObj = await mainFunction();
    uploadImageEntry.style.display = 'none';
    verificationLoaderImage.style.display = "block";
    let backgroundUrl = backgroundInputURL.value;
    configObj.backgroundUrl = backgroundUrl;
    uploadImagesEntry(configObj);
})
uploadIconDiv.addEventListener("click", async function() {
    uploadIconTracker("Icon Upload from URL Attempted");
    let myHeaders = new Headers();
    let configObj = await mainFunction();
    uploadIconEntry.style.display = 'none';
    verificationLoaderIcon.style.display = "block";
    let logoURL = logoInputURL.value;
    configObj.logoUrl = logoURL;
    uploadLogoEntry(configObj);
})
edit.addEventListener("click", async function() {
    tenantInput.disabled = false;
    tokenInput.disabled= false;
    verify.style.display="block";
    edit.style.display="none";
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
        //  console.log("Result: ", result);
         let jsonResult = JSON.parse(result);
         displayResult(jsonResult.results);
     })
 })

verify.addEventListener("click", verifyCheck);



// ___________ VERIFICATION
async function verifyCheck() { // Skipping Verify Check 
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


// _______________
async function checkVerificationTracker(msg) { // app opened
    let config = await mainFunction();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
    };    
    console.log("Request Options: ", requestOptions);
    // fetch('http://localhost:3000/app_open', requestOptions)
    // .then(res => res.json())
    // .then(response => console.log("RESPONSE: ", response));
    // console.log(msg, ":", config);
}