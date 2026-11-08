const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const fileRoutes = require('./routes/fileRoutes')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

connectDB();

app.get('/', (req, res) => {
    res.send('Server is running');
})

app.use('/', fileRoutes);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
})
