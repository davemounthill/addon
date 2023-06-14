"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamComponents = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lib_1 = require("../validation/lib");
var lib_2 = require("./lib");
var ParamContainer_1 = require("./ParamContainer");
var ParamComponents = function (props) {
    var params = props.params;
    return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: params
            .flatMap(function (paramSuggestion) {
            // Find our UI component
            var Component = lib_2.getParameterComponent(paramSuggestion);
            if (!Component)
                console.warn("No parameter component found for " + paramSuggestion.in + ":" + paramSuggestion.name);
            // filter us out if we don't have a UI component (eg not yet supported... is this an error?)
            return Component ? [{ Component: Component, paramSuggestion: paramSuggestion }] : [];
        })
            .map(function (_a) {
            var Component = _a.Component, paramSuggestion = _a.paramSuggestion;
            return (jsx_runtime_1.jsx(ParamContainer_1.ParamContainer, { Component: Component, suggestion: paramSuggestion }, lib_1.mkParamKey(paramSuggestion)));
        }) }, void 0));
};
exports.ParamComponents = ParamComponents;
