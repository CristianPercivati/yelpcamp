const mongoose = require("mongoose")

const campgroundSchema =  new mongoose.Schema({
    title: {type: String, require: [true, "title is required"]},
    price: String,
    description: String,
    location: String,
    rating: String,
    image: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

module.exports = mongoose.model("Campground", campgroundSchema)