import { Response, NextFunction } from "express"
import { MENRequest } from "./type-definition"
import * as jwt from "jsonwebtoken"
interface AUTH_BODY {}
const JWT_SECRET = process.env.JWT_SECRET as string

const isAuthorized = async (req: MENRequest<AUTH_BODY>, res: Response, next: NextFunction) => {
  try {
    let { authorization } = req.headers
    if (!authorization)
      return res.status(401).json({ message: "please login | you are not authorized" })
    authorization = authorization.slice(7)
    let decoded = jwt.verify(authorization, JWT_SECRET) as jwt.JwtPayload
    if (!decoded && typeof decoded == "string") {
      return res.status(401).json({ message: "please login | you are not authorized" })
    }
    req.user = decoded?.email
    return next()
  } catch (error) {
    return res.status(401).json({ message: "please login | you are not authorized" })
  }
}
const isAuthenticated = async (req: MENRequest<AUTH_BODY>, res: Response, next: NextFunction) => {
  try {
    let { authorization } = req.headers
      if (!authorization)
          return next();
    authorization = authorization.slice(7)
    console.log({ authorization })
    let decoded = jwt.verify(authorization, JWT_SECRET)
    if (!decoded) {
      return next()
    }
    return res.status(200).json({ message: "you are already logged in" })
  } catch (error) {
    next()
  }
}

export { isAuthenticated, isAuthorized }
