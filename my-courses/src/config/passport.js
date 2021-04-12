const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const service = require('../services/users')(User);

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    service.getOne(id).then(user => done(null, user));
  });

  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
      },
      async (email, password, done) => {
        const user = await service.getOneByEmail(email);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const passMatch = await user.matchPassword(password);
        if (!passMatch) {
          return done(null, false, { message: 'Wrong password or email' });
        }

        return done(null, user);
      },
    ),
  );

  passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          let user;
          user = await service.getOneByEmail(email);
          if (user) {
            return done(null, false, { message: 'Email already taken' });
          }

          user = await service.create({ email, password: password, name: req.body.name });
          done(null, user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );
};
