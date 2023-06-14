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
exports.InlineEdit = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var InlineInput_1 = require("./InlineInput");
var InlineEdit = function (props) {
    var disabled = props.disabled, className = props.className, inputClassName = props.inputClassName;
    var _a = react_1.useState({ status: 'display' }), state = _a[0], setState = _a[1];
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [state.status === 'edit' && (jsx_runtime_1.jsx(InlineInput_1.InlineInput, { className: inputClassName, onChange: function (newValue) { return setState({ status: 'edit', value: newValue }); }, value: state.value, onFinish: function (cancel) {
                    if (!cancel) {
                        props.onChange(state.value);
                    }
                    setState({ status: 'display' });
                } }, void 0)), state.status === 'display' && (jsx_runtime_1.jsx("div", __assign({ className: className, onClick: function () {
                    if (!disabled) {
                        setState({ status: 'edit', value: props.value });
                    }
                } }, { children: props.value }), void 0))] }, void 0));
};
exports.InlineEdit = InlineEdit;
