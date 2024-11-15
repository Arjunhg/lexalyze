import express from 'express';
import passport from 'passport';

const router = express.Router();

const handleAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate('google', {
        failureRedirect: `${process.env.CLIENT_URL}/login`,
        successRedirect: `${process.env.CLIENT_URL}/dashboard`,
    })(req, res, next);
};
// const handleAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     passport.authenticate('google', (err, user, info) => {
//         if (err) {
//             console.error('Authentication error:', err);
//             return res.redirect(`${process.env.CLIENT_URL}/login?error=auth`);
//         }
//         if (!user) {
//             return res.redirect(`${process.env.CLIENT_URL}/login?error=unauthorized`);
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 console.error('Login error:', err);
//                 return res.redirect(`${process.env.CLIENT_URL}/login?error=login`);
//             }
//             res.redirect(`${process.env.CLIENT_URL}/dashboard`);
//         });
//     })(req, res, next);
// };


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/google/callback', handleAuth);

router.get('/current-user', (req, res) => {
    // console.log('Session ID:', req.sessionID);
    // console.log('Session:', req.session);
    if (process.env.NODE_ENV !== 'production') {
        console.log('Authenticated:', req.isAuthenticated());
        console.log('User:', req.user);
    }
    if(req.isAuthenticated() && req.user){
        res.json(req.user)
    }else{
        res.status(401).json({message: 'Unauthorized'})
    }
})

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ status: "ok" });
    });
  });
  

export default router;