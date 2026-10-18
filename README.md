# 💸 Smart Expense Tracker Web App

A Full-Stack MERN web application to help individuals manage their personal finances, visualize spending habits, and track budgets.

## 🚀 Features
- **User Authentication:** Secure JWT-based login/registration.
- **Transaction Management:** Full CRUD operations for income and expenses.
- **Data Visualization:** Interactive charts using Recharts.
- **Financial Dashboard:** Real-time calculation of net balance and category metrics.

## 💻 Tech Stack
- **Frontend:** React.js (Vite), Tailwind CSS, Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose

## 📁 Architecture & Folder Structure
- `/client` - React frontend
- `/server` - Express backend & API
RESTful architecture mapping client HTTP requests to MongoDB via Express routers.

## 🛠 How to Run Locally
1. Clone the repo: `git clone https://github.com/yourusername/smart-expense-tracker-mern.git`
2. Backend: `cd server && npm install`, create `.env` (PORT, MONGO_URI, JWT_SECRET), run `npm run dev`.
3. Frontend: `cd client && npm install`, create `.env` (VITE_API_URL), run `npm run dev`.
4. Open `http://localhost:5173`

## 📊 API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate & get token
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Add transaction
- `DELETE /api/transactions/:id` - Delete transaction

## 🎓 Learning Outcomes
- Implementing JWT Authentication
- Managing state with React Hooks
- Aggregating data in MongoDB
- Building responsive layouts with Tailwind CSS

(3️⃣ Run the Project Again

Now that the files are fixed, you need to quickly sync your installations and run them.

In your Server Terminal:
PowerShell

cd server
npm install
npm run dev

In your Client Terminal:
PowerShell

cd client
npm install
npm run dev)