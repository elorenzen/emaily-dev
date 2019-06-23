const mongoose = require('mongoose');
const express  = require('express');
const keys     = require('./config/keys');
const app      = express();
require('./services/passport');

//Passes app to authRoutes file
require('./routes/authRoutes')(app);

// Connect mongoose to database
mongoose.connect(keys.mongoURI);

// If in development mode, set PORT to 5000.
// Otherwise, set PORT to one assigned by Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is started...');
    console.log(`Listening on port ${PORT}`);
});