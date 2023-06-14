"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.SerializedError = exports.NetworkError = void 0;
var rt = __importStar(require("runtypes"));
exports.NetworkError = rt.Record({
    code: rt.Union(rt.Literal('ETIMEDOUT'), rt.Literal('ECONNREFUSED'), rt.Literal('ENOTFOUND'), rt.Literal('ECONNRESET'), rt.Literal('EAI_AGAIN'), rt.Literal('SELF_SIGNED_CERT_IN_CHAIN'), rt.Literal('CERT_HAS_EXPIRED'), rt.Literal('DEPTH_ZERO_SELF_SIGNED_CERT')),
});
exports.SerializedError = rt.Record({
    name: rt.String,
    message: rt.String,
    code: rt.Union(rt.Number, rt.String).optional(),
});
