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
exports.Check = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Check = function (props) {
    var onClick = props.onClick, className = props.className, width = props.width, height = props.height, fill = props.fill;
    return (jsx_runtime_1.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", onClick: onClick, className: className, viewBox: "0 0 20 20", width: width, height: height, fill: fill || 'currentColor' }, { children: jsx_runtime_1.jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }, void 0) }), void 0));
};
exports.Check = Check;
