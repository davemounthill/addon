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
exports.XIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
function XIcon() {
    return (jsx_runtime_1.jsxs("svg", __assign({ viewBox: "0 0 20 20", preserveAspectRatio: "none", width: 12, fill: "transparent", stroke: "#979797", strokeWidth: "1.1px" }, { children: [jsx_runtime_1.jsx("path", { d: "M1,1 L19,19" }, void 0), jsx_runtime_1.jsx("path", { d: "M19,1 L1,19" }, void 0)] }), void 0));
}
exports.XIcon = XIcon;
