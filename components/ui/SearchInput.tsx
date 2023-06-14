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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var svg_1 = require("./svg");
require("./SearchInput.css");
var SearchInput = function (props) {
    var autofocus = props.autofocus, icon = props.icon, onClear = props.onClear, onKeyEnter = props.onKeyEnter, onFocus = props.onFocus, onBlur = props.onBlur, containerStyle = props.containerStyle, inputProps = __rest(props, ["autofocus", "icon", "onClear", "onKeyEnter", "onFocus", "onBlur", "containerStyle"]);
    var ref = react_1.useRef(null);
    var handleClear = function () {
        var _a;
        if (onClear)
            onClear();
        if (autofocus) {
            if (!ref.current) {
                console.warn('Expected ref.current');
            }
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    var handleKeyDown = function (e) {
        if (e.key === 'Enter' && onKeyEnter) {
            onKeyEnter();
        }
    };
    react_1.useEffect(function () {
        var _a;
        // autofocus when we mount
        if (autofocus) {
            if (!ref.current) {
                console.warn('Expected ref.current');
            }
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (jsx_runtime_1.jsxs("div", __assign({ className: "search-input " + (icon ? 'with-icon' : undefined), style: containerStyle }, { children: [icon && jsx_runtime_1.jsx("div", __assign({ className: "icon" }, { children: icon }), void 0), jsx_runtime_1.jsx("input", __assign({ ref: ref }, inputProps, { spellCheck: "false" // disable autocorrect in safari
                , onKeyDown: handleKeyDown, onFocus: onFocus, onBlur: onBlur, className: "form-control form-control-sm" }), void 0), jsx_runtime_1.jsx("button", __assign({ onClick: props.value ? handleClear : undefined, className: "controller " + (props.value ? 'clear' : undefined) }, { children: props.value ? (jsx_runtime_1.jsx(svg_1.XIcon, { height: 14, width: 14 }, void 0)) : (jsx_runtime_1.jsx(svg_1.SearchIcon, { height: 16, width: 16 }, void 0)) }), void 0)] }), void 0));
};
exports.SearchInput = SearchInput;
