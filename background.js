// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['globalSpeed', 'siteSettings'], (result) => {
    if (!result.globalSpeed) {
      chrome.storage.local.set({ globalSpeed: 1.0 });
    }
    if (!result.siteSettings) {
      chrome.storage.local.set({ siteSettings: {} });
    }
  });
});