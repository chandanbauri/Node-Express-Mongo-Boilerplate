import * as crypto from "crypto"
const ALGORITHM = process.env.ALGORITHM as string
const SECRET_KEY = process.env.SECRET_KEY as string
const INITIAL_VECTOR = process.env.INITIAL_VECTOR as string

const decrypt = (value: string, secretKey?: string, iv?: string): string => {
  let key = crypto.createDecipheriv(ALGORITHM, secretKey ?? SECRET_KEY, iv ?? INITIAL_VECTOR)
  let decryted = key.update(value, "hex", "utf-8")
  decryted += key.final("utf8")
  return decryted
}

const encrypt = (value: string, secretKey?: string, iv?: string): string => {
  let key = crypto.createCipheriv(ALGORITHM, secretKey ?? SECRET_KEY, iv ?? INITIAL_VECTOR)
  let encryted = key.update(value, "utf-8", "hex")
  encryted += key.final("hex")
  return encryted
}

// validators

const emailValidator = (email: string): boolean => {
  let mailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return email.match(mailFormat) ? true : false
}

const phoneNumberValidator = (phone: string): boolean => {
  let phoneNumberFormat: RegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  return phone.match(phoneNumberFormat) ? true : false
}

export {
  decrypt,
  encrypt,
  // Validators
  emailValidator,
  phoneNumberValidator,
}
