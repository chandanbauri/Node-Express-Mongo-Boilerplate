import express, { Response } from "express"
import Users from "../../schemas/user-schema";
import { MENRequest } from '../../type-definition';
let router = express.Router()

interface PR_BODY {}

router.get('/profile', async (req: MENRequest<PR_BODY> , res: Response) => {
    try {
        let email = req.user as string
        let info = await Users.getUser(email);
        if (!info) {
            return res.status(404).json({ message: 'profile not found' });
        }
        return res.status(200).json({ profile: info, message: 'your profile info' });
    } catch (error) {
        console.error({ error });
        return res.status(500).json({ message: 'Internal issue please tryagain after sometime' });
    }
}) 
let UsersRouter = router;
export default UsersRouter
