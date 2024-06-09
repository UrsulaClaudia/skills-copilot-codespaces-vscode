// Create web server
// Use express.js to create server
const express = require('express');
const app = express();

// Use body-parser to handle post request
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });
const Comment = mongoose.model('Comment', {
    name: String,
    message: String,
    date: Date
});

// Use ejs
app.set('view engine', 'ejs');

// Use static file
app.use(express.static('public'));

// Get request
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        res.render('index', {comments: comments});
    });
});

// Post request
app.post('/comment', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        message: req.body.message,
        date: new Date()
    });
    comment.save().then(() => {
        res.redirect('/');
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});