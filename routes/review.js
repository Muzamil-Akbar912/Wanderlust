const express = require("express");
const router = express.Router({mergeParams: true}); // yaha parent child conflict resolve kiya kyuki id aap.js mai he rahe rahi thi iseliye hum nai (mergeParams: true) likha..
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");


const reviewController = require("../controllers/reviews.js");

// POST REVIEW ROUTE..
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// DELETE REVIEW ROUTE...
router.delete("/:reviewId", isLoggedIn, isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;