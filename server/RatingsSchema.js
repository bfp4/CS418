const mongoose = require("mongoose");

const RatingsSchema = new mongoose.Schema({
    user_id: String,
    topic_id: String,
    rating: {
      type: Number,
      required: true,
      min: [0, "Score can't be less than 0"],
      max: [5, "Score can't be greater than 5"],
    },
    review: {
      type: String,
      required: true,
      maxlength: 800,
    }
});

const Rating = mongoose.model("Rating", RatingsSchema);

module.exports = Rating;
