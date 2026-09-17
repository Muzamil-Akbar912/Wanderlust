const User = require("../models/user");

// Render signup...
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// Signup...
module.exports.signup = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


// Render login...
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// Login...
module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


// Logout...
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
};

// Add listing to wishlist...

module.exports.addToWishlist = async (req, res) => {

    const { listingId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user.wishlist.includes(listingId)) {
        user.wishlist.push(listingId);
        await user.save();
    }

    req.flash("success", "Added to wishlist ❤️");

    res.redirect(req.get("Referer") || `/listings/${listingId}`);
};

// Remove listing from wishlist...

module.exports.removeFromWishlist = async (req, res) => {

    const { listingId } = req.params;

    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
        id => id.toString() !== listingId
    );

    await user.save();

    req.flash("success", "Removed from wishlist");

    res.redirect(req.get("Referer") || `/listings/${listingId}`);
};