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
exports.SidebarSection = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SidebarSection = function (props) {
    var className = props.className, children = props.children;
    return jsx_runtime_1.jsx("div", __assign({ className: "px-4 py-6 " + (className || '') }, { children: children }), void 0);
};
exports.SidebarSection = SidebarSection;
