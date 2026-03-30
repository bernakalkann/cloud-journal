# Cloud Journal - Bulut Bilişim Projesi

Ders: 3522 Bulut Bilişim
Geliştirici: Berna Kalkan
Açılabilir Site Linki: http://cloud-journal-site.s3-website.eu-north-1.amazonaws.com 
Proje Sunum Videosu: [***]

## Proje Hakkında

Bu proje, 3522 Bulut Bilişim dersi kapsamında geliştirilmiş çift katmanlı (two-tier) bir web uygulamasıdır. Proje, birbirinden tamamen bağımsız olarak çalışan bir RESTful API (Backend) ve kullanıcı arayüzünden (Frontend) oluşmaktadır. Sistemin tamamı Amazon Web Services (AWS) altyapısı kullanılarak bulut ortamında barındırılmaktadır.

## Mimari ve Kullanılan Teknolojiler

Proje, bulut bilişim prensiplerine uygun olarak iki ana bileşene ayrılmıştır:

### 1. Backend (Web API)
Teknoloji: Node.js, Express.js
Bulut Sağlayıcı: AWS EC2 (Elastic Compute Cloud)
Süreç Yönetimi: PM2
Açıklama: Uygulamanın API sunucusu AWS EC2 üzerinde yapılandırılmıştır. Sunucuya SSH ile bağlanılarak Node.js ortamı kurulmuş ve uygulamanın kesintisiz çalışması için PM2 kullanılmıştır. Veriler bu RESTful API üzerinden yönetilmektedir.

### 2. Frontend (Kullanıcı Arayüzü)
Teknoloji: JavaScript, HTML, CSS, Vite
Bulut Sağlayıcı: AWS S3 (Simple Storage Service)
Açıklama: Kullanıcı arayüzü modern web standartlarında geliştirilmiş ve derlenen statik dosyalar AWS S3 üzerinde barındırılmıştır. Frontend, EC2 üzerindeki API ile HTTP istekleri aracılığıyla haberleşmektedir.

## API Uç Noktaları (Endpoints)

GET /api/notes
İşlev: Sistemdeki tüm notları listeler.

POST /api/notes
İşlev: Sisteme yeni bir not ekler.

PUT /api/notes/:id
İşlev: Belirtilen ID değerine sahip notu günceller.

DELETE /api/notes/:id
İşlev: Belirtilen ID değerine sahip notu siler.

## Kurulum ve Çalıştırma (Lokal Geliştirme)

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. Depoyu bilgisayarınıza klonlayın:
git clone [https://github.com/bernakalkann/cloud-journal.git](https://github.com/bernakalkann/cloud-journal.git)
cd cloud-journal

2. Backend sunucusunu başlatın:
cd backend
npm install
node server.js
(API, varsayılan olarak http://localhost:3001 adresinde çalışacaktır.)

3. Frontend sunucusunu başlatın:
cd ../frontend
npm install
npm run dev
