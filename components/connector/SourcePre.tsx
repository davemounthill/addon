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
exports.SourcePre = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SourcePre = function (props) {
    var children = props.children;
    return jsx_runtime_1.jsx("pre", __assign({ className: "p-2 text-tiny overflow-visible" }, { children: children }), void 0);
};
exports.SourcePre = SourcePre;
