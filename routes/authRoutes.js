const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            // Defines what info to request from Google
            scope: ['profile', 'email']
        })
    )
    
    app.get('/auth/google/callback', passport.authenticate('google'));
}