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
modalBtn.addEventListener("click", function() {
    console.log("hello");
    alert("HELLO");
    // chrome.windows.create({url: "https://www.google.com", type: "popup"});
    modal.style.display="block";

})
modalClose.addEventListener("click", function() {
    modal.style.display="none";
})  