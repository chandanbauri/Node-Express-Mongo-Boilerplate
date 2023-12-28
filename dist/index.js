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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});
const express_1 = __importDefault(require("express"));
const DB_1 = require("./DB/DB");
const auth_routes_1 = __importDefault(require("./routes/auth/auth-routes"));
const cors_1 = __importDefault(require("cors"));
const MiddleWares = __importStar(require("./middleware"));
const users_routes_1 = __importDefault(require("./routes/users/users-routes"));
const express_session_1 = __importDefault(require("express-session"));
const PORT = process.env.SERVER_PORT || 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.raw());
app.use(express_1.default.urlencoded({ extended: true }));
(0, DB_1.connectDB)();
app.use((0, express_session_1.default)({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
app.use("/auth", auth_routes_1.default);
app.use("/users", MiddleWares.isAuthorized, users_routes_1.default);
app.listen(PORT, () => console.log("server has started on = %d", PORT));
