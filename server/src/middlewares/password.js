import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from "../models/user.models.js";
import { API_ENDPOINT } from '../constants.js';





passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${API_ENDPOINT}users/auth/google/callback`
},
async (token, tokenSecret, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      return done(null, user);
    } else {
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        fullName: profile.displayName,
        verified: true,
        // avatar: profile.photos[0].value
      });
      await user.save({validateBeforeSave: false});
      return done(null, user);
    }
  } catch (error) {
    return done(error, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default passport;
