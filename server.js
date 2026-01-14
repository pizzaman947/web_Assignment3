const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname)); 

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogDB';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/blogs', blogRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));