const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const AddressSchema = new mongoose.Schema({
    city: String,
    street: String,
    building: String
})

const schema = new mongoose.Schema({
    _id: Number,
    fullname: String,
    age: Number,
    level: String,
    Address: AddressSchema
})

// package usage
// schema.plugin(AutoIncrement, {model: "Child", field: "_id"});
module.exports = mongoose.model("Child", schema);