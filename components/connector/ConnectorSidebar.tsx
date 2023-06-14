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
exports.ConnectorSidebar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Layout_1 = require("../Layout");
var ConnectorCommon_1 = require("./ConnectorCommon");
var SidebarActions_1 = require("./SidebarActions");
var VerticalScroll_1 = require("../ui/VerticalScroll");
var Parameters_1 = require("./parameters/Parameters");
var SidebarHeader_1 = require("./SidebarHeader");
var SidebarValidationWarning_1 = require("./SidebarValidationWarning");
var ConnectorSidebar = function (props) {
    return (jsx_runtime_1.jsx(ConnectorCommon_1.ConnectorCommon, __assign({ layout: "sidebar" }, props, { children: jsx_runtime_1.jsxs(Layout_1.Layout, { children: [jsx_runtime_1.jsx(Layout_1.LayoutPart.Body, { children: jsx_runtime_1.jsxs(VerticalScroll_1.VerticalScroll, { children: [jsx_runtime_1.jsxs("header", __assign({ className: "p-5 bg-gray-200" }, { children: [jsx_runtime_1.jsx(SidebarHeader_1.SidebarHeader, {}, void 0), jsx_runtime_1.jsx(SidebarValidationWarning_1.SidebarValidationWarning, {}, void 0)] }), void 0), jsx_runtime_1.jsx("section", __assign({ className: "border-t border-gray-300 flex flex-col flex-grow" }, { children: jsx_runtime_1.jsx(Parameters_1.Parameters, {}, void 0) }), void 0)] }, void 0) }, void 0), jsx_runtime_1.jsx(Layout_1.LayoutPart.Footer, { children: jsx_runtime_1.jsx(SidebarActions_1.SidebarActions, {}, void 0) }, void 0)] }, void 0) }), void 0));
};
exports.ConnectorSidebar = ConnectorSidebar;
