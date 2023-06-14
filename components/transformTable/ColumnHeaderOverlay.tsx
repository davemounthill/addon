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
exports.ColumnHeaderOverlay = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
var ColumnHeaderOverlay = function (props) {
    var popover = (jsx_runtime_1.jsxs(react_bootstrap_1.Popover, __assign({ id: props.id, className: "col-header-popover" }, { children: [jsx_runtime_1.jsx(react_bootstrap_1.Popover.Title, __assign({ as: "h3" }, { children: props.title }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Popover.Content, { children: props.content }, void 0)] }), void 0));
    return (jsx_runtime_1.jsx(react_bootstrap_1.OverlayTrigger, __assign({ placement: "auto-start", overlay: popover }, { children: props.children }), void 0));
};
exports.ColumnHeaderOverlay = ColumnHeaderOverlay;
