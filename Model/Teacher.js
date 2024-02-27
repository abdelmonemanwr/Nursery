const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: "Class"},
    fullname: String,
    password: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[a-z][a-z0-9]{4,}@(gmail\.com|[^@\s]+\.[a-z]{2,})$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email address format',
        },
    },
    image: String 
});

schema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next("lol error"+error);
    }
});

// to map schema to a table in my database
module.exports = mongoose.model("Teacher", schema);
