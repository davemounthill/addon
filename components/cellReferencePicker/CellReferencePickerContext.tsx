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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellReferencePickerProvider = exports.CellReferencePickerContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
exports.CellReferencePickerContext = react_1.default.createContext({});
var CellReferencePickerProvider = function (props) {
    return (jsx_runtime_1.jsx(exports.CellReferencePickerContext.Provider, __assign({ value: { invokePicker: props.invokePicker } }, { children: props.children }), void 0));
};
exports.CellReferencePickerProvider = CellReferencePickerProvider;
