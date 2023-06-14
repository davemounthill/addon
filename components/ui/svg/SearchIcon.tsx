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
exports.SearchIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SearchIcon = function (props) {
    return (jsx_runtime_1.jsx("svg", __assign({ onClick: props.onClick, className: props.className, width: "" + props.width, height: "" + props.height, viewBox: "0 0 512 512", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsx_runtime_1.jsx("path", { d: "M429.707 399.578L360.521 330.392C381.489 302.943 392.989 269.648 392.993 234.516C392.993 192.177 376.504 152.37 346.561 122.432C316.624 92.4948 276.822 76.0052 234.478 76.0052C192.139 76.0052 152.332 92.4948 122.395 122.432C60.5924 184.24 60.5924 284.802 122.395 346.599C152.332 376.542 192.139 393.031 234.478 393.031C269.611 393.027 302.905 381.527 330.354 360.559L399.54 429.745C403.702 433.911 409.165 435.995 414.624 435.995C420.082 435.995 425.546 433.911 429.707 429.745C438.04 421.417 438.04 407.906 429.707 399.578ZM152.561 316.432C107.395 271.266 107.4 197.771 152.561 152.599C174.441 130.724 203.535 118.672 234.478 118.672C265.426 118.672 294.514 130.724 316.395 152.599C338.275 174.479 350.327 203.573 350.327 234.516C350.327 265.464 338.275 294.552 316.395 316.432C294.514 338.312 265.426 350.365 234.478 350.365C203.535 350.365 174.441 338.312 152.561 316.432Z", fill: "black" }, void 0) }), void 0));
};
exports.SearchIcon = SearchIcon;
