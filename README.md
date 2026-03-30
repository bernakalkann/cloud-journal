# ☁️ Cloud Journal: Dual-Tier Architect Space

**3522 BULUT BİLİŞİM DERSİ PROJE 1**
**Öğrenci:** Berna Kalkan
**Platform:** AWS (S3 + EC2)
**Açılabilir Site Linki:** [http://cloud-journal-site.s3-website.eu-north-1.amazonaws.com](http://cloud-journal-site.s3-website.eu-north-1.amazonaws.com)

---

## 📌 Proje Özeti
**Cloud Journal**, mimarlar ve yaratıcı profesyoneller için tasarlanmış, **Dual-Tier (Çift Katmanlı)** mimariye sahip modern bir web uygulamasıdır. Uygulama, odaklanma sayacı (Pomodoro), hava durumu takibi, günlük tutma ve PDF dışa aktarma gibi özelliklerle donatılmış, tam kapsamlı bir bulut bilişim projesidir.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

### **Frontend**
- **Framework:** React (Vite)
- **Styling:** Vanilla CSS (Custom Design System)
- **Deployment:** AWS S3 (Static Website Hosting)
- **Libraries:** html2canvas, jspdf (PDF Export), Weather/Quote API integrations.

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Process Manager:** PM2 (Proses Yönetimi)
- **Deployment:** AWS EC2 (Elastic Compute Cloud)

---

## 🏗️ Sistem Mimarisi (Architecture)

Proje, yüksek erişilebilirlik ve ölçeklenebilirlik ilkelerine uygun olarak iki ayrı bulut katmanına ayrılmıştır:

1.  **Frontend Katmanı (Presentation):** React ile inşa edilmiş statik dosyalar (HTML, CSS, JS), AWS S3 bucket içerisinde barındırılmaktadır. 
2.  **Backend Katmanı (Logic):** Node.js API uygulaması, bir AWS EC2 instance üzerinde çalışmaktadır. RESTful API üzerinden veri alışverişi sağlanmaktadır.

---

## 🚀 Bulut Dağıtım Günlüğü (Deployment Log)

Ödev gereksinimlerine uygun olarak gerçekleştirilen bulut adımları aşağıdadır:

### **1. AWS S3 (Statik Web Sitesi Yayını)**
- **Bucket Ayarları:** "Block Public Access" ayarı kapatıldı ve `index.html` ana sayfa olarak belirlendi.
- **Bucket Policy:** İnternet üzerinden erişim için aşağıdaki JSON politikası uygulandı:
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [{
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::benimsitem1/*"
    }]
  }
  ```

### **2. AWS EC2 (Backend Sunucusu)**
- **Instance:** Amazon Linux 2 t2.micro instance ayağa kaldırıldı.
- **Sunucu Yönetimi:** Node.js ve PM2 kurulumu yapılarak, API servisinin 7/24 aktif olması sağlandı.
- **Port Yönetimi:** `3001` portu Security Group üzerinden erişime açıldı.

---

## ✨ Ana Özellikler
- **Focus Timer:** Uzay temalı, minimalist odaklanma sayacı.
- **Diary System:** Günlük girişi oluşturma, listeleme ve profesyonel PDF çıktısı alma.
- **Weather Widget:** Gerçek zamanlı şehir bazlı hava durumu takibi.
- **Pop-Art Joke Panel:** Günlük dozajda motivasyon ve mizah karesi.
- **Modern UI:** "Mango Marketing" ve "Space/Purple" tasarım dillerinin hibrit birleşimi.

---

## 📦 Kurulum ve Çalıştırma

### **Yerel Çalıştırma (Development)**
1.  `cd frontend && npm install && npm run dev`
2.  `cd backend && npm install && node server.js`

### **Derleme (Build)**
- `npm run build` komutu ile `/dist` klasörüne optimize edilmiş çıktı üretilir.

---

## 🎥 Video Sunum Planı
Ödevin bir parçası olan 10 dakikalık sunum videosunda aşağıdaki başlıklar ele alınmaktadır:
1.  AWS S3 Bucket oluşturma ve Policy ayarları.
2.  React projesinin build edilmesi ve S3'e yüklenmesi.
3.  EC2 instance yapılandırması ve PM2 ile API yayını.
4.  Frontend ve Backend katmanlarının entegrasyonu.
5.  Uygulama özelliklerinin demosu.

---
**GitHub:** [https://github.com/bernakalkann/cloud-journal](https://github.com/bernakalkann/cloud-journal)
