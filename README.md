# ⚛️ Vira: Şefkatli Yapay Zeka Yoldaşınız

[Vira Arayüz Görüntüsü](httpsVira_Ekran_Goruntusu.png) Vira, kullanıcılara duygusal destek sağlamak, onlarla empatik bir şekilde sohbet etmek ve zihinsel sağlık egzersizleri sunmak için tasarlanmış, Gemini API tarafından desteklenen bir yapay zeka sohbet robotudur.

Bu proje, React, TypeScript ve Tailwind CSS kullanılarak modern bir web uygulaması olarak geliştirilmiştir.

---

## ✨ Temel Özellikler

* **Empatik Sohbet:** Google Gemini modeli sayesinde akıcı ve anlayışlı bir sohbet deneyimi.
* **Kişiselleştirme:** Kullanıcılar, sohbet deneyimini kişiselleştirmek için isim, yaş, ruh hali ve terapi hedefleri gibi bilgileri içeren bir profil oluşturabilir.
* **Profil Kaydı:** Profil bilgileri, tarayıcınızın `localStorage` (yerel depolama) alanında güvenle saklanır.
* **Yapay Zeka Destekli Araçlar:** Vira, kullanıcının ruh haline göre **nefes egzersizleri**, **meditasyonlar** veya **günlük tutma önerileri** gibi yardımcı araçlar sunabilir.
* **Modern Arayüz:** Tailwind CSS ile oluşturulmuş şık, duyarlı ve karanlık mod öncelikli bir tasarım.

---

## 🛠️ Kullanılan Teknolojiler

* **Frontend:** React (Vite ile)
* **Dil:** TypeScript
* **Stil (Styling):** Tailwind CSS
* **Yapay Zeka (AI):** Google Gemini API (`@google/genai`)
* **Markdown:** `react-markdown` (Yapay zeka yanıtlarını formatlamak için)

---

## 🚀 Projeyi Yerel (Lokal) Olarak Çalıştırma

Bu projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin.

### 1. Projeyi Klonlayın

git clone [https://github.com/SENIN-KULLANICI-ADIN/vira-chatbot.git](https://github.com/SENIN-KULLANICI-ADIN/vira-chatbot.git)
cd vira-chatbot

## 2. Gerekli Paketleri Yükleyin

Proje klasöründeyken terminalde aşağıdaki komutu çalıştırın:

Bash
npm install

## 3. API Anahtarını Ayarlayın (Çok Önemli!)

Bu proje, çalışmak için bir Google Gemini API anahtarına ihtiyaç duyar.

Projenin ana klasöründe (.gitignore dosyasının olduğu yerde) .env adında yeni bir dosya oluşturun.

Google AI Studio'dan aldığınız API anahtarınızı bu dosyaya aşağıdaki formatta ekleyin:

Plaintext
VITE_GEMINI_API_KEY="AIzaSy...ANAHTARINIZIN_TAMAMI_BURAYA"

## 4. Projeyi Başlatın

Tüm kurulumlar tamamlandığında, projeyi geliştirme modunda başlatmak için aşağıdaki komutu çalıştırın:

Bash
npm run dev
Uygulamanız varsayılan olarak http://localhost:5173/ adresinde çalışmaya başlayacaktır.

by vira..
