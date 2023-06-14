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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleError = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SourceViewer_1 = __importDefault(require("../SourceViewer"));
var Viewport_1 = require("../ui/Viewport");
var SimpleError = function (props) {
    var badge = props.badge, details = props.details, children = props.children;
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsxs("div", __assign({ className: "error-summary flex justify-between" }, { children: [jsx_runtime_1.jsx("p", { children: children }, void 0), jsx_runtime_1.jsx("div", __assign({ className: "ml-5" }, { children: jsx_runtime_1.jsx("span", __assign({ className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800" }, { children: badge || 'Error' }), void 0) }), void 0)] }), void 0), details !== undefined && (jsx_runtime_1.jsx(Viewport_1.Viewport, __assign({ className: "mt-3" }, { children: typeof details === 'string' ? (jsx_runtime_1.jsx(SourceViewer_1.default, { data: details }, void 0)) : (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: details }, void 0)) }), void 0))] }, void 0));
};
exports.SimpleError = SimpleError;
