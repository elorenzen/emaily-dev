const passport = require('passport');

module.exports = app => {

    // ===> Handles Google OAuth process
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            // Defines what info to request from Google
            scope: ['profile', 'email']
        })
    )
    
    app.get('/auth/google/callback', passport.authenticate('google'));
    // <=== 

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);    
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}