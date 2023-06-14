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
exports.Provider = exports.ModalContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable @typescript-eslint/no-explicit-any */
var react_1 = __importDefault(require("react"));
// The use of <any> here sucks, I don't see how to type it
exports.ModalContext = react_1.default.createContext({});
var Provider = function (props) {
    return (jsx_runtime_1.jsx(exports.ModalContext.Provider, __assign({ value: props }, { children: props.children }), void 0));
};
exports.Provider = Provider;
