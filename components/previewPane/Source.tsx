"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Loading_1 = __importDefault(require("./Loading"));
var PreviewContext_1 = require("./context/PreviewContext");
var RenderConnectionError_1 = __importDefault(require("./RenderConnectionError"));
var SourceViewer_1 = __importDefault(require("./SourceViewer"));
var Viewport_1 = __importDefault(require("./Viewport"));
var connection_1 = require("../../utils/connection");
var PreviewDialogContext_1 = require("./context/PreviewDialogContext");
var Source = function () {
    var mkConnection = react_1.useContext(PreviewDialogContext_1.PreviewDialogContext).mkConnection;
    var data = react_1.useContext(PreviewContext_1.PreviewContext).data;
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [data.status === 'undefined' && jsx_runtime_1.jsx(Viewport_1.default, {}, void 0), data.status === 'error' && (jsx_runtime_1.jsx(RenderConnectionError_1.default, { navKey: 'source', data: data }, void 0)), data.status === 'loading' && (jsx_runtime_1.jsx(Viewport_1.default, { children: jsx_runtime_1.jsx(Loading_1.default, { status: "Connecting to " + connection_1.getConnectionHost(mkConnection()) + "..." }, void 0) }, void 0)), data.status === 'loaded' ? (jsx_runtime_1.jsx(Viewport_1.default, { children: data.value.results.map(function (result, index) {
                    return jsx_runtime_1.jsx(SourceViewer_1.default, { data: result.json }, index);
                }) }, void 0)) : null] }, void 0));
};
exports.Source = Source;
