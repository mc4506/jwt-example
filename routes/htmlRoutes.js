const path = require('path');

module.exports = function(app) {
    app.get('/login', (req, res) => {
        if (req.user) {
            res.redirect('/profile');
        } else {
            res.sendFile(path.join(__dirname, '../public/login.html'));
        }
    });
    
    app.get('/profile', (req, res) => {
        if (req.user) {
            res.sendFile(path.join(__dirname, '../public/profile.html'));
        } else {
            res.redirect('/login');
        }
    });
};