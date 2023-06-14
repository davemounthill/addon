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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var PreviewDialogContext_1 = require("./context/PreviewDialogContext");
var PreviewTransformContext_1 = require("./context/PreviewTransformContext");
var PreviewContext_1 = require("./context/PreviewContext");
var WarningIcon_1 = require("./WarningIcon");
var Actions_1 = __importDefault(require("../editConnection/Actions"));
require("./Footer.css");
var connection_1 = require("../../api/connection");
var Footer = function (_a) {
    var navKey = _a.navKey;
    var data = react_1.default.useContext(PreviewContext_1.PreviewContext).data;
    var transformCtx = react_1.default.useContext(PreviewTransformContext_1.PreviewTransformContext).value;
    var _b = react_1.default.useContext(PreviewDialogContext_1.PreviewDialogContext), saveAndClose = _b.saveAndClose, connectionSaving = _b.connectionSaving, closeDialog = _b.closeDialog, mkConnection = _b.mkConnection;
    var pluralize = function (n, label) {
        return n === 1 ? n + " " + label : n + " " + label + "s";
    };
    var renderPreviewSummary = function (value) {
        var _a = value.transformContext.output, result = _a.result, truncatedResult = _a.truncatedResult;
        var requestCountSummary;
        var showWarning = !!truncatedResult;
        // If we ran multiple requests (eg because of CellReferences) then
        // indicate how many we ran, and warn if we only ran a subset (eg we run at most 5 requests in preview)
        if (data.status === 'loaded' && data.value.requestCountTotal > 1) {
            if (data.value.results.length === data.value.requestCountTotal) {
                requestCountSummary = " from " + data.value.requestCountTotal + " requests";
            }
            else {
                showWarning = true;
                requestCountSummary = " from " + data.value.results.length + " of " + data.value.requestCountTotal + " requests";
            }
        }
        return (jsx_runtime_1.jsxs("div", __assign({ style: { float: 'left', fontSize: '10px' }, className: "flex items-center" }, { children: [showWarning && (jsx_runtime_1.jsx("span", __assign({ style: { paddingRight: '0.25em' } }, { children: jsx_runtime_1.jsx(WarningIcon_1.WarningIcon, {}, void 0) }), void 0)), pluralize(result.result.length, 'row'), ', ', pluralize(result.columns.length, 'column'), requestCountSummary, truncatedResult && (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [" (Preview is limited to ", truncatedResult.result.length + 1, " rows)"] }, void 0))] }), void 0));
    };
    return (jsx_runtime_1.jsxs("div", __assign({ className: "preview-footer" }, { children: [navKey === 'preview' &&
                transformCtx &&
                renderPreviewSummary(transformCtx), jsx_runtime_1.jsx("div", __assign({ className: "preview-footer-actions" }, { children: jsx_runtime_1.jsx(Actions_1.default, { disabled: connectionSaving, loadingPreview: false, onCancel: closeDialog, isExistingConnection: connection_1.isExistingConnection(mkConnection()), onInsertOrUpdate: saveAndClose, showPreview: false }, void 0) }), void 0)] }), void 0));
};
exports.default = Footer;
