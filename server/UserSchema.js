const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String,
    type: {
        type: String,
        required: true,
        maxlength: 1,
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;