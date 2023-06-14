"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamContainer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var ConnStateContext_1 = require("../../editConnection/connState/ConnStateContext");
var helpers_1 = require("../../editConnection/connState/helpers");
var lib_1 = require("../lib");
var SidebarFieldName_1 = require("../ui/SidebarFieldName");
var lib_2 = require("../validation/lib");
var ValidationContext_1 = require("../validation/ValidationContext");
var ValidationError_1 = require("../ui/ValidationError");
var ParamContainer = function (props) {
    var connState = useStrictContext_1.useStrictContext(ConnStateContext_1.ConnStateContext);
    var validation = useStrictContext_1.useStrictContext(ValidationContext_1.ValidationContext);
    var Component = props.Component, suggestion = props.suggestion;
    var validationError = validation.state.parameters[lib_2.mkParamKey(suggestion)];
    var param = helpers_1.getParameter(connState.value, suggestion.in, suggestion.name);
    var handleParamValueChange = function (newValue) {
        connState.set(function (state) {
            // clear validation error if any
            validation.clear();
            if (!newValue) {
                // remove it if its an empty string, or not present
                return helpers_1.ensureRemoveParamOfType(state, suggestion.in, suggestion.name);
            }
            return helpers_1.ensureParamOfType(state, suggestion.in, {
                name: suggestion.name,
                value: newValue,
            });
        });
    };
    return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx(SidebarFieldName_1.SidebarFieldName, { children: suggestion.title
                    ? lib_1.mkLabelFromValue(suggestion.title)
                    : lib_1.mkLabelFromValue(suggestion.name) }, void 0), jsx_runtime_1.jsx(Component, { param: param, suggestion: suggestion, invalid: validationError !== undefined, onChange: handleParamValueChange }, void 0), validationError && jsx_runtime_1.jsx(ValidationError_1.ValidationError, { error: validationError }, void 0)] }, void 0));
};
exports.ParamContainer = ParamContainer;
