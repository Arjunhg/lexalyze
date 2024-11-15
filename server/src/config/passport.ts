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
        callbackURL: '/auth/google/callback'
        // callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
    }, 
    async (accessToken, refreshToken, profile, done) => {
        try {

            let user = await User.findOne({googleId: profile.id});

            if(!user){
                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails![0].value,
                    displayName: profile.displayName,
                    profilePicture: profile.photos![0].value
                });
            }

            
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
        done(null, user);
    } catch (error) {
        console.error("Error deserializing user:", error);
        done(error, null);
    }
});
