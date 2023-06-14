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
exports.VerticalScroll = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
require("./VerticalScroll.css");
/** A (hopefully) simple component to let you have a fixed header and vertically scrolling body */
var VerticalScroll = function (props) {
    var children = props.children;
    var findChild = function (tagName) {
        var elem = react_1.default.Children.toArray(children)
            .flatMap(function (child) {
            return react_1.default.isValidElement(child) && child.type.toString() === tagName
                ? [child]
                : [];
        })
            .find(function (x) { return x; });
        if (!elem)
            throw new Error("No <" + tagName + "/> found for <VerticalScroll/>");
        return elem;
    };
    var header = findChild('header');
    var section = findChild('section');
    return (jsx_runtime_1.jsxs("div", __assign({ className: "vertical-scroll" }, { children: [header, section] }), void 0));
};
exports.VerticalScroll = VerticalScroll;
