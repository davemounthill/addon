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
exports.SelectColumnsValidationError = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var solid_1 = require("@heroicons/react/20/solid");
var useStrictContext_1 = require("../../hooks/useStrictContext");
var ValidationContext_1 = require("./validation/ValidationContext");
var ValidationError_1 = require("./ui/ValidationError");
var SelectColumnsValidationError = function () {
    var validation = useStrictContext_1.useStrictContext(ValidationContext_1.ValidationContext);
    return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: validation.state.columns && (jsx_runtime_1.jsxs("div", __assign({ className: "flex space-x-3 items-center" }, { children: [jsx_runtime_1.jsx(solid_1.ExclamationCircleIcon, { className: "h-6 w-6 text-red-500", "aria-hidden": "true" }, void 0), jsx_runtime_1.jsx(ValidationError_1.ValidationError, { error: validation.state.columns, className: "mt-0" }, void 0)] }), void 0)) }, void 0));
};
exports.SelectColumnsValidationError = SelectColumnsValidationError;
