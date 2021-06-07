const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.json({ success: 'Showing Register' })
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
            res.json({ success: 'Successfully Registered' })
        })

    } catch (e) {
        res.json({ error: e.message })
    }
}

module.exports.renderLogin = (req, res) => {
    res.json({ success: 'Showing Login' })
}

module.exports.loginUser = (req, res) => {
    const newurl = req.session.returnTo && req.session.returnTo.replace('/api/', '/')
    const url = newurl || '/campground';
    delete req.session.returnTo;
    res.json({ url: url, success: 'Welcome Back!' });
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    res.json({ success: 'Successfully Logged Out' })
}