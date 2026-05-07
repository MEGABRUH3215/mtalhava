# Hava Durumu

Modern, şık ve detaylı bir hava durumu web uygulaması.

## Özellikler

- **Anlık Hava Durumu** — Sıcaklık, hissedilen sıcaklık, hava durumu açıklaması
- **24 Saatlik Tahmin** — Saatlik sıcaklık ve yağış olasılığı
- **7 Günlük Tahmin** — Maks/min sıcaklık, yağış miktarı
- **Detaylı Bilgiler** — Nem, rüzgar hızı/yönü, basınç, görüş mesafesi, UV indeksi, gün doğumu/batımı
- **Akıllı Arama** — Otomatik tamamlamalı şehir arama
- **Konum Bulma** — Tarayıcı konumunuzu kullanarak anlık hava durumu
- **Dark / Light Tema** — Tercihinize göre tema değiştirme
- **Animasyonlu Arayüz** — Glassmorphism tasarım, partikül efektleri, akıcı geçişler
- **Tamamen Responsive** — Mobil, tablet ve masaüstü uyumlu

## Kullanılan Teknolojiler

- HTML5 / CSS3 / JavaScript (Vanilla)
- [Open-Meteo API](https://open-meteo.com/) — Hava durumu verileri (ücretsiz, API anahtarı gerekmez)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) — Şehir arama ve koordinat dönüşümü
- [Font Awesome](https://fontawesome.com/) — İkonlar
- [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter) — Tipografi

## Kullanım

1. `index.html` dosyasını herhangi bir tarayıcıda açın
2. Varsayılan olarak İstanbul için hava durumu yüklenir
3. Üstteki arama kutusundan dilediğiniz şehri arayın
4. Konum butonuna tıklayarak bulunduğunuz konumun hava durumunu görün

Herhangi bir API anahtarı gerekmez, doğrudan çalışır.

## Dosya Yapısı

```
├── index.html    # Ana sayfa (HTML yapısı)
├── style.css     # Stil dosyası (tema, animasyonlar, responsive)
├── app.js        # JavaScript (API, DOM işlemleri, yardımcı fonksiyonlar)
└── README.md     # Bu dosya
```

## Lisans

Bu proje açık kaynak olarak sunulmuştur.
