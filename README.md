# 🚀 ResuMetrics

**AI-Powered Resume Analyzer built with MERN Stack and Gemini API**

ResuMetrics is a cutting-edge platform designed to help job seekers. It utilizes the power of the Google Gemini API to provide in-depth, intelligent analysis of resumes, offering actionable feedback and scoring based on industry standards and job requirements.

---

## ✨ Features

* **Intelligent AI Analysis:** Leveraging the **Gemini API** for sophisticated content, keyword, and structure analysis of resumes.
* **Comprehensive Scoring:** Generates a score and detailed report on various metrics like Resume content, structure, tone and style and relevant skills.
* **User Authentication:** Secure user accounts for personalized experience.
* **Resume History:** Users can save and access their analysis reports for future reference and tracking improvement.
* **MERN Stack Architecture:** Built with a robust, scalable, and modern tech stack.
* **Responsive UI:** Seamless experience on desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
* **React:** For building a fast and dynamic user interface.
* **Tailwind CSS:** For rapid and responsive styling.

### Backend
* **Node.js & Express.js:** The application's server and API layer.
* **MongoDB:** NoSQL database for flexible and scalable data storage (user accounts, saved analysis reports, etc.).
* **Gemini API:** The core AI engine for resume processing and analysis.

---

## 💻 Getting Started

Follow these steps to set up and run ResuMetrics locally.

### Prerequisites

* Node.js (LTS version)
* MongoDB (local instance or cloud service like MongoDB Atlas)
* A Gemini API Key (get one from Google AI Studio)

### 1. Clone the repository

```bash
git clone https://github.com/Deepanshu-2535/resumetrics.git
```

### 2. Configure Environment Variables
Create a .env file in the backend (server) directory and add the following variables:

**Example .env file content (adjust paths/names as needed)**

1. MONGODB Connection
```
MONGO_URI=<Your-MongoDB-Connection-String>
```
2. Gemini API Key
```
GEMINI_API_KEY=<Your-Gemini-API-Key>
```

3. Server Port
```
PORT=5000
```

### 3. Setup Backend (Server)
Navigate to the server directory and install dependencies.

```bash
cd backend
npm install
npm run start  #or 'npm run dev' to start in development mode using nodemon
```

### 4. Setup Frontend (Client)
Navigate to the client directory, install dependencies, and start the React application.

```bash
cd ../frontend
npm install
npm run build # or 'npm run dev' to start in development mode
npm run preview
```
The application should now be running on http://localhost:4173.

## 🤝 Contributions
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request