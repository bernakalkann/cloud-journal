# 3522 Bulut Bilişim Dersi - Proje 1 Raporu

**Proje Adı:** Çift Katmanlı Web Uygulaması (Web API + Frontend) - *Cloud Journal*
**Öğrenci:** Berna Kalkan

## 1. Proje Kapsamı ve Genel Mimari
Bu projenin temel amacı, modern yazılım standartlarına uygun olarak ön yüzü (Frontend) ile arka plan mantığı (Backend/Web API) birbirinden bağımsız çalışan 'Çift Katmanlı' bir mimari inşa etmek ve bu yapıyı bulut ortamında (Amazon Web Services) canlıya almaktır. 

Bu gereksinim doğrultusunda **Cloud Journal** isminde bir bulut günlük/not yönetim uygulaması geliştirilmiştir.
- **Frontend Katmanı:** React.js kullanılarak yüksek etkileşimli, Single Page Application (SPA) standartlarında görselleştirilmiştir. Modern Mango Minimalist bir tasarım tercih edilmiştir.
- **Backend Katmanı (Web API):** Node.js ve Express.js ikilisi kullanılarak RESTful mimarisine sadık bir API yazılmıştır. 

## 2. Kullanılan Teknolojiler
- **Backend Programlama Dili:** Node.js (Express.js)
- **Frontend Kütüphanesi:** React
- **Veri Altyapısı ve İletişim:** RESTful Web API Entegrasyonu
- **Bulut Barındırma (Host):** Amazon Web Services (AWS)
  - **AWS EC2:** Backend Web API'sinin sunucu üzerinde kesintisiz çalışması sağlandı.
  - **AWS S3:** React Frontend proje dosyalarının "Static Website Hosting" servisiyle yayınlanması gerçekleştirildi.

---

## 3. Bulut Ortamında Barındırma ve Yönetim (AWS S3 & EC2)

Projenin en kritik adımlarından biri, hazırlanan çift katmanlı uygulamanın internet üzerinden yüksek erişilebilirlikle yayınlanması olmuştur.

### A. AWS EC2 (Backend Barındırma)
Node.js ortamında geliştirilmiş olan Backend, AWS Elastic Compute Cloud (EC2) servisi üzerinde açılan sanal bir Ubuntu sunucusuna aktarılmıştır. Restful API uç noktalarımızın dışarıdan gelen isteklere (CORS) kapalı olmaması ve güvenliği sağlaması için gerekli Inbound/Outbound kuralları yapılandırılmıştır.

### B. AWS S3 Üzerinde Statik Web Sitesi (Frontend) Yayınlama
Bu uygulamanın ön yüz kısmı, AWS S3 kullanılarak canlıya alınmıştır. Aşağıda bu süreç için uyguladığım adımlar sırasıyla listelenmektedir:

**1. Bucket Oluşturma:**
- AWS Console üzerinden S3 paneline girilerek `cloud-journal-app` adlı yeni bir depolama alanı (Bucket) oluşturulmuştur.
- Bölge (Region) olarak `US East (Ohio) - us-east-2` tercih edilmiştir.
- Dışarıdan internet sitelerine erişimin açık olması için *"Block all public access"* (Tüm public erişimi engelle) seçeneğinin işareti kasıtlı olarak kaldırılmıştır.

**2. Web Sitesi Dosyalarının Yüklenmesi:**
- React projesinin derlenmesiyle ortaya çıkan `build/dist` klasöründeki statik web dosyaları S3 "Objects" sekmesinden Upload edilerek yüklenmiştir.

**3. Static Website Hosting Aktifleştirilmesi:**
- Bucket özelliklerine sekmesinden (Properties) en aşağıya inilerek **"Static website hosting"** aktifleştirilmiştir.
- Başlangıç ve olası hata sayfaları için sırasıyla `index.html` ve `error.html` dosyaları tanımlanmıştır.

**4. Bucket Policy Tanımlaması:**
- Bucket'a dışarıdan girildiğinde 403 Forbidden hatası alınmaması için 'Permissions' sekmesine gidilerek şu Policy yapılandırması `JSON` formatında yazılmıştır:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cloud-journal-app/*"
    }
  ]
}
```

**5. Test İşlemi:**
AWS tarafından tarafıma özel olarak sağlanan bölgesel S3 Website linkine `(http://cloud-journal-app.s3-website.us-east-2.amazonaws.com)` tıklanmış ve React sitemin kusursuz bir şekilde yüklendiği ve Backend EC2 sunucuma başarılı API istekleri attığı doğrulanmıştır.

---

## 4. Git Sürüm Kontrolü ve Geliştirme Süreci
Tüm süreç yönergeye uygun olarak "Agile (Çevik)" bir mantıkla yürütülmüştür. Kodları tek bir anda oluşturup atmak yerine; proje önce Backend, sonra Frontend, en sonunda da Bulut Deploy güncellemeleri olarak parçalara bölünmüştür. 

Elde edilen aşamalar düzenli olarak `git add`, `git commit` işlemleriyle raporlanmış ve GitHub üzerindeki aktif depoda kayıt altına alınmıştır. Bu doküman da geliştirmenin son halkası olarak GitHub deposuna işlenmiştir.
