const checkIfLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

const checkIfNotLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/tweet');
  }
  next();
};

module.exports = { checkIfLoggedIn, checkIfNotLoggedIn };
