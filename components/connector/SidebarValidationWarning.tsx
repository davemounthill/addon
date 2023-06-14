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
exports.SidebarValidationWarning = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useStrictContext_1 = require("../../hooks/useStrictContext");
var ValidationContext_1 = require("./validation/ValidationContext");
var Warning_1 = require("./ui/Warning");
var SidebarValidationWarning = function () {
    var validation = useStrictContext_1.useStrictContext(ValidationContext_1.ValidationContext);
    return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: !validation.state.valid && (jsx_runtime_1.jsx("div", __assign({ className: "mt-4" }, { children: jsx_runtime_1.jsx(Warning_1.Warning, { children: "Please fix one or more issues below" }, void 0) }), void 0)) }, void 0));
};
exports.SidebarValidationWarning = SidebarValidationWarning;
