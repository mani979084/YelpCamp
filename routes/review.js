const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../error/catchAsync");
const reviews = require("../controllers/review");
const { isReviewAuthor, validateReview } = require("../middleware");
const auth = require("../auth");

router.route("/").post(auth, validateReview, catchAsync(reviews.createReview));

router
  .route("/:reviewid")
  .delete(auth, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
