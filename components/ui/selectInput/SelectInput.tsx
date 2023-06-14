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
exports.SelectInput = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
var react_1 = require("react");
var ArrowIcon_1 = require("./ArrowIcon");
var XIcon_1 = require("./XIcon");
var SimpleTooltip_1 = require("../SimpleTooltip");
require("./SelectInput.css");
var useForwardRef_1 = require("../useForwardRef");
/** The UI portion of an <input/> with <select/> capabilities, intended for use with <Downshift/> */
exports.SelectInput = react_1.forwardRef(function (props, forwardedRef) {
    var name = props.name, value = props.value, isOpen = props.isOpen, showSelect = props.showSelect, id = props.id, disabled = props.disabled, placeholder = props.placeholder, tooltip = props.tooltip, autofocus = props.autofocus, className = props.className, children = props.children, onChange = props.onChange, onFocus = props.onFocus, onClickX = props.onClickX, getInputProps = props.getInputProps, getComboboxProps = props.getComboboxProps, getToggleButtonProps = props.getToggleButtonProps;
    var inputRef = react_1.useRef(null);
    // Forward our ref to our parent AND let us have it
    useForwardRef_1.useForwardRef(inputRef, forwardedRef);
    // track whether or not we're focused, so we can hide the Tooltip when we're focused
    var _a = react_1.useState(false), hasFocus = _a[0], setHasFocus = _a[1];
    react_1.useEffect(function () {
        var _a;
        if (autofocus) {
            if (inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) {
                (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
            else {
                console.warn("SelectInput: expected inputRef.current");
            }
        }
        // run this once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (jsx_runtime_1.jsxs("div", __assign({ className: "select-input " + (isOpen ? 'open' : '') + " " + (showSelect ? 'show-select' : '') }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: "select-input-container" }, getComboboxProps(), { children: [jsx_runtime_1.jsx(SimpleTooltip_1.SimpleTooltip, __assign({ show: hasFocus ? false : undefined, value: tooltip === null || tooltip === void 0 ? void 0 : tooltip.value, placement: tooltip === null || tooltip === void 0 ? void 0 : tooltip.placement, id: id + "-tooltip" }, { children: jsx_runtime_1.jsx("input", __assign({ "data-lpignore": "true" // make lastpass ignore this field
                            , spellCheck: "false" // disable autocorrect in safari
                            , type: "text", name: name, disabled: disabled, placeholder: placeholder }, getInputProps({
                            ref: inputRef,
                            autoComplete: 'off',
                            onChange: function (e) {
                                if (onChange)
                                    onChange(e.target.value);
                            },
                            onFocus: function () {
                                if (onFocus)
                                    onFocus();
                                setHasFocus(true);
                            },
                            onBlur: function () { return setHasFocus(false); },
                            className: "form-control form-control-sm " + (className || ''),
                        })), void 0) }), void 0), showSelect &&
                        (value ? (jsx_runtime_1.jsx("button", __assign({ tabIndex: -1, className: "controller", onClick: onClickX }, { children: jsx_runtime_1.jsx(XIcon_1.XIcon, {}, void 0) }), void 0)) : (jsx_runtime_1.jsx("button", __assign({ className: "controller" }, getToggleButtonProps(), { children: jsx_runtime_1.jsx(ArrowIcon_1.ArrowIcon, { isOpen: isOpen }, void 0) }), void 0)))] }), void 0), children] }), void 0));
});
