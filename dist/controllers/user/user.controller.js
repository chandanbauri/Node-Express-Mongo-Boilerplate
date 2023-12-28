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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../../services/user/user.service"));
const utilities_1 = require("../../utilities");
const user_controller = {
    gmail_auth_controller: (params) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield user_service_1.default.get_user(params);
            if (params.email)
                return response;
            throw new utilities_1.c_error("Invalid input: provided email is invalid", 403);
        }
        catch (error) {
            throw error;
        }
    }),
};
exports.default = user_controller;
