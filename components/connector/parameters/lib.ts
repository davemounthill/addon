"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameterComponent = void 0;
var common_utils_1 = require("@syncwith/common-utils");
var EnumArrayParam_1 = require("./EnumArrayParam");
var EnumStringParam_1 = require("./EnumStringParam");
var StringParam_1 = require("./StringParam");
var getParameterComponent = function (param) {
    var _a, _b, _c, _d, _e, _f;
    // Try to identify a simple string input field
    if (((_a = param.schema) === null || _a === void 0 ? void 0 : _a.type) === 'string' &&
        (((_b = param.schema.enum) === null || _b === void 0 ? void 0 : _b.length) || 0) >= 1) {
        return EnumStringParam_1.EnumStringParam;
    }
    // Identify a string field with enum values to choose from
    // Todo: need to distinguish between whether or not the enum contains ALL values (eg we could use a <select/>)
    // or it just has SOME values, eg we should use an <input/> but suggest values
    if (((_c = param.schema) === null || _c === void 0 ? void 0 : _c.type) === 'string' &&
        (param.schema.enum === undefined || (((_d = param.schema.enum) === null || _d === void 0 ? void 0 : _d.length) || 0) <= 1)) {
        return StringParam_1.StringParam;
    }
    // Multiselect
    if (((_e = param.schema) === null || _e === void 0 ? void 0 : _e.type) === 'array' &&
        (((_f = common_utils_1.getNonRef(param.schema.items).enum) === null || _f === void 0 ? void 0 : _f.length) || 0) >= 1) {
        return EnumArrayParam_1.EnumArrayParam;
    }
    return undefined;
};
exports.getParameterComponent = getParameterComponent;
