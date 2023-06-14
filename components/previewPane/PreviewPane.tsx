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
exports.PreviewPane = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var common_utils_1 = require("@syncwith/common-utils");
var ConnStateContext_1 = require("../editConnection/connState/ConnStateContext");
var PreviewContext_1 = require("./context/PreviewContext");
var PreviewTransformContext_1 = require("./context/PreviewTransformContext");
var PreviewPaneUI_1 = require("./PreviewPaneUI");
var ColumnChangeNotifier_1 = require("./ColumnChangeNotifier");
var ignoreDefaultTransformIfCellReferences = function (transform, connState) {
    var hasRef = function (value) {
        return value.indexOf('{{') >= 0 && value.indexOf('}}') >= 0;
    };
    if (connState.parameters.find(function (p) { return hasRef(p.value) || hasRef(p.name); }) ||
        connState.pathParameters.find(function (p) { return hasRef(p.value) || hasRef(p.name); }) ||
        connState.variables.find(function (p) { return hasRef(p.value) || hasRef(p.name); }) ||
        connState.headers.find(function (p) { return hasRef(p.value) || hasRef(p.name); }))
        return undefined;
    return transform;
};
var PreviewPane = function (props) {
    var connState = react_1.useContext(ConnStateContext_1.ConnStateContext);
    var operation = connState.suggestion
        ? common_utils_1.getApiOperation(connState.suggestion.endpoint.openapi)
        : undefined;
    // We only want to apply a default transform if there are no cell references;
    // otherwise SW-758 makes the result unusable.
    var transform = ignoreDefaultTransformIfCellReferences(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((operation === null || operation === void 0 ? void 0 : operation.operation) || {})['x-json2table'], connState.value);
    return (jsx_runtime_1.jsx(PreviewContext_1.PreviewProvider, __assign({ connectionError: connState.saveConnError, onInitiateRefresh: function () {
            // if the user refreshes the preview, then clear out any error we have
            connState.clearSaveConnError();
        } }, { children: jsx_runtime_1.jsxs(PreviewTransformContext_1.PreviewTransformProvider, __assign({ defaultTransform: transform, transform: connState.value.transform, 
            // Listen for when the json2table transform changes and update our state, so it can be sent over websockets
            // or simply saved on the connection
            onChange: function (newTransform) {
                // If we're settting a transform then we need to blow away jmespath
                connState.set({
                    transform: newTransform,
                    jmespath: undefined,
                });
            } }, { children: [jsx_runtime_1.jsx(PreviewPaneUI_1.PreviewPaneUI, {}, void 0), jsx_runtime_1.jsx(ColumnChangeNotifier_1.ColumnChangeNotifier, { onColumnsChanged: props.onColumnsChanged }, void 0)] }), void 0) }), void 0));
};
exports.PreviewPane = PreviewPane;
