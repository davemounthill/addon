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
exports.TransformTableCellError = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var dto_1 = require("@syncwith/dto");
var WarningIcon_1 = require("../previewPane/WarningIcon");
var FieldOverlay_1 = require("./FieldOverlay");
var misc_1 = require("../../utils/misc");
var MAX_VALUE_LENGTH = 70;
var TransformTableCellError = function (props) {
    var id = props.id, error = props.error;
    var truncatedMessage = misc_1.truncate(error.message, MAX_VALUE_LENGTH);
    if (dto_1.HttpRequestErrorDetails.guard(error)) {
        var getContent = function () {
            var content = typeof error.content === 'string'
                ? error.content
                : JSON.stringify(error.content, null, 2);
            return (jsx_runtime_1.jsxs("div", { children: [error.message, jsx_runtime_1.jsx("br", {}, void 0), jsx_runtime_1.jsx("br", {}, void 0), jsx_runtime_1.jsx("pre", { children: content }, void 0)] }, void 0));
        };
        return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: jsx_runtime_1.jsxs("div", __assign({ className: "td-container" }, { children: [jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx(WarningIcon_1.WarningIcon, {}, void 0), " Error: ", truncatedMessage] }, void 0), jsx_runtime_1.jsx(FieldOverlay_1.FieldOverlay, { id: id + "-error-popover", popoverClassName: "value-popover", childClassName: "value-popover-child", getContent: getContent, getTitle: function () { return error.statusText; }, delay: 200 }, void 0)] }), void 0) }, void 0));
    }
    if (error.message.length > MAX_VALUE_LENGTH) {
        return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: jsx_runtime_1.jsxs("div", __assign({ className: "td-container" }, { children: [jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx(WarningIcon_1.WarningIcon, {}, void 0), " Error: ", truncatedMessage] }, void 0), jsx_runtime_1.jsx(FieldOverlay_1.FieldOverlay, { id: id + "-error-popover", popoverClassName: "value-popover", childClassName: "value-popover-child", getContent: function () { return error.message; }, getTitle: function () { return error.code; }, delay: 200 }, void 0)] }), void 0) }, void 0));
    }
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx(WarningIcon_1.WarningIcon, {}, void 0), " Error: ", error.message] }, void 0));
};
exports.TransformTableCellError = TransformTableCellError;
