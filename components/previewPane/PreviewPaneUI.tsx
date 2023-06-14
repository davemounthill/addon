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
exports.PreviewPaneUI = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Navigation_1 = require("./Navigation");
var Actions_1 = __importDefault(require("./Actions"));
var Preview_1 = require("./Preview");
var Source_1 = require("./Source");
var Footer_1 = __importDefault(require("./Footer"));
require("./PreviewPane.css");
var Viewport_1 = __importDefault(require("./Viewport"));
var Loading_1 = __importDefault(require("./Loading"));
var PreviewDialogContext_1 = require("./context/PreviewDialogContext");
var PreviewPaneUI = function () {
    var _a = react_1.useState('preview'), navKey = _a[0], setNavKey = _a[1];
    var validating = react_1.useContext(PreviewDialogContext_1.PreviewDialogContext).validating;
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx("table", __assign({ className: "preview-nav" }, { children: jsx_runtime_1.jsx("tbody", { children: jsx_runtime_1.jsxs("tr", { children: [jsx_runtime_1.jsx("td", { children: jsx_runtime_1.jsx(Navigation_1.Navigation, { id: "preview-nav", navKey: navKey, onChange: setNavKey }, void 0) }, void 0), jsx_runtime_1.jsx("td", __assign({ className: "preview-actions" }, { children: jsx_runtime_1.jsx(Actions_1.default, { navKey: navKey }, void 0) }), void 0)] }, void 0) }, void 0) }), void 0), validating && (jsx_runtime_1.jsx(Viewport_1.default, { children: jsx_runtime_1.jsx(Loading_1.default, { status: 'Validating...' }, void 0) }, void 0)), !validating && navKey === 'preview' && jsx_runtime_1.jsx(Preview_1.Preview, {}, void 0), !validating && navKey === 'source' && jsx_runtime_1.jsx(Source_1.Source, {}, void 0), jsx_runtime_1.jsx(Footer_1.default, { navKey: navKey }, void 0)] }, void 0));
};
exports.PreviewPaneUI = PreviewPaneUI;
