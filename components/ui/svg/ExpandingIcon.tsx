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
exports.ExpandingIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ExpandingIcon = function (props) {
    return (jsx_runtime_1.jsx("svg", __assign({ className: props.className, width: "" + props.width, height: "" + props.height, viewBox: "0 0 512 512", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsx_runtime_1.jsx("path", { className: "path", d: "M448 0H64C28.8 0 0 28.8 0 64V448C0 483.2 28.8 512 64 512H448C483.231 512 512 483.2 512 448V64C512 28.8 483.231 0 448 0ZM224 448H64V288L121.375 345.375L178.749 288L224 333.251L166.656 390.626L224 448ZM448 224L390.625 166.625L333.281 224L288 178.816L345.375 121.375L288 64H448V224Z", fill: "black" }, void 0) }), void 0));
};
exports.ExpandingIcon = ExpandingIcon;
