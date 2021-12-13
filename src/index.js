const express = require('express');
const app = express();
require('./config').connectDB();
const cron = require('node-cron');

const morgan = require('morgan');

app.use(morgan('dev'));

const cors = require('cors');
const auth = require('./routes/authRoutes');
app.use(cors());
app.use(express.json());
app.use('/auth', auth);
const scheduleCreateExpense = require('./helpers/scheduler');
scheduleCreateExpense();

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log('Server running on port', port);
});
