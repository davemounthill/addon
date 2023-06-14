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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
var Loading = function (props) {
    var status = props.status;
    return (jsx_runtime_1.jsxs("div", __assign({ style: { textAlign: 'center', marginTop: '1em' } }, { children: [jsx_runtime_1.jsx("div", __assign({ style: { fontSize: '10px', color: '#666', margin: '0.5em' } }, { children: jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: status }, void 0) }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Spinner, { animation: "border", size: "sm" }, void 0)] }), void 0));
};
exports.default = Loading;
