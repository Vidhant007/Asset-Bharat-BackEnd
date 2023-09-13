const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("./models/user_model");

const GOOGLE_CLIENT_ID =
  "638066721430-elje6frkr40456nbvjs0rt31n4f35c98.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

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
        password: profile.id,
        confirmPassword: profile.id,

        //   image: profile.photos[0].value
      };
      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log(user);
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
