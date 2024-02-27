const mongoose = require("mongoose");

const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    _id: Number,
    name: String,
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    // children: [{ type: Number, ref: "Child" }]
    children: {type: [Number], ref: "Child"}
});

schema.plugin(AutoIncrement, { model: 'Class', field: '_id' });

module.exports = mongoose.model("Class", schema);