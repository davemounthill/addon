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
exports.ValidationContextConsumer = exports.ValidationContextProvider = exports.ValidationContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var useValidation_1 = require("./useValidation");
exports.ValidationContext = react_1.createContext(undefined);
exports.ValidationContext.displayName = 'ValidationContext'; // useful for error messages with useStrictContext(0)
var ValidationContextProvider = function (props) {
    var validation = useValidation_1.useValidation();
    return (jsx_runtime_1.jsx(exports.ValidationContext.Provider, __assign({ value: validation }, { children: props.children }), void 0));
};
exports.ValidationContextProvider = ValidationContextProvider;
/** I made this because ValidationContext.Consumer returns Validation | undefined :( */
var ValidationContextConsumer = function (props) {
    var children = props.children;
    var validation = useStrictContext_1.useStrictContext(exports.ValidationContext);
    return children(validation);
};
exports.ValidationContextConsumer = ValidationContextConsumer;
