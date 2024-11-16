import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// for this to work make model for this
import User, { IUser } from '../models/user.model';

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // callbackURL: 'https://lexxalyze.onrender.com/auth/google/callback'
        // callbackURL: process.env.BACKEND_URL + '/auth/google/callback',
        // callbackURL: '/auth/google/callback'
        // callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
        callbackURL: process.env.NODE_ENV === 'production'
            ? 'https://lexalyze-8950.onrender.com/auth/google/callback'
            : '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        try {

            console.log('Google Profile:', profile); // Debug log
            let user = await User.findOne({googleId: profile.id});

            if(!user){
                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails![0].value,
                    displayName: profile.displayName,
                    profilePicture: profile.photos![0].value
                });
            }

            console.log('User authenticated:', user); // Debug log
            done(null, user);
        } catch (error) {
            console.error("Error during Google OAuth:", error);
            done(error as Error, undefined)
        }
    })
);

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        if (user) {
            done(null, user);
        } else {
            done(new Error('User not found'), null);
        }
    } catch (error) {
        console.error("Error deserializing user:", error);
        done(error, null);
    }
});
