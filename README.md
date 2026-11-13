# 🚀 CareerForge AI

### AI-Powered Career Assistance Platform

CareerForge AI is a web-based platform designed to help students and job seekers prepare for career opportunities. It helps users analyze resumes, identify skill gaps, and explore job opportunities based on their skills.

## 🌐 Live Demo

**Website:** https://careerforge-frontend-rqbf.onrender.com

## ✨ Features

### 1. User Authentication
- User Registration
- Login functionality
- Password hashing
- Protected dashboard

### 2. Resume AI
- Upload PDF and DOCX resumes
- Resume score analysis
- Automatic skill detection
- Resume improvement suggestions
- Career suggestions

### 3. Skill Gap Analysis
- Select a target career
- Enter your existing skills
- Calculate skill match percentage
- Identify missing skills
- Get suggestions about skills to learn

### 4. Job Recommendations
- Browse job opportunities
- Search by job title, company, or skills
- View matching skills
- Identify skills required for each job

### 5. Dashboard
- Personalized welcome message
- Number of resumes analyzed
- Skills identified
- Matching job statistics

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development and build tool |
| CSS | User interface styling |
| React Router DOM | Page navigation |
| Node.js | Backend runtime |
| Express.js | Backend API |
| MongoDB | Database |
| Mongoose | Database management |
| bcryptjs | Password hashing |
| Multer | Resume file upload |
| Mammoth | DOCX text extraction |
| pdf-parse | PDF text extraction |
| Git & GitHub | Version control |
| Render | Deployment |

## 📂 Project Structure

```text
careerforge-ai/
│
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │   └── _redirects
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ResumeAI.jsx
│   │   │   ├── SkillGap.jsx
│   │   │   └── Jobs.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Pranidhi-git/careerforge-ai.git
```

### Step 2: Backend Setup

```bash
cd careerforge-ai/backend
npm install
```

Create a `.env` file in the backend folder and configure your MongoDB connection using the environment variable expected by `server.js`.

Start the backend:

```bash
node server.js
```

### Step 3: Frontend Setup

Open another terminal:

```bash
cd careerforge-ai/frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal.

**Note:** Configure the frontend API URL to point to your backend when running locally or deploying.

## 🔄 How the Project Works

1. Users register and log in.
2. The dashboard displays career tools.
3. Users upload their resume.
4. The system extracts resume text and analyzes its content.
5. Users can check their skill gaps for a selected career.
6. Users can explore job recommendations based on their skills.

## 📌 Current Implementation

- Resume analysis uses rule-based logic for scoring, skill detection, and suggestions.
- Skill Gap Analysis uses predefined skill requirements for different career roles.
- Job Recommendations currently use predefined sample job data.

## 🚀 Deployment

The frontend is deployed using **Render**.

**Live Project:** https://careerforge-frontend-rqbf.onrender.com

## 👩‍💻 Author

**Pranidhi Ray**

GitHub: https://github.com/Pranidhi-git

---

⭐ If you find this project useful, consider giving the repository a star! 