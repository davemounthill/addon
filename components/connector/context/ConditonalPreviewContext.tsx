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
exports.useConditionalPreviewContext = exports.ConditionalPreviewContextProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var ConnectorContext_1 = require("./ConnectorContext");
var PreviewContext_1 = require("./PreviewContext");
var usePreviewDebounced_1 = require("../hooks/usePreviewDebounced");
/**
 * Lets us provide the <PreviewContextProvider/> when in a dialog, but not the sidebar
 */
var ConditionalPreviewContextProvider = function (props) {
    var children = props.children;
    var context = useStrictContext_1.useStrictContext(ConnectorContext_1.ConnectorContext);
    var includePreviewContext = context.layout === 'dialog';
    var preview = usePreviewDebounced_1.usePreviewDebounced();
    if (!includePreviewContext) {
        return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: children }, void 0);
    }
    return (jsx_runtime_1.jsx(PreviewContext_1.PreviewContextProvider, __assign({}, preview, { children: children }), void 0));
};
exports.ConditionalPreviewContextProvider = ConditionalPreviewContextProvider;
/** Lets us be very explicit about whether or not we should have preview context */
var useConditionalPreviewContext = function () {
    var context = useStrictContext_1.useStrictContext(ConnectorContext_1.ConnectorContext);
    var preview = react_1.useContext(PreviewContext_1.PreviewContext);
    if (context.layout === 'dialog') {
        if (!preview)
            throw new Error("Expected preview context");
        return preview;
    }
    return undefined;
};
exports.useConditionalPreviewContext = useConditionalPreviewContext;
