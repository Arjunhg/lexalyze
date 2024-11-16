import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", 
  passport.authenticate("google", { 
      failureRedirect: `${process.env.CLIENT_URL}/login`,
      // Don't redirect here, handle it in the callback
  }),
  (req, res) => {
      // console.log('Auth callback - session:', req.session);
      console.log('Auth callback - user:', req.user);
      // Redirect after successful authentication
      res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

router.get("/current-user", (req, res) => {

  // console.log('Session:', req.session);
  // console.log('User:', req.user);
  console.log('Session:', req.session);
  console.log('User:', req.user);
  console.log('Cookies:', req.cookies);

  console.log('Is Authenticated:', req.isAuthenticated());
    

  if (req.isAuthenticated() && req.user) {
    res.json(req.user);
    console.log('Requested User is:', req.user);
  } else {
    console.log('Requested User is:', req.user);
    res.status(401).json({ error: "Unauthorized" });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ status: "ok" });
  });
});

export default router;