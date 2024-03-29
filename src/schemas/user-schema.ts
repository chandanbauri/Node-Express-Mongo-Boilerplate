import { Schema, SchemaTypes, model, Model } from "mongoose";
import { decrypt } from "../utilities";

interface USER_MODEL_SCHEMA extends Model<USER_SCHEMA> {
  verifyPassword: (user_id: string, password: string) => Promise<boolean>;
  isExist: (identifier: USER_IDENTIFIER) => Promise<boolean>;
  getUser: (email: string) => Promise<USER_PROFILE | null>;
}

const user_schema = new Schema<USER_SCHEMA>({
  user_id: {
    type: SchemaTypes.String,
    required: true,
  },
  first_name: {
    type: SchemaTypes.String,
    required: false,
  },
  last_name: {
    type: SchemaTypes.String,
    required: false,
  },
  email: {
    type: SchemaTypes.String,
    required: true,
  },
  phone_number: {
    type: SchemaTypes.String,
    required: false,
  },
  password: {
    type: SchemaTypes.String,
    required: false,
  },
});

user_schema.statics.verifyPassword = async function (
  email: string,
  password: string,
): Promise<boolean> {
  try {
    let user = await this.findOne({ email });
    if (!user) return false;
    let decrypted = decrypt(user?.password);
    return password === decrypted;
  } catch (error) {
    throw error;
  }
};

user_schema.statics.isExist = async function (identifier: USER_IDENTIFIER) {
  try {
    let user = await this.exists(identifier);
    return user ? true : false;
  } catch (error) {
    throw error;
  }
};

user_schema.statics.getUser = async function (identifier: string) {
  try {
    let user = await this.findOne<USER_PROFILE>({ email: identifier }).select(
      "email first_name last_name phone_number",
    );
    if (!user) {
      return null;
    }
    let key: string;
    let { email, _id, ...rest } = user._doc;

    for (key in Object.keys(rest)) {
      rest[key] = decrypt(rest[key]);
    }
    return { email, ...rest };
  } catch (error) {
    throw error;
  }
};

const Users = model<USER_SCHEMA, USER_MODEL_SCHEMA>("Users", user_schema);

export default Users;
