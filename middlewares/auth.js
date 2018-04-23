var Auth = {
	check_login: function (req, res, next)
	{
		if (!req.session.logged_in) {
			return res.redirect('/');
		}
		next();
	}
};


module.exports = Auth;
