// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('speedSlider');
  const valueDisplay = document.getElementById('speedValue');
  const buttons = document.querySelectorAll('button[data-speed]');

  // Aktif sekmeyi ve siteyi bul
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const url = new URL(activeTab.url);
    const domain = url.hostname;

    // Ayarları yükle
    chrome.storage.local.get(['globalSpeed', 'siteSettings'], (data) => {
      const siteSettings = data.siteSettings || {};
      const currentSpeed = siteSettings[domain] || data.globalSpeed || 1.0;
      
      slider.value = currentSpeed;
      valueDisplay.textContent = currentSpeed;
    });

    // Değer değiştikçe content script'e mesaj gönder
    const updateSpeed = (speed) => {
      const numSpeed = parseFloat(speed);
      valueDisplay.textContent = numSpeed;
      slider.value = numSpeed;

      // Storage'a site bazlı kaydet
      chrome.storage.local.get(['siteSettings'], (data) => {
        const siteSettings = data.siteSettings || {};
        siteSettings[domain] = numSpeed;
        chrome.storage.local.set({ siteSettings });
      });

      // Sekmeye uygula
      chrome.tabs.sendMessage(activeTab.id, { action: "updateSpeed", speed: numSpeed });
    };

    slider.addEventListener('input', (e) => updateSpeed(e.target.value));

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => updateSpeed(e.target.getAttribute('data-speed')));
    });
  });
});