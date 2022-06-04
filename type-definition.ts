import type { Request } from "express"
import type { Model } from "mongoose"

export interface MENRequest<T> extends Request {
  body: T
  user?: string
}

export interface USER_PROFILE {
  first_name: string
  last_name: string
  phone_number: string
  email: string
}

export interface USER_INFO extends USER_PROFILE {
  password: string
}

export interface USER_SCHEMA extends USER_INFO {
  user_id: string
}

export interface USER_IDENTIFIER {
  [key: string]: string
}

export interface USER_MODEL_SCHEMA extends Model<USER_SCHEMA> {
    verifyPassword: (user_id: string, password: string) => Promise<boolean>
    isExist: (identifier: USER_IDENTIFIER) => Promise<boolean>
    getUser: (email: string) => Promise<USER_PROFILE | null>
}
