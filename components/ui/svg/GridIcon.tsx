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
exports.GridIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var GridIcon = function (props) {
    return (jsx_runtime_1.jsxs("svg", __assign({ onClick: props.onClick, className: props.className, width: "" + props.width, height: "" + props.height, viewBox: "0 0 600 600", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx_runtime_1.jsx("path", { d: "M270.25 31.5C270.25 24.5938 264.656 19 257.75 19H31.5C24.5938 19 19 24.5938 19 31.5V257.75C19 264.656 24.5938 270.25 31.5 270.25H257.75C264.656 270.25 270.25 264.656 270.25 257.75V31.5ZM245.25 245.25H44V44H245.25V245.25Z", fill: "black" }, void 0), jsx_runtime_1.jsx("path", { d: "M581.5 31.5C581.5 24.5938 575.906 19 569 19H342.75C335.844 19 330.25 24.5938 330.25 31.5V257.75C330.25 264.656 335.844 270.25 342.75 270.25H569C575.906 270.25 581.5 264.656 581.5 257.75V31.5ZM556.5 245.25H355.25V44H556.5V245.25Z", fill: "black" }, void 0), jsx_runtime_1.jsx("path", { d: "M270.25 342.75C270.25 335.844 264.656 330.25 257.75 330.25H31.5C24.5938 330.25 19 335.844 19 342.75V569C19 575.906 24.5938 581.5 31.5 581.5H257.75C264.656 581.5 270.25 575.906 270.25 569V342.75ZM245.25 555.25H44V355.25H245.25V555.25Z", fill: "black" }, void 0), jsx_runtime_1.jsx("path", { d: "M581.5 342.75C581.5 335.844 575.906 330.25 569 330.25H342.75C335.844 330.25 330.25 335.844 330.25 342.75V569C330.25 575.906 335.844 581.5 342.75 581.5H569C575.906 581.5 581.5 575.906 581.5 569V342.75ZM556.5 555.25H355.25V355.25H556.5V555.25Z", fill: "black" }, void 0)] }), void 0));
};
exports.GridIcon = GridIcon;
