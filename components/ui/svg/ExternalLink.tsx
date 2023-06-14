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
exports.ExternalLink = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ExternalLink = function (props) {
    return (jsx_runtime_1.jsxs("svg", __assign({ onClick: props.onClick, className: props.className, width: "" + props.width, height: "" + props.height, viewBox: "0 0 284 284", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx_runtime_1.jsxs("g", __assign({ clipPath: "url(#clip0)" }, { children: [jsx_runtime_1.jsx("path", { d: "M254.812 140.713H234.812C230.67 140.713 227.312 144.071 227.312 148.213V239.399C227.312 244.239 223.373 248.177 218.533 248.177H43.776C38.937 248.177 35.001 244.239 35.001 239.399V64.645C35.001 59.804 38.937 55.865 43.776 55.865H139.631C143.773 55.865 147.131 52.507 147.131 48.365V28.365C147.131 24.223 143.773 20.865 139.631 20.865H43.776C19.638 20.865 0.000999451 40.505 0.000999451 64.645V239.4C0.000999451 263.54 19.639 283.178 43.776 283.178H218.532C242.672 283.178 262.311 263.539 262.311 239.4V148.214C262.312 144.071 258.954 140.713 254.812 140.713Z", fill: "#231F20" }, void 0), jsx_runtime_1.jsx("path", { d: "M275.677 0H196.124C191.982 0 188.624 3.358 188.624 7.5V27.5C188.624 31.642 191.982 35 196.124 35H223.428L120.683 137.743C117.754 140.672 117.754 145.42 120.683 148.35L134.825 162.493C136.232 163.9 138.139 164.69 140.129 164.69C142.118 164.69 144.026 163.9 145.432 162.493L248.177 59.748V87.051C248.177 91.193 251.535 94.551 255.677 94.551H275.677C279.819 94.551 283.177 91.193 283.177 87.051V7.5C283.177 3.358 279.819 0 275.677 0Z", fill: "#231F20" }, void 0)] }), void 0), jsx_runtime_1.jsx("defs", { children: jsx_runtime_1.jsx("clipPath", __assign({ id: "clip0" }, { children: jsx_runtime_1.jsx("rect", { width: "283.178", height: "283.178", fill: "white" }, void 0) }), void 0) }, void 0)] }), void 0));
};
exports.ExternalLink = ExternalLink;
