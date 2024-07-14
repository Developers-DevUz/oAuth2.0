const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
	// Aquí, puedes guardar el perfil en tu base de datos si es necesario
	// y generar un JWT para el usuario
	const user = { googleId: profile.id, displayName: profile.displayName };
	const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
	return cb(null, user);
  }
));