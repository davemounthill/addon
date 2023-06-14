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
exports.Loading = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
var Loading = function () {
    return (jsx_runtime_1.jsxs("div", __assign({ style: { textAlign: 'center', padding: '10px' } }, { children: [jsx_runtime_1.jsx("p", __assign({ style: { fontSize: '12px', marginBottom: '0.25em' } }, { children: "Loading..." }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Spinner, { animation: "border", size: "sm" }, void 0)] }), void 0));
};
exports.Loading = Loading;
