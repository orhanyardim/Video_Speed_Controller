// overlay.js
class VideoOverlay {
  constructor(videoElement) {
    this.video = videoElement;
    this.overlay = document.createElement('div');
    this.initStyle();
    this.video.parentElement.style.position = 'relative'; // Anchor for overlay
    this.video.parentElement.appendChild(this.overlay);
    this.hideTimeout = null;
  }

  initStyle() {
    Object.assign(this.overlay.style, {
      position: 'absolute',
      top: '10px',
      left: '10px',
      padding: '5px 10px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      fontFamily: 'sans-serif',
      fontSize: '14px',
      fontWeight: 'bold',
      borderRadius: '4px',
      zIndex: '9999',
      opacity: '0',
      transition: 'opacity 0.2s ease-in-out',
      pointerEvents: 'none'
    });
  }

  show(speed) {
    requestAnimationFrame(() => {
      this.overlay.textContent = `▶ ${speed.toFixed(2)}x`;
      this.overlay.style.opacity = '1';
      
      if (this.hideTimeout) clearTimeout(this.hideTimeout);
      
      this.hideTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          this.overlay.style.opacity = '0';
        });
      }, 1500);
    });
  }
}

// Global olarak content.js'in erişebilmesi için window objesine ekliyoruz
window.VideoOverlay = VideoOverlay;