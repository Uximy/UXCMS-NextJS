import { createRouter } from 'next-connect';
import passport from '/lib/passport';
import session from '/lib/session';
import { setCookie } from 'cookies-next';

const router = createRouter();

router.use(session);
router.use(passport.initialize());
router.use(passport.session());

router.get((req, res, next) => {
  passport.authenticate('steam', { failureRedirect: '/' }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/');
    }
    setCookie('access_token', user.token, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 7
    })
    
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

export default router.handler();
