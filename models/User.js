const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String 
});

// Tells mongoose to create new collection 'users' with userSchema data
mongoose.model('users', userSchema);
