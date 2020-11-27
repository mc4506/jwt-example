const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const PORT = 8000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

//require routes
require('./routes/routes')(app);

mongoose.connect('mongodb://localhost/jwt-login', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.listen(PORT, function() {
    console.log(`App running on port http://localhost:${PORT}`);
});