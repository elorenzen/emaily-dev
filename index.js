const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ bye: 'buddy' });
})

// If in development mode, set PORT to 5000.
// Otherwise, set PORT to one assigned by Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);