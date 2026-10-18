const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');

// Get all transactions for user
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add transaction
router.post('/', auth, async (req, res) => {
  try {
    const { text, amount, type, category, date } = req.body;
    const newTransaction = new Transaction({
      userId: req.user.id, text, amount, type, category, date
    });
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;