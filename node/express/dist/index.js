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
require("dotenv/config");
const dub_1 = require("./dub");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/create-link", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dub_1.dub.links.create({
            url: "https://www.google.com",
        });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});
