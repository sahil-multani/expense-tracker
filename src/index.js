const express = require('express');
const app = express();
require('./config').connectDB();
const cron = require('node-cron');

const morgan = require('morgan');

app.use(morgan('dev'));

const cors = require('cors');
const auth = require('./routes/authRoutes');
const expense = require('./routes/expenseRoute');
const mail = require('./routes/mailRoutes');
app.use(cors());
app.use(express.json());

require('./helpers/scheduler');
//TODO : config already set , make a function to generate token and send it with the mail
// require('./helpers/sendMail');
app.use('/auth', auth);
app.use('/expense', expense);
app.use('/mail', mail);
const port = process.env.PORT || 3001;
 app.get("/",(r,rs)=>{res.send("hello")})
app.listen(port, () => {
	console.log('Server running on port', port);
});
