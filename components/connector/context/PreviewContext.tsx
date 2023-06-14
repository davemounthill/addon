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
exports.PreviewContextProvider = exports.PreviewContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
exports.PreviewContext = react_1.createContext(undefined);
exports.PreviewContext.displayName = 'PreviewContext';
var PreviewContextProvider = function (props) {
    return (jsx_runtime_1.jsx(exports.PreviewContext.Provider, __assign({ value: props }, { children: props.children }), void 0));
};
exports.PreviewContextProvider = PreviewContextProvider;
