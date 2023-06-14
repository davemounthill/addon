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
exports.AccordianCard = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
/** Avoid some boilerplate code */
var AccordianCard = function (props) {
    var eventKey = props.eventKey, currentEventKey = props.currentEventKey, title = props.title, bodyClassName = props.bodyClassName, className = props.className, children = props.children;
    return (jsx_runtime_1.jsxs(react_bootstrap_1.Card, __assign({ className: (className || '') + " " + (currentEventKey === eventKey ? 'active' : undefined) }, { children: [jsx_runtime_1.jsx(react_bootstrap_1.Accordion.Toggle, __assign({ as: react_bootstrap_1.Card.Header, eventKey: eventKey }, { children: jsx_runtime_1.jsxs("div", __assign({ className: "flex items-center " + (currentEventKey === eventKey ? 'font-semibold' : '') }, { children: [props.icon && (jsx_runtime_1.jsx(props.icon, { className: "h-7 w-7 text-gray-500 fill-current mr-2" }, void 0)), title] }), void 0) }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Accordion.Collapse, __assign({ eventKey: eventKey }, { children: jsx_runtime_1.jsx(react_bootstrap_1.Card.Body, __assign({ className: bodyClassName }, { children: children }), void 0) }), void 0)] }), void 0));
};
exports.AccordianCard = AccordianCard;
