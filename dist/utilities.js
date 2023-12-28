"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.c_error = exports.phoneNumberValidator = exports.emailValidator = exports.encrypt = exports.decrypt = void 0;
const crypto = __importStar(require("crypto"));
const ALGORITHM = process.env.ALGORITHM;
const SECRET_KEY = process.env.SECRET_KEY;
const INITIAL_VECTOR = process.env.INITIAL_VECTOR;
const decrypt = (value, secretKey, iv) => {
    let key = crypto.createDecipheriv(ALGORITHM, secretKey !== null && secretKey !== void 0 ? secretKey : SECRET_KEY, iv !== null && iv !== void 0 ? iv : INITIAL_VECTOR);
    let decryted = key.update(value, "hex", "utf-8");
    decryted += key.final("utf8");
    return decryted;
};
exports.decrypt = decrypt;
const encrypt = (value, secretKey, iv) => {
    let key = crypto.createCipheriv(ALGORITHM, secretKey !== null && secretKey !== void 0 ? secretKey : SECRET_KEY, iv !== null && iv !== void 0 ? iv : INITIAL_VECTOR);
    let encryted = key.update(value, "utf-8", "hex");
    encryted += key.final("hex");
    return encryted;
};
exports.encrypt = encrypt;
// validators
const email_validator = (email) => {
    let mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(mail_format) ? true : false;
};
exports.emailValidator = email_validator;
const phone_number_validator = (phone) => {
    let phone_number_format = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phone.match(phone_number_format) ? true : false;
};
exports.phoneNumberValidator = phone_number_validator;
class c_error extends Error {
    constructor(message, error_code) {
        super(message);
        this.name = this.constructor.name;
        this.error_code = error_code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.c_error = c_error;
