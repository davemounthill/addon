"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Picker = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var PickerUI_1 = require("./PickerUI");
var Validation_1 = require("./Validation");
var Picker = function (props) {
    return (jsx_runtime_1.jsx(Validation_1.Validation, { children: function (validationArgs) {
            return jsx_runtime_1.jsx(PickerUI_1.PickerUI, __assign({}, props, validationArgs), void 0);
        } }, void 0));
};
exports.Picker = Picker;
