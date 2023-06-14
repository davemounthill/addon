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
exports.RenderHostedApiRequestError = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lib_1 = require("../connector/lib");
var RenderHostedApiRequestError = function (props) {
    var error = props.error;
    var getHost = function () {
        if (error.source === 'google-ads') {
            return 'Google Ads';
        }
        if (error.source === 'facebook-ads') {
            return 'Facebook Ads';
        }
        return lib_1.mkLabelFromValue(error.source);
    };
    return (jsx_runtime_1.jsxs("div", __assign({ className: "error-summary" }, { children: [jsx_runtime_1.jsx("span", __assign({ className: "badge badge-danger" }, { children: "Error" }), void 0), jsx_runtime_1.jsxs("p", { children: ["We received an error from ", jsx_runtime_1.jsxs("b", { children: [getHost(), ":"] }, void 0)] }, void 0), jsx_runtime_1.jsx("p", { children: error.message }, void 0)] }), void 0));
};
exports.RenderHostedApiRequestError = RenderHostedApiRequestError;
