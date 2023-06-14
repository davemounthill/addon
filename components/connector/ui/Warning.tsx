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
exports.Warning = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var solid_1 = require("@heroicons/react/20/solid");
var Warning = function (props) {
    var children = props.children;
    return (jsx_runtime_1.jsx("div", __assign({ className: "bg-yellow-50 border-l-4 border-yellow-400 p-4" }, { children: jsx_runtime_1.jsxs("div", __assign({ className: "flex" }, { children: [jsx_runtime_1.jsx("div", __assign({ className: "flex-shrink-0" }, { children: jsx_runtime_1.jsx(solid_1.ExclamationTriangleIcon, { className: "h-7 w-7 text-yellow-400", "aria-hidden": "true" }, void 0) }), void 0), jsx_runtime_1.jsx("div", __assign({ className: "ml-3" }, { children: jsx_runtime_1.jsx("p", __assign({ className: "text-sm text-yellow-700 m-0" }, { children: children }), void 0) }), void 0)] }), void 0) }), void 0));
};
exports.Warning = Warning;
