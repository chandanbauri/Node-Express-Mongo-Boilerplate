import * as crypto from "crypto";
const ALGORITHM = process.env.ALGORITHM as string;
const SECRET_KEY = process.env.SECRET_KEY as string;
const INITIAL_VECTOR = process.env.INITIAL_VECTOR as string;

const decrypt = (value: string, secretKey?: string, iv?: string): string => {
  let key = crypto.createDecipheriv(
    ALGORITHM,
    secretKey ?? SECRET_KEY,
    iv ?? INITIAL_VECTOR,
  );
  let decryted = key.update(value, "hex", "utf-8");
  decryted += key.final("utf8");
  return decryted;
};

const encrypt = (value: string, secretKey?: string, iv?: string): string => {
  let key = crypto.createCipheriv(
    ALGORITHM,
    secretKey ?? SECRET_KEY,
    iv ?? INITIAL_VECTOR,
  );
  let encryted = key.update(value, "utf-8", "hex");
  encryted += key.final("hex");
  return encryted;
};

// validators

const email_validator = (email: string): boolean => {
  let mail_format: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mail_format) ? true : false;
};

const phone_number_validator = (phone: string): boolean => {
  let phone_number_format: RegExp =
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phone.match(phone_number_format) ? true : false;
};

class c_error extends Error {
  error_code: http_status_code;
  constructor(message: string, error_code: http_status_code) {
    super(message);
    this.name = this.constructor.name;
    this.error_code = error_code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export {
  decrypt,
  encrypt,
  // Validators
  email_validator as emailValidator,
  phone_number_validator as phoneNumberValidator,
  c_error,
};
