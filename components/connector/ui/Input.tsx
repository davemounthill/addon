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
exports.Input = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var solid_1 = require("@heroicons/react/20/solid");
var react_1 = require("react");
var useOnBlurInput_1 = require("../../ui/useOnBlurInput");
/**
 * Like a normal input, but also:
 * 1. We can show an inline icon for validation errors
 * 2. We only emit onChange when the user loses focus (or pastes), that way we avoid changing the ConnState every keypress
 */
var Input = function (props) {
    var value = props.value, placeholder = props.placeholder, className = props.className, onChange = props.onChange, type = props.type, name = props.name, id = props.id, invalid = props.invalid;
    var inputRef = react_1.useRef(null);
    var handleChange = function (newValue) {
        if (onChange)
            onChange(newValue);
    };
    var blurHandler = useOnBlurInput_1.useOnBlurInput({
        inputRef: inputRef,
        value: value,
        onChange: handleChange,
    });
    return (jsx_runtime_1.jsxs("div", __assign({ className: "mt-1 relative rounded-md" }, { children: [jsx_runtime_1.jsx("input", { ref: inputRef, autoComplete: "off", spellCheck: "false" // disable autocorrect in safari
                , "data-lpignore": "true" // make lastpass ignore this field
                , type: type, name: name, id: id, value: blurHandler.liveValue, onChange: function (e) { return blurHandler.handleChange(e.target.value); }, className: "border block w-full px-3 py-1 text-sm rounded-md outline-none ring-0 " + (invalid
                    ? 'border-red-300 text-red-900 placeholder-red-300  focus:ring-red-500 focus:border-red-500 pr-10'
                    : 'border-gray-300 text-gray-700 focus:border-bootstrap-light-blue') + " " + className, placeholder: placeholder, "aria-invalid": invalid }, void 0), invalid && (jsx_runtime_1.jsx("div", __assign({ className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" }, { children: jsx_runtime_1.jsx(solid_1.ExclamationCircleIcon, { className: "h-6 w-6 text-red-500", "aria-hidden": "true" }, void 0) }), void 0))] }), void 0));
};
exports.Input = Input;
