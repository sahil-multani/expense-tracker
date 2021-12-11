const express = require('express');
const app = express();
require('./config').connectDB();
const cors = require('cors');
const auth = require('./routes/authRoutes');
app.use(cors());
app.use(express.json());
app.use('/auth', auth);
app.listen(3000, () => {
	console.log('Server running on port 3000');
});
