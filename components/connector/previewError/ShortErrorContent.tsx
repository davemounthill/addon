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
exports.ShortErrorContent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ShortErrorContent = function (props) {
    var content = props.content;
    return jsx_runtime_1.jsx("p", __assign({ className: "p-2 text-tiny" }, { children: content }), void 0);
};
exports.ShortErrorContent = ShortErrorContent;
