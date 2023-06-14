"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireEnv = function (key) {
    var value = process.env[key];
    if (!value) {
        throw new Error("Expected " + key + " env");
    }
    return value;
};
exports.default = requireEnv;
