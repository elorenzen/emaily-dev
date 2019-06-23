const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport       = require('passport');
const express        = require('express');

const app            = express();

passport.use(new GoogleStrategy());


// If in development mode, set PORT to 5000.
// Otherwise, set PORT to one assigned by Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);