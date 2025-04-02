# VTube – Over the Top (OTT) Platform
*FrontendLink:* [Frontend](https://github.com/VinayBorate/V_Tube)  
*BackendLink:* [Backend](https://github.com/VinayBorate/VTube_Backend)
*ProjectDeployed Link:* [VTube](https://vtubebyvinay.netlify.app/) 
## 📌 Project Description
VTube is a full-stack OTT (Over the Top) platform that enables users to browse, upload, and interact with videos based on their subscription plans. The platform is built using **React** for the frontend, **Node.js** and **Express** for the backend, and **MongoDB** for database management, ensuring a seamless and scalable video streaming experience.

### 🔹 Key Integrations:
- **Cloudinary** for cloud-based video storage.
- **Razorpay** for secure payment processing and subscription management (Gold, Silver, Bronze plans).
- **JWT & Bcrypt** for authentication and authorization.
- **OTP verification** for secure account access.
- **NodeMailer** for email notifications, including OTP verification, account updates, and transactional emails.

## 🚀 Key Features
✅ **User Authentication & Authorization** (JWT, Bcrypt, OTP verification)  
✅ **Secure Subscription-Based Access** with Razorpay payment integration  
✅ **Cloud-Based Video Storage** using Cloudinary  
✅ **Video Uploading, Browsing & Interaction** (Likes & Comments)  
✅ **Email Notifications** via NodeMailer (OTP verification & account updates)  
✅ **Role-Based Access Control** for secure content management  
✅ **MVC Architecture** for scalability and maintainability  

---

## 🛠 Tech Stack

### 🎨 Frontend:
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

### 🏗 Backend:
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

### 🗄 Database:
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

### ☁ Cloud Storage:
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

### 💳 Payment Integration:
[![Razorpay](https://img.shields.io/badge/Razorpay-007AFF?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)

### 🔑 Authentication & Security:
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Bcrypt](https://img.shields.io/badge/Bcrypt-4A90E2?style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/bcrypt)

---

## 📜 Installation & Setup
### Prerequisites:
- **Node.js** installed
- **MongoDB** setup (local or cloud-based)
- **Razorpay Account** for payment gateway
- **Cloudinary Account** for video storage

## Frontend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/VinayBorate/V_Tube.git
   ```
2. Navigate into the project folder:
   ```sh
   cd V_Tube
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the frontend directory and set the backend URL:
   ```sh
   VITE_BASE_URL=http://localhost:3000
   ```
5. Start the frontend development server:
   ```sh
   npm run dev
   ```

---

## Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/VinayBorate/VTube_Backend.git
   ```
2. Navigate into the backend folder:
   ```sh
   cd VTube_Backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the backend directory and set up the required environment variables:
   ```sh
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/VtubeBackend

   MAIL_HOST=smtp.gmail.com
   MAIL_USER=vinaybbbb@gmail.com
   MAIL_PASS=

   JWT_SECRET=borate

   # Cloudinary Configuration
   CLOUD_NAME=
   CLOUD_API_KEY=
   CLOUD_API_SECRET=
   CLOUD_FOLDER=

   # Razorpay Configuration
   RAZORPAY_KEY_ID=
   RAZORPAY_KEY_SECRET=
   ```
5. Start the backend development server:
   ```sh
   npm run dev
   ```


---

## Demo & Screenshots
  
- **Login Page** 
 <img src="ReadmeImages/Login.png" alt="Login Page">

- **Signup Page** 
  <img src="ReadmeImages/Signup.png" alt="Signup Page">

- **OTP Page**
<img src="ReadmeImages/OTP.png" alt="Login Page">

- **Home Page**
<img src="ReadmeImages/Home.png" alt="Home Page">
<img src="ReadmeImages/ViewVideo.png" alt="ViewVideo Page">
<img src="ReadmeImages/Comments.png" alt="Comments Page">

- **Dashboard Page**
<img src="ReadmeImages/Upload.png" alt="Upload Page">
<img src="ReadmeImages/UploadForm.png" alt="UploadForm Page">

- **Plans Page**
<img src="ReadmeImages/Plans.png" alt="Login Page">
<img src="ReadmeImages/Payment.png" alt="Payment Page">
<img src="ReadmeImages/PaymentSuccess.png" alt="PaymentSuccess Page">
<img src="ReadmeImages/Paymentrazorpay.png" alt="PaymentRecive Page">


---

## 🎯 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the platform.

---

## 📧 Contact
For any queries or suggestions, feel free to reach out:
- **Email:** vinayborate121@gmail.com
- **GitHub:** [yourusername](https://github.com/VinayBorate)
- **Linkedin:** [VinayBorate](https://www.linkedin.com/in/vinayborate/)
