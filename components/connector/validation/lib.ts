"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkParamKey = void 0;
var mkParamKey = function (param) {
    return param.in + ":" + param.name;
};
exports.mkParamKey = mkParamKey;
