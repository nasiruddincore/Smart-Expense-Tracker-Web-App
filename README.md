💸 Smart Expense Tracker Web App

A Full-Stack MERN web application to help individuals manage their personal finances, visualize spending habits, and track budgets through a modern, interactive dashboard.

🚀 Features

User Authentication: Secure login and registration using JSON Web Tokens (JWT) and bcrypt password hashing.

Transaction Management: Full CRUD operations for logging income and expenses.

Real-Time Dashboard: Instantly calculates total balance, income, and expenses.

Data Visualization: Interactive pie charts using Recharts for category-wise expense breakdown.

Modern UI/UX: Fully responsive, glassmorphism-inspired design built with Tailwind CSS.

💻 Tech Stack

Frontend: React.js (Vite), Tailwind CSS, Recharts, React Router

Backend: Node.js, Express.js

Database: MongoDB Community / MongoDB Atlas, Mongoose

Tools: Postman (API Testing), Git & GitHub, PowerShell

📁 Folder Structure

Smart-Expense-Tracker-Web-App/
│
├── client/                 # Frontend React Application (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar)
│   │   ├── context/        # Global state (AuthContext)
│   │   ├── pages/          # Full views (Dashboard, Login, Register)
│   │   ├── services/       # Axios API configurations
│   │   ├── App.jsx         # Main router
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Tailwind CSS directives
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                 # Backend Express Application
│   ├── config/             # DB connection strings (db.js)
│   ├── controllers/        # Route logic (authController, txnController)
│   ├── middleware/         # Auth verification (authMiddleware.js)
│   ├── models/             # Mongoose schemas (User, Transaction)
│   ├── routes/             # API endpoint definitions
│   └── server.js           # Express entry point
│
├── README.md               # Project documentation
└── .gitignore              # Ignored files (node_modules, .env)


🛠️ Installation & Setup (PowerShell)

Prerequisites: You must have Node.js and MongoDB Community installed on your machine.

Open PowerShell in the root directory of the project and run the following commands to install dependencies and create the .env files.

1. Setup Backend

cd server
npm install
$serverEnv = @"
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
JWT_SECRET=super_secret_jwt_key_2026
"@
Set-Content -Path .env -Value $serverEnv -Encoding UTF8
cd ..


2. Setup Frontend

cd client
npm install
$clientEnv = "VITE_API_URL=http://localhost:5000/api"
Set-Content -Path .env -Value $clientEnv -Encoding UTF8
cd ..


🚀 How to Run the Project (PowerShell)

You need to run the frontend and backend simultaneously in two separate PowerShell windows.

Terminal 1: Start the Backend (Node/Express)

cd server
npm run dev


(Expected Output: "Server running on port 5000" and "MongoDB Connected: 127.0.0.1")

Terminal 2: Start the Frontend (React/Vite)

cd client
npm run dev


(Expected Output: "VITE v4.x.x ready" and a localhost URL)

👉 Open your browser and go to http://localhost:5173 to view the app!

📊 API Endpoints

Authentication

POST /api/auth/register - Register a new user

POST /api/auth/login - Authenticate user & get JWT token

Transactions (Requires JWT Token)

GET /api/transactions - Get all transactions for the logged-in user

POST /api/transactions - Add a new transaction (income/expense)

DELETE /api/transactions/:id - Delete a specific transaction

🎓 Learning Outcomes

Designing RESTful APIs and connecting them to a NoSQL database.

Implementing stateless authentication using JWT.

Managing global state in React using the Context API.

Transforming raw data arrays into visual representations using Recharts.

Building responsive, modern interfaces with Tailwind CSS.
