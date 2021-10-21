let token = "NP-Token";
let tenant = "NP-Tenant";
let verified = false;
let brandId = '';
let themeId = ''; 
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({token});
})
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({tenant});
})
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({verified});
})
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({brandId});
})
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({themeId})
})