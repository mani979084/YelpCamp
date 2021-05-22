const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.render('./form/register')
}

module.exports.registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = new User({
            email,
            username
        })
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Successfully Registered!!!');
            res.json({ success: 'Successfully Registered' })
        })

    } catch (e) {
        req.flash('error', e.message);
        res.json({ error: 'registration failed' })
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('./form/login')
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const url = req.session.path || '/campground';
    delete req.session.path;
    res.json({ url: url, success: 'Successfully LoggedIn' });
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'Successfully Logged Out')
    res.json({ success: 'Successfully Logged Out' })
}