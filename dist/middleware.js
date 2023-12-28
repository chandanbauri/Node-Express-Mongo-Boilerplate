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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.isAuthenticated = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const is_authorized = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { authorization } = req.headers;
        if (!authorization)
            return res
                .status(401)
                .json({ message: "please login | you are not authorized" });
        authorization = authorization.slice(7);
        let decoded = jwt.verify(authorization, JWT_SECRET);
        if (!decoded && typeof decoded == "string") {
            return res
                .status(401)
                .json({ message: "please login | you are not authorized" });
        }
        req.user = decoded === null || decoded === void 0 ? void 0 : decoded.email;
        return next();
    }
    catch (error) {
        return res
            .status(401)
            .json({ message: "please login | you are not authorized" });
    }
});
exports.isAuthorized = is_authorized;
const is_authenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { authorization } = req.headers;
        if (!authorization)
            return next();
        authorization = authorization.slice(7);
        console.log({ authorization });
        let decoded = jwt.verify(authorization, JWT_SECRET);
        if (!decoded) {
            return next();
        }
        return res.status(200).json({ message: "you are already logged in" });
    }
    catch (error) {
        next();
    }
});
exports.isAuthenticated = is_authenticated;
