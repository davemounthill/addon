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
exports.SidebarHeader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useStrictContext_1 = require("../../hooks/useStrictContext");
var ConnectorContext_1 = require("./context/ConnectorContext");
var lib_1 = require("./lib");
var SidebarHeader = function () {
    var _a;
    var suggestion = useStrictContext_1.useStrictContext(ConnectorContext_1.ConnectorContext).suggestion;
    var host = suggestion.host, endpoint = suggestion.endpoint;
    var desc = ((_a = endpoint.connector) === null || _a === void 0 ? void 0 : _a.instructions) || endpoint.summary;
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsxs("div", __assign({ className: "flex items-center" }, { children: [host.icon && (jsx_runtime_1.jsx("img", { width: 24, height: 24, src: host.icon.url, className: "mr-3" }, void 0)), jsx_runtime_1.jsxs("div", __assign({ className: "text-base font-medium" }, { children: [host.name, " ", lib_1.mkConnectorTitle(suggestion)] }), void 0)] }), void 0), desc && jsx_runtime_1.jsx("div", __assign({ className: "text-xs text-gray-600 mt-3" }, { children: desc }), void 0)] }, void 0));
};
exports.SidebarHeader = SidebarHeader;
