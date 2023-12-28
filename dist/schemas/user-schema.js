"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utilities_1 = require("../utilities");
const user_schema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
    first_name: {
        type: mongoose_1.SchemaTypes.String,
        required: false,
    },
    last_name: {
        type: mongoose_1.SchemaTypes.String,
        required: false,
    },
    email: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
    phone_number: {
        type: mongoose_1.SchemaTypes.String,
        required: false,
    },
    password: {
        type: mongoose_1.SchemaTypes.String,
        required: false,
    },
});
user_schema.statics.verifyPassword = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield this.findOne({ email });
            if (!user)
                return false;
            let decrypted = (0, utilities_1.decrypt)(user === null || user === void 0 ? void 0 : user.password);
            return password === decrypted;
        }
        catch (error) {
            throw error;
        }
    });
};
user_schema.statics.isExist = function (identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield this.exists(identifier);
            return user ? true : false;
        }
        catch (error) {
            throw error;
        }
    });
};
user_schema.statics.getUser = function (identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield this.findOne({ email: identifier }).select("email first_name last_name phone_number");
            if (!user) {
                return null;
            }
            let key;
            let _a = user._doc, { email, _id } = _a, rest = __rest(_a, ["email", "_id"]);
            for (key in Object.keys(rest)) {
                rest[key] = (0, utilities_1.decrypt)(rest[key]);
            }
            return Object.assign({ email }, rest);
        }
        catch (error) {
            throw error;
        }
    });
};
const Users = (0, mongoose_1.model)("Users", user_schema);
exports.default = Users;
