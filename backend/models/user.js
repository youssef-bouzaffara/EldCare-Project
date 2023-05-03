const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    tel: {type: Number, unique: true},
    pwd: String,
    address: String,
    birthdate: String,
    gender: String,
    role: String,
    status: String,
    subscriptionDate: String,
    avatar: String,
    cv: String

});

userSchema.plugin(mongooseUniqueValidator);

const user = mongoose.model("User", userSchema);

module.exports= user;