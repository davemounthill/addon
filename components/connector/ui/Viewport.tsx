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
exports.Viewport = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Viewport = function (props) {
    var className = props.className, disabled = props.disabled;
    return (jsx_runtime_1.jsx("div", __assign({ className: "rounded-br-md rounded-tr-md flex flex-col h-full border border-gray-300 " + (disabled ? 'overflow-hidden' : 'overflow-auto') + " " + (className || '') }, { children: props.children }), void 0));
};
exports.Viewport = Viewport;
