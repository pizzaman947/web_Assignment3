const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blog_routes');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/static')); 

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/index.html");
});
app.use('/blogs', blogRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));