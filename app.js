const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://sahildhingra221:trendnse123@cluster0.popnjoe.mongodb.net/testing?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a MongoDB schema
const transactionSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  transactionAmount: String,
});

// Create a model based on the schema
const Transaction = mongoose.model('Item', transactionSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Create a new item
app.post('/api/add-transaction', async (req, res) => {
  try {
    const { transactionAmount } = req.body;
    const newTransaction = new Transaction({ transactionAmount });
    await newTransaction.save();
    res.json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating item' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});