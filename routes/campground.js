const express = require("express");
const router = express.Router();
const catchAsync = require("../error/catchAsync");
const campgrounds = require("../controllers/campground");
const multer = require("multer");
const { storage } = require("../cloudinary");

const upload = multer({ storage });

const { isAuthor, validateCamp } = require("../middleware");
const auth = require("../auth");

router
  .route("/")
  .get(catchAsync(campgrounds.renderIndex))
  .post(
    auth,
    upload.array("images"),
    validateCamp,
    catchAsync(campgrounds.createCamp)
  );

router.get("/new", auth, campgrounds.renderNewCamp);

router
  .route("/:id")
  .get(catchAsync(campgrounds.renderShow))
  .put(auth, isAuthor, validateCamp, catchAsync(campgrounds.editCamp))
  .delete(auth, isAuthor, catchAsync(campgrounds.deleteCamp));

router.get("/:id/edit", auth, isAuthor, catchAsync(campgrounds.renderEdit));

router
  .route("/:id/editphoto")
  .get(auth, isAuthor, catchAsync(campgrounds.renderEditphoto))
  .put(
    auth,
    isAuthor,
    upload.array("images"),
    catchAsync(campgrounds.editphoto)
  );

module.exports = router;
