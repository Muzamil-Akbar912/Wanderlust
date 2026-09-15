const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

// yeh username, password, hashing, salting and kuch methods b automatically add karta hai.....
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
