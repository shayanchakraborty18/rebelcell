exports.isAdmin = (req, res, next) => {
  if( req.session.isAuthenticated && req.session.user.role === 'admin') {
    next();
  } else {
    req.flash('danger', 'Please Log In');
		res.redirect('/admin/login');
  }
}