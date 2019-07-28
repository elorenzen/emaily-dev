const   express        = require('express'),
        cookieSession  = require('cookie-session'),
        mongoose       = require('mongoose'),
        passport       = require('passport'),
        app            = express(),
        keys           = require('./config/keys');
// MODEL
require('./models/User');
require('./services/passport');

// Connect mongoose to database
mongoose.connect(keys.mongoURI);

app.use(
    cookieSession({
        //cookie expires after 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

// If in development mode, set PORT to 5000.
// Otherwise, set PORT to one assigned by Heroku
const PORT = process.env.PORT || 5000;

//Passes app to authRoutes file
require('./routes/authRoutes')(app);
app.listen(PORT, () => {
    console.log('Server is started...');
    console.log(`Listening on port ${PORT}`);
});
