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
var XIcon = function (props) {
    var onClick = props.onClick, className = props.className, width = props.width, height = props.height;
    return (jsx_runtime_1.jsx("svg", __assign({ onClick: onClick, className: className, width: "" + width, height: "" + height, viewBox: "0 0 512 512", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsx_runtime_1.jsx("path", { d: "M427.968 405.232L278.64 256L427.872 106.672C434.128 100.416 434.128 90.288 427.872 84.032C421.616 77.792 411.504 77.792 405.248 84.032L256 233.376L106.656 84.112C100.4 77.872 90.288 77.872 84.032 84.112C77.776 90.352 77.776 100.496 84.032 106.752L233.376 256L84.144 405.328C77.888 411.584 77.888 421.712 84.144 427.952C87.264 431.072 91.36 432.64 95.456 432.64C99.552 432.64 103.648 431.072 106.768 427.952L256.016 278.608L405.344 427.84C408.464 430.96 412.56 432.528 416.656 432.528C420.752 432.528 424.848 430.96 427.968 427.84C434.224 421.616 434.224 411.472 427.968 405.232V405.232Z", fill: "black" }, void 0) }), void 0));
};
exports.XIcon = XIcon;
