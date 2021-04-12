passport = require('passport');
const { Router } = require('express');
const {
  registrationValidationRules,
  loginValidationRules,
  validateView,
  validateApi,
} = require('../middleware/authValidator');

const router = Router();

router.get('/auth', (req, res) => res.render('auth'));

router.post('/auth/login', loginValidationRules(), validateView, viewAuthenticate('login'));
router.post('/auth/register', registrationValidationRules(), validateView, viewAuthenticate('signup'));

function viewAuthenticate(name) {
  return function(req, res, next) {
    passport.authenticate(name, function(err, user, info) {
      if (err) return next(err);

      if (!user) {
        const { message } = info;
        const isLoginError = name === 'login';
        return res.render('auth', { message, isLoginError });
      }

      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.redirect('/');
      });
    })(req, res, next);
  };
}

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/api/v1/auth/login', loginValidationRules(), validateApi, apiAuthenticate('login'));
router.post('/api/v1/auth/register', registrationValidationRules(), validateApi, apiAuthenticate('signup'));

function apiAuthenticate(name) {
  return function(req, res, next) {
    passport.authenticate(name, function(err, user, info) {
      if (err) return next(err);

      if (!user) {
        const { message } = info;
        return res.status(404).json({ success: false, message });
      }

      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.status(200).json({ success: true });
      });
    })(req, res, next);
  };
}

router.get('/api/v1/auth/logout', (req, res) => {
  req.logout();
  res.status(200).json({ success: true });
});

module.exports = router;
