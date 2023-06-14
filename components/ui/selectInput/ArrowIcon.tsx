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
exports.ArrowIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
function ArrowIcon(_a) {
    var isOpen = _a.isOpen;
    return (jsx_runtime_1.jsx("svg", __assign({ viewBox: "0 0 20 20", preserveAspectRatio: "none", width: 12, fill: "transparent", stroke: "#666", strokeWidth: "1.1px", transform: isOpen ? 'rotate(180)' : undefined }, { children: jsx_runtime_1.jsx("path", { d: "M1,6 L10,15 L19,6" }, void 0) }), void 0));
}
exports.ArrowIcon = ArrowIcon;
