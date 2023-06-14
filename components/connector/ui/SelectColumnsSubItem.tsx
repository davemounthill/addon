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
exports.SelectColumnsSubItem = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SelectColumnsSubItem = function (props) {
    var children = props.children;
    return (jsx_runtime_1.jsx("span", __assign({ className: "mr-2 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800" }, { children: children }), void 0));
};
exports.SelectColumnsSubItem = SelectColumnsSubItem;
