exports.csrf = function(req, res, next) {
  res.locals.token = req.session._csrf;
  next();
}
