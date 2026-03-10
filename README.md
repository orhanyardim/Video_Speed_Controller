
# Pro Video Speed Controller 🚀

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![Manifest](https://img.shields.io/badge/Manifest-V3-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()
[![Privacy](https://img.shields.io/badge/privacy-first-orange.svg)]()

**Pro Video Speed Controller**, web sitelerindeki HTML5 videoların oynatma hızını kontrol etmenizi sağlayan; yüksek performanslı, düşük sistem kaynaklı ve tamamen gizlilik odaklı bir tarayıcı uzantısıdır. 

Modern web standartları gözetilerek **Manifest V3** altyapısıyla geliştirilmiş olup, gereksiz DOM manipülasyonlarından ve arka plan süreçlerinden arındırılmıştır.

## 🎯 Temel Özellikler

- **Geniş Aralık:** Video hızını 0.25x ile 16x arasında kusursuz şekilde ayarlayabilme.
- **Klavye Kısayolları:** Hızlı kullanım için özelleştirilmiş, form girişleriyle (input/textarea) çakışmayan akıllı kısayol yönetimi.
- **SPA Desteği:** YouTube, Netflix, Udemy gibi Single Page Application (SPA) mimarisiyle çalışan sitelerde sayfa yenilemeye gerek kalmadan yeni videoları otomatik algılama.
- **Görsel Geri Bildirim:** Sadece hız değiştiğinde beliren, requestAnimationFrame ile optimize edilmiş düşük maliyetli (low-cost) overlay göstergesi.
- **Site Bazlı Hafıza:** Her platform için tercih ettiğiniz video hızını yerel olarak hatırlar ve otomatik uygular.

## 🏗 Mimari ve Performans Yaklaşımı

Bu proje, bir tarayıcı uzantısının sistem kaynaklarını nasıl minimumda tutabileceğini göstermek amacıyla aşağıdaki mühendislik prensipleriyle tasarlanmıştır:

* **Sıfır Bağımlılık (Zero Dependencies):** Hiçbir harici framework veya kütüphane (React, jQuery vb.) kullanılmamış, tamamen Vanilla JavaScript ile yazılmıştır.
* **Lazy Execution:** `content.js`, yalnızca sayfada bir medya öğesi tespit edildiğinde aktif hale gelir.
* **Optimizasyon:** Ağır `setInterval` veya `setTimeout` döngüleri yerine, DOM değişikliklerini izlemek için **MutationObserver** ve animasyonlar için **requestAnimationFrame** kullanılmıştır.
* **Event Delegation:** Sayfadaki her bir elemana ayrı ayrı dinleyici (listener) eklemek yerine, olaylar root seviyesinde (Passive Event Listeners ile) yakalanarak bellek sızıntıları (memory leak) önlenmiştir.

## 🔒 Gizlilik ve Güvenlik Bildirgesi (Privacy-First)

Bu uzantı "Minimum İzin" (Principle of Least Privilege) prensibiyle çalışır:
- ❌ Kullanıcı verisi **toplamaz.**
- ❌ Analitik (Analytics) veya izleme (Tracking) kodu **içermez.**
- ❌ Hiçbir harici sunucuya ağ isteği (network request) **göndermez.**
- ❌ Reklam veya üçüncü taraf script **barındırmaz.**
- Sıkılaştırılmış **Content Security Policy (CSP)** kurallarına tabidir ve tamamen **çevrimdışı (offline)** çalışabilir.

## ⌨️ Kısayol Referansı

Uzantı, izleme deneyiminizi kesintiye uğratmamak için aşağıdaki kısayolları destekler:

| Kısayol Tuşu | İşlev |
| :--- | :--- |
| `S` | Hızı **0.5x** olarak ayarlar |
| `D` | Hızı **1.0x** (Normal) olarak ayarlar |
| `F` | Hızı **1.5x** olarak ayarlar |
| `G` | Hızı **2.0x** olarak ayarlar |
| `H` | Hızı **3.0x** olarak ayarlar |
| `Shift` + `>` | Hızı **0.25x artırır** |
| `Shift` + `<` | Hızı **0.25x azaltır** |

> **Not:** Arama kutularında, yorum alanlarında veya not alırken (input, textarea, contenteditable) kazara hız değişimini önlemek amacıyla kısayollar otomatik olarak devre dışı kalır.

## ⚙️ Kurulum (Geliştirici Modu)

Uzantıyı Chrome, Edge, Brave veya Opera gibi Chromium tabanlı tarayıcılara yüklemek için:

1. Bu depoyu bilgisayarınıza klonlayın veya `.zip` olarak indirin:

```bash
   git clone [https://github.com/KULLANICI_ADINIZ/video-speed-extension.git](https://github.com/KULLANICI_ADINIZ/video-speed-extension.git)

```

2. Tarayıcınızda `chrome://extensions/` (veya `edge://extensions/`) adresine gidin.
3. Sağ üst köşeden **"Geliştirici modu" (Developer mode)** anahtarını aktif hale getirin.
4. Sol üstteki **"Paketlenmemiş öğe yükle" (Load unpacked)** butonuna tıklayın.
5. İndirdiğiniz/klonladığınız projenin klasörünü (manifest.json dosyasının bulunduğu dizin) seçin.
6. Uzantı kullanıma hazırdır! Tarayıcınızın araç çubuğuna sabitleyerek kolayca erişebilirsiniz.

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına göz atabilirsiniz.

```

***

Bu dosyayı deponuza eklemek için terminalde şu komutları çalıştırabilirsiniz:

```bash
git add README.md
git commit -m "docs: add comprehensive README with architecture, privacy, and usage details"
git push origin main

```