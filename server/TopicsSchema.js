const mongoose = require("mongoose");

const TopicsSchema = new mongoose.Schema({
    topic_name: String
});

const Topic = mongoose.model("Topics", TopicsSchema);

module.exports = Topic;
