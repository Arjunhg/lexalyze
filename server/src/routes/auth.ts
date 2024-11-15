import express from "express";
import passport from "passport";

const router = express.Router();

const handleAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  passport.authenticate('google', {
      failureRedirect: `${process.env.CLIENT_URL}/login`,
      successRedirect: `${process.env.CLIENT_URL}/dashboard`,
      session: true,
  })(req, res, next);
};

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback", handleAuth
  
);

router.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
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