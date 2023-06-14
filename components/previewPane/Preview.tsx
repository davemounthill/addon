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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preview = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var typed_apis_1 = require("@syncwith/typed-apis");
var eventTracking_1 = require("../../utils/eventTracking");
var eventTrackingUtil_1 = require("../../utils/eventTrackingUtil");
var Loading_1 = __importDefault(require("./Loading"));
var PreviewContext_1 = require("./context/PreviewContext");
var RenderConnectionError_1 = __importDefault(require("./RenderConnectionError"));
var TransformContext_1 = require("./context/TransformContext");
var Viewport_1 = __importDefault(require("./Viewport"));
var transformTable_1 = require("../transformTable");
var PreviewSample_1 = __importDefault(require("./PreviewSample"));
var connection_1 = require("../../utils/connection");
var PreviewDialogContext_1 = require("./context/PreviewDialogContext");
var Preview = function () {
    var mkConnection = react_1.useContext(PreviewDialogContext_1.PreviewDialogContext).mkConnection;
    var data = react_1.useContext(PreviewContext_1.PreviewContext).data;
    var _a = react_1.useContext(TransformContext_1.TransformContext), output = _a.output, transform = _a.transform, update = _a.update;
    var renderLoaded = function () {
        var result = output.result, proposals = output.proposals, truncatedResult = output.truncatedResult;
        return (jsx_runtime_1.jsx(transformTable_1.TransformTable, { tableClassName: "table table-striped transform-table", onTableTransformChanged: function (newTransform, event) {
                // Track an event
                var action = event.action, properties = __rest(event, ["action"]);
                eventTracking_1.trackEvent({ category: typed_apis_1.Category.jsonToTable, name: action }, eventTrackingUtil_1.toProperties(properties));
                update(newTransform);
            }, tableTransform: transform, data: truncatedResult || result, proposals: proposals }, void 0));
    };
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [data.status === 'error' && (jsx_runtime_1.jsx(RenderConnectionError_1.default, { navKey: 'preview', data: data }, void 0)), data.status === 'undefined' && (jsx_runtime_1.jsx(Viewport_1.default, __assign({ disabled: true }, { children: jsx_runtime_1.jsx(PreviewSample_1.default, {}, void 0) }), void 0)), data.status === 'loaded' && (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [data.value.paginationDuplicates && (jsx_runtime_1.jsxs("div", __assign({ className: "error-summary" }, { children: [jsx_runtime_1.jsx("span", __assign({ className: "badge badge-warning" }, { children: "Warning" }), void 0), jsx_runtime_1.jsx("p", { children: "Pagination resulted in a duplicate response. Check your pagination settings." }, void 0)] }), void 0)), jsx_runtime_1.jsx(Viewport_1.default, { children: renderLoaded() }, void 0)] }, void 0)), data.status === 'loading' && (jsx_runtime_1.jsx(Viewport_1.default, { children: jsx_runtime_1.jsx(Loading_1.default, { status: "Connecting to " + connection_1.getConnectionHost(mkConnection()) + "..." }, void 0) }, void 0))] }, void 0));
};
exports.Preview = Preview;
