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
exports.Toggle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
var Toggle = function (props) {
    var id = props.id, navKey = props.navKey, disabled = props.disabled, onChange = props.onChange;
    return (jsx_runtime_1.jsxs(react_bootstrap_1.Form.Check, __assign({ type: "switch", id: id, disabled: disabled, label: 'View raw data', checked: navKey === 'source' }, { children: [jsx_runtime_1.jsx(react_bootstrap_1.Form.Check.Input, { disabled: disabled, onChange: function () {
                    if (navKey === 'preview') {
                        onChange('source');
                    }
                    else {
                        onChange('preview');
                    }
                } }, void 0), jsx_runtime_1.jsx(react_bootstrap_1.Form.Check.Label, __assign({ className: "text-xs pt-1" }, { children: "View raw data" }), void 0)] }), void 0));
};
exports.Toggle = Toggle;
