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
exports.Parameters = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var common_utils_1 = require("@syncwith/common-utils");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var openAPIEndpoint_1 = require("../../../utils/openAPIEndpoint");
var ConnectorContext_1 = require("../context/ConnectorContext");
var DateRangeUIControl_1 = require("../DateRangeUIControl");
var Authentication_1 = require("../../editConnection/auth/Authentication");
var ConnStateContext_1 = require("../../editConnection/connState/ConnStateContext");
var ValidationContext_1 = require("../validation/ValidationContext");
var SidebarSection_1 = require("../ui/SidebarSection");
var SidebarFieldName_1 = require("../ui/SidebarFieldName");
var Input_1 = require("../ui/Input");
var ParamComponents_1 = require("./ParamComponents");
var Parameters = function () {
    var _a;
    var suggestion = useStrictContext_1.useStrictContext(ConnectorContext_1.ConnectorContext).suggestion;
    var connState = useStrictContext_1.useStrictContext(ConnStateContext_1.ConnStateContext);
    var validation = useStrictContext_1.useStrictContext(ValidationContext_1.ValidationContext);
    var endpoint = suggestion.endpoint;
    var supportsOAuth = !!((_a = endpoint.securitySchemes) === null || _a === void 0 ? void 0 : _a.find(function (s) { return s.type === 'oauth2'; }));
    var controls = endpoint.operation['x-controls'] || [];
    var controlParams = controls.flatMap(function (c) { return [
        c.parameters.gte,
        c.parameters.lte,
    ]; });
    var supportedControls = controls.flatMap(function (c) {
        return c.type === 'dateRange' ? [c] : [];
    });
    var params = openAPIEndpoint_1.getAllParameters(suggestion.endpoint)
        // include require parameters and parameters with connectorPriority
        // exclude connectorPriority = 0
        .filter(function (p) {
        return (p.connectorPriority || 0) > 0 ||
            (p.required && p.connectorPriority !== 0);
    })
        // exclude parameters that are in controls
        .filter(function (p) { return !controlParams.find(function (p2) { return p2.in === p.in && p2.name === p.name; }); });
    var supportedParams = params.filter(function (p) {
        var _a, _b, _c;
        return !!((_a = p.schema) === null || _a === void 0 ? void 0 : _a.enum) ||
            ((_b = p.schema) === null || _b === void 0 ? void 0 : _b.type) === 'string' ||
            (((_c = p.schema) === null || _c === void 0 ? void 0 : _c.type) === 'array' && !!common_utils_1.getNonRef(p.schema.items).enum);
    });
    var requiredParams = supportedParams.filter(function (p) { return p.required; });
    var optionalParams = supportedParams.filter(function (p) { return !p.required; });
    requiredParams.sort(function (a, b) { return (b.connectorPriority || 0) - (a.connectorPriority || 0); });
    optionalParams.sort(function (a, b) { return (b.connectorPriority || 0) - (a.connectorPriority || 0); });
    return (jsx_runtime_1.jsxs("div", __assign({ className: "divide-y divide-gray-200" }, { children: [jsx_runtime_1.jsx(SidebarSection_1.SidebarSection, { children: jsx_runtime_1.jsx(Input_1.Input, { type: "text", name: "connectionName", value: connState.value.name, onChange: function (newValue) { return connState.set({ name: newValue }); }, placeholder: "Untitled connection" }, void 0) }, void 0), supportsOAuth && (jsx_runtime_1.jsxs(SidebarSection_1.SidebarSection, { children: [jsx_runtime_1.jsx(SidebarFieldName_1.SidebarFieldName, { children: "Authentication" }, void 0), jsx_runtime_1.jsx(Authentication_1.Authentication, { validation: {
                            state: validation.state.authentication,
                            clear: validation.clear,
                        }, hideHeading: true, typesWhitelist: ['oauth'] }, void 0)] }, void 0)), (supportedControls.length > 0 || requiredParams.length > 0) && (jsx_runtime_1.jsxs(SidebarSection_1.SidebarSection, __assign({ className: "space-y-4" }, { children: [supportedControls.map(function (ctrl) {
                        return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx(SidebarFieldName_1.SidebarFieldName, { children: ctrl.title }, void 0), jsx_runtime_1.jsx(DateRangeUIControl_1.DateRangeUIControl, { ctrl: ctrl }, void 0)] }, ctrl.name));
                    }), jsx_runtime_1.jsx(ParamComponents_1.ParamComponents, { params: requiredParams }, void 0)] }), void 0)), optionalParams.length > 0 && (jsx_runtime_1.jsx(SidebarSection_1.SidebarSection, __assign({ className: "space-y-4" }, { children: jsx_runtime_1.jsx(ParamComponents_1.ParamComponents, { params: optionalParams }, void 0) }), void 0))] }), void 0));
};
exports.Parameters = Parameters;
