const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { text, amount, type, category, date } = req.body;
    const newTransaction = new Transaction({
      userId: req.user.id,
      text,
      amount,
      type,
      category,
      date
    });
    const transaction = await newTransaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    // Ensure user owns transaction
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};