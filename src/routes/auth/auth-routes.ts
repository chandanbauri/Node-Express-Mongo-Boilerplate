import express, { Response, Request } from "express";
import Users from "../../schemas/user-schema";
import {
  c_error,
  emailValidator,
  encrypt,
  phoneNumberValidator,
} from "../../utilities";
import { v4 as uuid } from "uuid";
import * as jwt from "jsonwebtoken";
import user_controller from "../../controllers/user/user.controller";
import passport from "../../passport";

interface MENRequest<T> extends Request {
  body: T;
  user?: string;
}
interface LOGIN_BODY {
  identifier: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXP_TIME = 60 * 60;

// type SIGN_UP_BODY = USER_INFO;

let router = express.Router();

// router.post("/login", async (req: MENRequest<LOGIN_BODY>, res: Response) => {
//   let { body } = req;
//   let { identifier, password } = body;
//   let sucessful = await Users.verifyPassword(identifier, password);
//   if (!sucessful) {
//     return res.status(401).json({ message: "wrong email or password" });
//   }
//   let token = jwt.sign({ email: identifier }, JWT_SECRET, {
//     expiresIn: JWT_EXP_TIME,
//   });
//   return res.status(200).json({ message: "login successful", token });
// });

// router.post(
//   "/sign-up",
//   async (req: MENRequest<SIGN_UP_BODY>, res: Response) => {
//     try {
//       let { body } = req;
//       let { email, phone_number } = body;
//
//       let isEmail = emailValidator(email);
//       let isPhoneNumber = phoneNumberValidator(phone_number);
//
//       if (!isEmail) {
//         return res.status(400).json({ message: "Not a valid email address" });
//       }
//       if (!isPhoneNumber) {
//         return res.status(400).json({ message: "Not a valid phone number" });
//       }
//
//       let isUserAleardyExist = await Users.isExist({ email });
//
//       if (isUserAleardyExist) {
//         return res.status(409).json({ message: "User Already Exists" });
//       }
//
//       let key: keyof USER_INFO;
//
//       for (key in body) {
//         if (key !== "email") body[key] = encrypt(body[key]);
//       }
//
//       let token = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXP_TIME });
//
//       let user_id = uuid();
//       let user = new Users({ user_id, ...body });
//
//       await user.save();
//       let response = {
//         message: "Congratulation !! Sign up successful ",
//         success: true,
//         token,
//       };
//       return res.status(201).json(response);
//     } catch (error) {
//       console.error("SGIN UP ERROR", error);
//       return res.status(500).json({
//         message: "Internal server error please try again after sometime",
//       });
//     }
//   },
// );

router.get("/google", passport.authenticate("google", { scope: ["email"] }));

let AuthRouter = router;
export default AuthRouter;
