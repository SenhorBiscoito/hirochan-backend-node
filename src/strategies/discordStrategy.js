const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const properties = require('../../config/properties');
const DiscordUser = require('../models/DiscordUser');

const scopes = ['identify', 'guilds', 'guilds.join'];

passport.serializeUser((user, done) => {
  console.log('Serializing');
  // console.log(user)
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('Deserializing');

  // console.log(id)
  const user = await DiscordUser.findById(id);
  if (user) { done(null, user); }
});

passport.use(new DiscordStrategy({
  clientID: properties.CLIENT_ID,
  clientSecret: properties.CLIENT_SECRET,
  callbackURL: properties.CLIENT_REDIRECT,
  scope: scopes,
}, async (accessToken, refreshToken, profile, done) => {
  console.log(accessToken);
  console.log(refreshToken);
  // console.log(profile);

  try {
    const user = await DiscordUser.findOne({ id_user: profile.id });

    if (user) {
      console.log('O usuário ja existe', user.id);

      done(null, user);
    } else {
      console.log('User does not exist');


      const newUser = await DiscordUser.create(
        {
          accessToken, refreshToken, id_user: profile.id,
        },
      );
      await newUser.save();

      done(null, newUser);
    }
  } catch (error) {
    console.log(error);
    done(error, null);
  }
}));
