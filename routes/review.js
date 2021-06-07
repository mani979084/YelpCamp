const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../error/catchAsync')
const reviews = require('../controllers/review')
const { isReviewAuthor, isLoggedIn, validateReview } = require('../middleware')

router.route('/')
    .post(isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.route('/:reviewid')
    .delete(isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;