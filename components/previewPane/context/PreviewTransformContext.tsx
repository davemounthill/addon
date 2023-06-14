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
exports.PreviewTransformProvider = exports.PreviewTransformContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var PreviewContext_1 = require("./PreviewContext");
var TransformContext_1 = require("./TransformContext");
exports.PreviewTransformContext = react_1.default.createContext({});
/**
 * This is basically a thin wrapper around TransformProvider making it conditional on whether or not we have data
 */
var PreviewTransformProvider = function (props) {
    var data = react_1.default.useContext(PreviewContext_1.PreviewContext).data;
    if (data.status === 'loaded') {
        return (jsx_runtime_1.jsx(TransformContext_1.TransformProvider, __assign({ onChange: props.onChange, data: data.value.results, transform: props.transform, defaultTransform: props.defaultTransform }, { children: jsx_runtime_1.jsx(TransformContext_1.TransformContext.Consumer, { children: function (transformContext) {
                    return (jsx_runtime_1.jsx(exports.PreviewTransformContext.Provider, __assign({ value: {
                            value: {
                                transformContext: transformContext,
                            },
                        } }, { children: props.children }), void 0));
                } }, void 0) }), void 0));
    }
    return (jsx_runtime_1.jsx(exports.PreviewTransformContext.Provider, __assign({ value: { value: undefined } }, { children: props.children }), void 0));
};
exports.PreviewTransformProvider = PreviewTransformProvider;
