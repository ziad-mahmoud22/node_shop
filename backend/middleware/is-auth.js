module.exports = (req,res,next) => {
    if (!req.session.isLoggedIn) {
        // return res.redirect('/login');
        console.log(req.session);
        return res.send({route: '/login'});
    }
    next();
};