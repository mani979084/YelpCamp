const Campground = require('./models/campground')
const Review = require('./models/review')
const { campgroundSchema, reviewSchema } = require('./validations/schema')
const ExpressError = require('./error/customError')

module.exports.validateCamp = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(err => err.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {

    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(err => err.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        return res.json({ error: 'Please Login' });
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;

    const camp = await Campground.findById(id);
    if (!camp) {
        return res.json({ error: 'Oops, Campground not found' });
    }

    else if (!camp.author.equals(req.user._id)) {
        return res.json({ error: 'You dont have permission to do this!' });
    }
    next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewid } = req.params;
    const review = await Review.findById(reviewid);
    if (!review) {
        return res.json({ error: 'Oops, Review not found' })
    }
    else if (!review.author.equals(req.user._id)) {
        return res.json({ error: 'You dont have permission to do this!' })
    }
    next();
}