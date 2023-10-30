// Create web server application
// Run: node comments.js
// Access: http://localhost:3000/comments

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server application
const app = express();

// Set view engine
app.set('view engine', 'pug');

// Set view directory
app.set('views', './views');

// Set static directory
app.use(express.static('public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Get comments
app.get('/comments', (req, res) => {
    // Read comments from json file
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        // Parse json data
        const comments = JSON.parse(data);

        // Render comments
        res.render('comments', { comments: comments });
    });
});

// Add comment
app.post('/comments', (req, res) => {
    // Read comments from json file
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        // Parse json data
        const comments = JSON.parse(data);

        // Get comment
        const comment = req.body.comment;

        // Add comment to comments
        comments.push(comment);

        // Write comments to json file
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                console.log(err);
                return;
            }

            // Redirect to comments page
            res.redirect('/comments');
        });
    });
});

// Start web server application
app.listen(3000, () => console.log('Web Server is running on port 3000'));