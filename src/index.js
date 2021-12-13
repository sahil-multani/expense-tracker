const express = require('express');
const app = express();
require('./config').connectDB();
const cron = require('node-cron');

const morgan = require('morgan');

app.use(morgan('dev'));

const cors = require('cors');
const auth = require('./routes/authRoutes');
const expense = require('./routes/expenseRoute');
app.use(cors());
app.use(express.json());

const scheduleCreateExpense = require('./helpers/scheduler');
scheduleCreateExpense();

app.use('/auth', auth);
app.use('/expense', expense);

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log('Server running on port', port);
});
