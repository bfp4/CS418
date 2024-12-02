const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_firstName: String,
    user_lastName: String,
    user_email: String,
    user_userName: String,
    user_password: String,
    user_type: {
        type: String,
        required: true,
        maxlength: 1,
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
