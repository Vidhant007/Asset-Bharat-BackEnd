const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("./models/user_model");
require("dotenv").config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const randomPassword = Math.random().toString(36).slice(-16);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/authorization/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      const newUser = {
        googleId: profile.id,
        // fullName: profile.displayName, // check if the fullname function works
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        password: randomPassword,
        confirmPassword: randomPassword,

        //   image: profile.photos[0].value
      };
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

module.exports = {
  initialize: passport.initialize(),
  session: passport.session(),
  authenticateGoogle: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  authenticateGoogleCallback: passport.authenticate("google", {
    failureMessage: "Failed to login",
  }),
};
