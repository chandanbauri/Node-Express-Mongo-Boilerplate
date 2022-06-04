import { Schema, SchemaTypes, model } from "mongoose"
import { USER_IDENTIFIER, USER_MODEL_SCHEMA, USER_PROFILE, USER_SCHEMA } from "../type-definition"
import { decrypt } from "../utilities"

let UserSchema = new Schema<USER_SCHEMA>({
  user_id: {
    type: SchemaTypes.String,
    required: true,
  },
  first_name: {
    type: SchemaTypes.String,
    required: true,
  },
  last_name: {
    type: SchemaTypes.String,
    required: true,
  },
  email: {
    type: SchemaTypes.String,
    required: true,
  },
  phone_number: {
    type: SchemaTypes.String,
    required: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
  },
})

UserSchema.statics.verifyPassword = async function (
  email: string,
  password: string,
): Promise<boolean> {
  try {
    let user = await this.findOne({ email })
    if (!user) return false
    let decrypted = decrypt(user?.password)
    return password === decrypted
  } catch (error) {
    throw error
  }
}

UserSchema.statics.isExist = async function (identifier: USER_IDENTIFIER) {
  try {
    let user = await this.exists(identifier)
    return user ? true : false
  } catch (error) {
    throw error
  }
}

UserSchema.statics.getUser = async function (identifier: string) {
  try {
    let user = await this.findOne<USER_PROFILE>({ email: identifier }).select(
      "email first_name last_name phone_number",
    )
    if (!user) {
      return null
    }
    let key: string
    let { email, _id, ...rest } = user._doc

    for (key in rest) {
      rest[key] = decrypt(rest[key])
    }
    return { email, ...rest }
  } catch (error) {
    throw error
  }
}

const Users = model<USER_SCHEMA, USER_MODEL_SCHEMA>("Users", UserSchema)

export default Users
