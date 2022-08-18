

// ____________________LOADERS END_________________


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
    .catch(err => errorUploadImageCatch(err));
}

function errorUploadImageCatch(err) {
    errorUploadImageCatchTrack("Error Uploading Image");
    backgroundInputURL.style.borderLeft= "solid 1px red";
    backgroundInputURL.placeholder = "Image not supported by Okta API. Please try again!";
    backgroundInputURL.value = ""; 
    verificationLoaderImage.style.display="none";
    verificationLoaderIcon.style.display="none";
    uploadImageEntry.style.display = "block";
}
async function uploadLogoEntry(configObj) {
    uploadLogoEntryTrack("Uploaded Logo Entry Attempted");
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
    errorUploadLogoCatchTrack("Logo Upload Error");
    logoInputURL.style.borderLeft= "solid 1px red";
    logoInputURL.placeholder = "Image not supported by Okta API. Please try again!";
    logoInputURL.value = ""; 
    verificationLoaderIcon.style.display="none";
    uploadImageEntry.style.display = "block";
    uploadIconEntry.style.display = "block";

}
async function onlyUploadImages(configObj) {
    onlyUploadImagesTrack("Only Images Uploaded");
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
    onlyUploadLogoTrack("Only Logo Uploaded");
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
    saveInputTrack(search); 
    // console.log(" SEARCH : ", search);
  
    let finalSearch = search;
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyACi8ISaIJonkXJvQfH_HVoqZgRsrMyc3w&cx=b2dd7f92c3e6e7185&q=${finalSearch}&searchType=image`)
    .then(response => response.text())
    .then(result => {
        // console.log("RESULT: ", JSON.parse(result));
        let results = JSON.parse(result).items;
        let imageArray = [];
        // console.log(results);
        for(let i = 0 ; i < results.length; i++) {
            imageArray.push(results[i].link);
        }
        sortImages(imageArray, search );
    })
    .catch(err => console.log("ERROR: ", err));

}

async function customSearchEngine(finalSearch, start) {
    // console.log("Getting Next Batch");
    let imageArray = await fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyACi8ISaIJonkXJvQfH_HVoqZgRsrMyc3w&cx=b2dd7f92c3e6e7185&start=${start}&imgSize=large&q=${finalSearch}background&searchType=image`)
    .then(response => response.text())
    .then(result => {
        // console.log("RESULT: ", JSON.parse(result));
        let results = JSON.parse(result).items;
        let imageArray = [];
        // console.log(results);
        for(let i = 0 ; i < results.length; i++) {
            imageArray.push(results[i].link);
        }
        // sortImages(imageArray, search );
        return imageArray;
    })
    .catch(err => console.log("ERROR: ", err));
    return imageArray;
}
async function sortImages(results, finalSearch) {
    // console.log("OH SNAP RESuLTS: ", results);
    let imageCount = 0;
    let cycle = 0; 
    let currentIndex= 0;
    for(let i = 0; imageCount < 10; i++) {
        // console.log("CYCLE: ", cycle);
        // console.log("currentIndex: ", currentIndex);
        // console.log("imageCount: ", imageCount);

        let image = results[currentIndex];
        if(typeof image == 'undefined') {
            // console.log("REACHED FINAL BATCH");
            cycle++;
            let start = (cycle*10) + 1; 
            results = await customSearchEngine(finalSearch, start);
            // console.log('results from everything: ', results);
            currentIndex = 0; 
        }
        const imageToFile= async()=> {  
            // console.log("image: ", image);
            const response = await fetch(image).catch(err => console.log("error: ", err));
            let file;
            if(typeof response != 'undefined') {
                const blob = await response.blob();
                file = await new File([blob], 'image.jpg', {type: blob.type});
            } else {
                const blob = new Blob();
                file = await new File([blob], 'image.jpg', {type: "block"});
            }
            // console.log("FILE: ", file);
            return file;
        }
        var file = await imageToFile();
        //   console.log("FILESSSS: ", file);
        if(file.type == 'image/jpeg' || file.type == 'image/png') {
            imageCount++;
            displayImages(results[currentIndex], imageCount);
        }
        currentIndex++;
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
        let access = result.access;
        let provisioning = result.provisioning;
        let integration = result.integration;
        let integrationRefined = integration.replace(/\s/g, "-");
        let row= document.createElement('tr');
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
        if(access.includes("SAML")) {
            let icon = document.createElement('i');
            icon.setAttribute('class', 'fa fa-times');
            td3.appendChild(icon);
        }
        let td4 = document.createElement('td');
        if(access.includes("SWA")) {
            let icon = document.createElement('i');
            icon.setAttribute('class', 'fa fa-times');
            td4.appendChild(icon);
        }
        let td5 = document.createElement('td');
        if(provisioning.length > 0) {
            let icon = document.createElement('i');
            icon.setAttribute('class', 'fa fa-times');
            td5.appendChild(icon);
        }
        let td6 = document.createElement('td');
        if(access.includes("Workflows Connectors")) {
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
  // Logo Carousel Don
// Tab Content 2: Image Search Carousel 

// END: Tab Content 2: Image Search Carousel 



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
    saveLogoTrack(search);
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
        const response = await fetch(image).catch(err => console.log(err));
        let file;
        if(typeof response != 'undefined') {
            const blob = await response.blob();
            file = await new File([blob], 'image.jpg', {type: blob.type});
        } else {
            const blob = new Blob();
            file = await new File([blob], 'image.jpg', {type: "block"});
        }
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
