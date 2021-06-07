const Campground = require('../models/campground')
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    const review = await new Review(req.body.review);
    review.author = req.user._id;
    const { id } = req.params;
    const camp = await Campground.findById(id);
    if (!camp) {
        return res.json({ error: 'Unable to Leave your Comment!' })
    }
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    res.json({ success: 'Successfully Added your Comment!' })
}

module.exports.deleteReview = async (req, res) => {
    const { reviewid, id } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);
    res.json({ success: 'Successfully Deleted' })
}