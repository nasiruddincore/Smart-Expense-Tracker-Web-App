import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ text: '', amount: '', type: 'expense', category: 'Food' });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      fetchTransactions();
    }
  }, [user, navigate]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions');
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions', form);
      fetchTransactions();
      setForm({ text: '', amount: '', type: 'expense', category: 'Food' });
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  const chartData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, current) => {
      const existingCategory = acc.find(item => item.name === current.category);
      if (existingCategory) {
        existingCategory.value += current.amount;
      } else {
        acc.push({ name: current.category, value: current.amount });
      }
      return acc;
    }, []);

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Colorful Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition">
            <h3 className="text-indigo-100 font-medium text-lg">Total Balance</h3>
            <p className="text-4xl font-bold mt-2">${balance.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition">
            <h3 className="text-emerald-100 font-medium text-lg">Total Income</h3>
            <p className="text-4xl font-bold mt-2">${income.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-rose-400 to-red-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition">
            <h3 className="text-rose-100 font-medium text-lg">Total Expenses</h3>
            <p className="text-4xl font-bold mt-2">${expense.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Transaction Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md border border-slate-100 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Add New Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Salary, Groceries" value={form.text} onChange={e => setForm({...form, text: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Amount ($)</label>
                <input required type="number" min="0.01" step="0.01" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="0.00" value={form.amount} onChange={e => setForm({...form, amount: Number(e.target.value)})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Type</label>
                  <select className="w-full p-3 border rounded-lg outline-none" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Category</label>
                  <select className="w-full p-3 border rounded-lg outline-none" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="Food">Food</option>
                    <option value="Housing">Housing</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Salary">Salary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition mt-4 shadow-md">Add Transaction</button>
            </form>
          </div>

          {/* Charts and History */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center">
              <h2 className="text-xl font-bold text-gray-800 w-full text-left mb-2">Expense Breakdown</h2>
              {expense > 0 ? (
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                        {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : <p className="text-gray-400 py-10">No expenses recorded yet.</p>}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Transaction History</h2>
              {transactions.length === 0 ? (
                <p className="text-gray-400">No transactions found.</p>
              ) : (
                <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {transactions.map(t => (
                    <li key={t._id} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition border border-slate-100">
                      <div>
                        <p className="font-semibold text-gray-800">{t.text}</p>
                        <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full mt-1 inline-block">{t.category}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                        </span>
                        <button onClick={() => handleDelete(t._id)} className="text-gray-400 hover:text-red-500 transition" title="Delete">
                          ✖
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}