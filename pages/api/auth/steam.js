import { createRouter } from 'next-connect';
import passport from '../../../lib/passport';
import session from '../../../lib/session';

const router = createRouter();

router.use(session);
router.use(passport.initialize());
router.use(passport.session());

router.get((req, res, next) => {
    passport.authenticate('steam')(req, res, next);
  });

export default router.handler();
