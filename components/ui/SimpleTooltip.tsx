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
exports.SimpleTooltip = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
var SimpleTooltip = function (props) {
    var id = props.id, value = props.value, children = props.children, className = props.className, placement = props.placement, show = props.show;
    if (value) {
        return (jsx_runtime_1.jsx(react_bootstrap_1.OverlayTrigger, __assign({ show: show, placement: placement, overlay: jsx_runtime_1.jsx(react_bootstrap_1.Tooltip, __assign({ className: "simple-tooltip " + className, id: id }, { children: value }), void 0) }, { children: children }), void 0));
    }
    return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: children }, void 0);
};
exports.SimpleTooltip = SimpleTooltip;
