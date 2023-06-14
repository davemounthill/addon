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
exports.Modal = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
var Layout_1 = require("../../Layout");
var Modal = function (props) {
    var onCancel = props.onCancel;
    return (jsx_runtime_1.jsxs(Layout_1.Layout, __assign({ className: "layout-modal" }, { children: [jsx_runtime_1.jsx(Layout_1.LayoutPart.Body, { children: jsx_runtime_1.jsx("div", __assign({ className: "edit-main", style: { fontSize: '12px' } }, { children: jsx_runtime_1.jsxs("div", __assign({ style: { textAlign: 'center', marginTop: '1em' } }, { children: [jsx_runtime_1.jsx("div", __assign({ style: { fontSize: '12px', color: '#666', margin: '0.5em' } }, { children: props.caption }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Spinner, { animation: "border", size: "sm" }, void 0)] }), void 0) }), void 0) }, void 0), jsx_runtime_1.jsx(Layout_1.LayoutPart.Footer, { children: onCancel && (jsx_runtime_1.jsx("div", __assign({ className: "edit-connection-actions" }, { children: jsx_runtime_1.jsx(react_bootstrap_1.Button, __assign({ style: { float: 'left' }, size: "sm", variant: "secondary", onClick: onCancel }, { children: "Cancel" }), void 0) }), void 0)) }, void 0)] }), void 0));
};
exports.Modal = Modal;
