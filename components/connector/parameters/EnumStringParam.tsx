"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumStringParam = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var typed_apis_1 = require("@syncwith/typed-apis");
var lib_1 = require("../lib");
var EnumStringParam = function (props) {
    var _a;
    var suggestion = props.suggestion, param = props.param, onChange = props.onChange;
    var items = __spreadArray(__spreadArray([], (suggestion.required ? [] : [{ value: '', label: '(None)' }])), (((_a = suggestion.schema) === null || _a === void 0 ? void 0 : _a.enum) || []).map(function (v) {
        return {
            value: v,
            label: lib_1.mkLabelFromValue(v),
        };
    }));
    return (jsx_runtime_1.jsx(typed_apis_1.Select, { value: param === null || param === void 0 ? void 0 : param.value, onChange: onChange, themeType: lib_1.DefaultThemeType, options: items }, void 0));
};
exports.EnumStringParam = EnumStringParam;
