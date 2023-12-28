import strategy from "passport-google-oidc";
import Users from "src/schemas/user-schema";
import { c_error } from "src/utilities";

const google_strategy = new strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/profile",
  },
  async function (issuer: any, profile: any, cb: any) {
    try {
      const existing_user = await Users.findOne({ email: profile.email });

      if (!existing_user) {
        const new_user = new Users({
          email: profile.email,
          first_name: profile.displayName.split(" ")[0],
          last_name: profile.displayName.split(" ")[0],
        });
        await new_user.save();
        cb(null, new_user);
      } else {
        cb(null, existing_user);
      }
    } catch (error) {
      cb(error);
    }
  },
);

export default google_strategy;
