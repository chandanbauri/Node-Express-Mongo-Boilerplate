"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oidc_1 = __importDefault(require("passport-google-oidc"));
const google_strategy = new passport_google_oidc_1.default({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/profile",
}, function (issuer, profile, cb) {
    console.log({
        issuer,
        profile,
    });
});
exports.default = google_strategy;
