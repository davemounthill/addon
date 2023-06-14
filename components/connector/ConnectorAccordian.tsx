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
exports.ConnectorAccordian = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var solid_1 = require("@heroicons/react/20/solid");
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var useStrictContext_1 = require("../../hooks/useStrictContext");
var Scheduling_1 = require("../editConnection/Scheduling");
var StatusRow_1 = require("../editConnection/StatusRow");
var AccordianCard_1 = require("../ui/AccordianCard");
var ConnectorContext_1 = require("./context/ConnectorContext");
var Parameters_1 = require("./parameters/Parameters");
var ValidationContext_1 = require("./validation/ValidationContext");
var connectorAccordianHelper_1 = require("./connectorAccordianHelper");
var ConnectorAccordian = function (props) {
    var className = props.className;
    var suggestion = useStrictContext_1.useStrictContext(ConnectorContext_1.ConnectorContext).suggestion;
    var validation = useStrictContext_1.useStrictContext(ValidationContext_1.ValidationContext);
    var _a = react_1.useState(props.value || 'general'), navItem = _a[0], setNavItem = _a[1];
    // Watch for validation errors and focus the connector
    react_1.useEffect(function () {
        if (validation.state.valid === false) {
            var newAccordionError = connectorAccordianHelper_1.getAccordionError(validation.state);
            if (newAccordionError)
                setNavItem(newAccordionError);
        }
    }, [validation.state]);
    return (jsx_runtime_1.jsxs(react_bootstrap_1.Accordion, __assign({ className: "connection-accordian " + className, activeKey: navItem, onSelect: function (eventKey) {
            if (eventKey)
                setNavItem(eventKey);
        } }, { children: [jsx_runtime_1.jsx(AccordianCard_1.AccordianCard, __assign({ title: "Connection", eventKey: "general", currentEventKey: navItem, className: "rounded-tr-none" // do this on the FIRST accordiancard
                , bodyClassName: "p-0", icon: solid_1.AdjustmentsVerticalIcon }, { children: jsx_runtime_1.jsx(Parameters_1.Parameters, {}, void 0) }), void 0), jsx_runtime_1.jsx(AccordianCard_1.AccordianCard, __assign({ title: "Scheduling", eventKey: "schedule", currentEventKey: navItem, icon: solid_1.ClockIcon }, { children: jsx_runtime_1.jsx(Scheduling_1.Scheduling, { tier: suggestion.host.tier }, void 0) }), void 0), jsx_runtime_1.jsx(AccordianCard_1.AccordianCard, __assign({ title: "Advanced", eventKey: "advanced", currentEventKey: navItem, icon: solid_1.CogIcon, className: "rounded-br-none" // do this on the LAST accordiancard
             }, { children: jsx_runtime_1.jsx(StatusRow_1.StatusRow, { hideTitle: true }, void 0) }), void 0)] }), void 0));
};
exports.ConnectorAccordian = ConnectorAccordian;
