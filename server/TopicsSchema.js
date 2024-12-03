const mongoose = require("mongoose");

const TopicsSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    reviews: Array,
    approved: Boolean
});

const Topic = mongoose.model("Topics", TopicsSchema);

module.exports = Topic;
