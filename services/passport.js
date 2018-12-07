const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GithubStrategy(
    {
      callbackURL: "/auth/github/callback",
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      proxy: "true"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ githubId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({
          githubId: profile.id,
          displayName: profile.displayName
        }).save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
