"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoRefresh = void 0;
var react_1 = require("react");
var react_fast_compare_1 = __importDefault(require("react-fast-compare"));
var usePrevious_1 = require("../../../hooks/usePrevious");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var ConnStateContext_1 = require("../../editConnection/connState/ConnStateContext");
var PreviewContext_1 = require("../context/PreviewContext");
/**
 * Watch for changes that would cause us to want us to auto refresh the connection
 *
 * We do this by watching ConnState to make sure ConnState has been udpated
 * - I tried implementing this from UI events, but ConnState wasn't updated yet :(
 */
var useAutoRefresh = function () {
    var preview = useStrictContext_1.useStrictContext(PreviewContext_1.PreviewContext);
    var connState = useStrictContext_1.useStrictContext(ConnStateContext_1.ConnStateContext).value;
    var previousConnState = usePrevious_1.usePrevious(connState);
    react_1.useEffect(function () {
        var changed = function (fn) {
            if (!previousConnState)
                return true;
            return !react_fast_compare_1.default(fn(connState), fn(previousConnState));
        };
        if (!preview.refreshed)
            return; // don't start autorefreshing until after the first refresh
        if (preview.data.status === 'error' || preview.data.status === 'empty')
            return; // don't auto-refresh in error state etc
        if (changed(function (x) { return x.parameters; }) ||
            changed(function (x) { return x.headers; }) ||
            changed(function (x) { return x.pathParameters; }) ||
            changed(function (x) { return x.variables; }) ||
            changed(function (x) { return x.authentication; })) {
            preview.refresh({ debounced: true });
        }
    }, [
        connState,
        preview,
        preview.data.status,
        preview.refresh,
        preview.refreshed,
        previousConnState,
    ]);
};
exports.useAutoRefresh = useAutoRefresh;
