// content.js
const processedVideos = new WeakMap();
const shortcuts = {
  's': 0.5, 'S': 0.5,
  'd': 1.0, 'D': 1.0,
  'f': 1.5, 'F': 1.5,
  'g': 2.0, 'G': 2.0,
  'h': 3.0, 'H': 3.0
};

let currentDomain = window.location.hostname;
let targetSpeed = 1.0;

// Storage'dan ayarları al
function loadSettings() {
  chrome.storage.local.get(['globalSpeed', 'siteSettings'], (data) => {
    const siteSettings = data.siteSettings || {};
    targetSpeed = siteSettings[currentDomain] || data.globalSpeed || 1.0;
    applySpeedToAll(targetSpeed);
  });
}

function initVideo(video) {
  if (processedVideos.has(video)) return;
  
  const overlay = new window.VideoOverlay(video);
  processedVideos.set(video, overlay);
  
  video.playbackRate = targetSpeed;
  
  // Rate change event hook to show overlay if speed changes externally or internally
  video.addEventListener('ratechange', () => {
    overlay.show(video.playbackRate);
  }, { passive: true });
}

function applySpeedToAll(speed) {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.playbackRate = speed;
    if (processedVideos.has(video)) {
      processedVideos.get(video).show(speed);
    }
  });
}

// SPA desteği için MutationObserver
const observer = new MutationObserver((mutations) => {
  let hasNewVideos = false;
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      hasNewVideos = true;
      break;
    }
  }
  
  if (hasNewVideos) {
    document.querySelectorAll('video').forEach(initVideo);
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// İlk yüklemedeki videoları işle
document.querySelectorAll('video').forEach(initVideo);
loadSettings();

// Event Delegation & Input Korumalı Klavye Dinleyicisi
document.addEventListener('keydown', (e) => {
  // Input alanlarındayken kısayolları iptal et (Alternatif Çözüm)
  const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable;
  if (isInput) return;

  let newSpeed = targetSpeed;
  let changed = false;

  if (shortcuts[e.key] !== undefined) {
    newSpeed = shortcuts[e.key];
    changed = true;
  } else if (e.shiftKey && e.key === '>') {
    newSpeed += 0.25;
    changed = true;
  } else if (e.shiftKey && e.key === '<') {
    newSpeed = Math.max(0.25, newSpeed - 0.25);
    changed = true;
  }

  if (changed) {
    targetSpeed = Math.min(Math.max(newSpeed, 0.25), 16.0); // 0.25x - 16x sınırı
    applySpeedToAll(targetSpeed);
    
    // Ayarı kaydet (Site bazlı olarak)
    chrome.storage.local.get(['siteSettings'], (data) => {
      const siteSettings = data.siteSettings || {};
      siteSettings[currentDomain] = targetSpeed;
      chrome.storage.local.set({ siteSettings });
    });
  }
}, { passive: true });

// Popup'tan gelen mesajları dinle
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateSpeed") {
    targetSpeed = request.speed;
    applySpeedToAll(targetSpeed);
  }
});