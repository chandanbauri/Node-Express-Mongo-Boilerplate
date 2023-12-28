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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGOOSE_URI = `mongodb://${process.env.MONGOOSE_USER}:${encodeURIComponent(process.env.MONGOOSE_PASS)}@${process.env.MONG0OSE_HOST}?ssl=true&replicaSet=atlas-f99oxo-shard-0&authSource=admin&retryWrites=true&w=majority`;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.set("strictQuery", false);
        yield mongoose_1.default.connect(MONGOOSE_URI, {
            dbName: "test",
        });
        console.log("db connected");
    }
    catch (error) {
        throw error;
    }
});
exports.connectDB = connectDB;
