"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.dub = void 0;
const dub_1 = require("dub");
exports.dub = new dub_1.Dub({
    token: process.env.DUB_API_KEY,
    workspaceId: process.env.DUB_WORKSPACE_ID,
});
