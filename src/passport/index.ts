import passport from "passport";
import google_strategy from "./google.strategy";

passport.use(google_strategy);

export default passport;
