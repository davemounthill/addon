"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoColumns = void 0;
/* eslint-disable @typescript-eslint/ban-types */
var react_1 = require("react");
var react_fast_compare_1 = __importDefault(require("react-fast-compare"));
var usePrevious_1 = require("../../../hooks/usePrevious");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var ConnectorContext_1 = require("../context/ConnectorContext");
var PreviewContext_1 = require("../context/PreviewContext");
var ConnStateContext_1 = require("../../editConnection/connState/ConnStateContext");
var helpers_1 = require("../../editConnection/connState/helpers");
var usePreviousAvailableColumns_1 = require("./usePreviousAvailableColumns");
/**
 * If the user removes a column in the request, and it disappears in the response, then we should remove it from the transform
 * - ah this is more general, it applies in any cases where we have columns in the transform that are not in the response
 */
var removeMissingColumns = function (selected, available) {
    var missing = selected.filter(function (s) { return available.find(function (a) { return a.id === s.id; }) === undefined; });
    if (missing.length > 0) {
        return selected.filter(function (s) { return missing.find(function (m) { return m.id === s.id; }) === undefined; });
    }
    return selected;
};
/**
 * Get the values (parameter values, header values, etc) that specify/generate columns in the response
 * - often these are dimensions, metrics
 *
 * Requires: that this suggestion (connector) have specified x-connector.columnsInRequest
 */
var getValuesInRequest = function (columnsInRequest, connState) {
    var valuesInRequest = [];
    // damn why do I need to type the result of Object.keys? :(
    Object.keys(columnsInRequest).forEach(function (k) {
        var params = helpers_1.getParamsOfType(connState, k);
        var names = columnsInRequest[k];
        names.forEach(function (name) {
            var param = params.find(function (p) { return p.name === name; });
            if (param) {
                // assume it could be comma separated, really we should check the schema in `suggestion`
                var values = param.value ? param.value.split(',') : [];
                valuesInRequest = __spreadArray(__spreadArray([], valuesInRequest), values);
            }
        });
    });
    return valuesInRequest;
};
/**
 * See if there are any new columns in the response that match values in the request (that we believe are columns)
 */
var getNewColumnsFromRequest = function (columnsInRequest, connState, availableColumns, previousAvailableColumns) {
    var matched = [];
    var unmatched = [];
    var valuesInRequest = getValuesInRequest(columnsInRequest, connState);
    // Find the columns we're permitted to auto-add
    // which is the new columns we haven't seen before
    var candidateColumns = availableColumns.filter(function (a) { return previousAvailableColumns.find(function (p) { return p.id === a.id; }) === undefined; });
    // loop through each value (which we think are columns, metrics, dimensions etc), and see if we should add it
    valuesInRequest.forEach(function (valueInRequest) {
        // for now do something simple, add it if its missing
        // this works well unless the user deleted it and we're re-adding it, d'oh
        // Todo:
        // 1. match columns better (don't use label, instead we need the leaf `key` for this column unaltered)
        // 2. Need to confirm this column was missing in the previous response before we consider adding it
        var matchingColumns = candidateColumns.filter(function (a) {
            return a.label.toLowerCase().indexOf(valueInRequest.toLowerCase()) >= 0 ||
                a.path[a.path.length - 1]
                    .toLowerCase()
                    .indexOf(valueInRequest.toLowerCase()) >= 0;
        });
        // did we find the column?
        if (matchingColumns.length === 1) {
            var matchingColumn = matchingColumns[0];
            matched.push(matchingColumn);
        }
        else {
            unmatched = __spreadArray(__spreadArray([], unmatched), matchingColumns);
        }
    });
    return { matched: matched, unmatched: unmatched };
};
/**
 * Our job is to watch columns, request and responses change and add/remove columns from the table as necessary
 * to "do the right thing"
 */
var useAutoColumns = function (columnsState) {
    var _a;
    var _b = useStrictContext_1.useStrictContext(ConnectorContext_1.ConnectorContext), columnsMode = _b.columnsMode, suggestion = _b.suggestion;
    var connState = useStrictContext_1.useStrictContext(ConnStateContext_1.ConnStateContext);
    var preview = useStrictContext_1.useStrictContext(PreviewContext_1.PreviewContext);
    var previousPreview = usePrevious_1.usePrevious(preview);
    var _c = react_1.useState([]), newAvailableColumns = _c[0], setNewAvailableColumns = _c[1];
    var previousAvailableColumns = usePreviousAvailableColumns_1.usePreviousAvailableColumns({
        preview: preview,
        availableColumns: columnsState.availableColumns,
    });
    react_1.useEffect(function () {
        var _a;
        var justRefreshed = (previousPreview === null || previousPreview === void 0 ? void 0 : previousPreview.data.status) === 'loading' &&
            preview.data.status === 'loaded';
        // Do nothing unless the user *just* refreshed
        if (!justRefreshed) {
            return;
        }
        var selectedColumns = columnsState.selectedColumns, availableColumns = columnsState.availableColumns;
        // See which of our selected columns are *still* available, eg maybe they all disappered out from under us
        var effSelected = selectedColumns.filter(function (s) {
            return availableColumns.find(function (a) { return a.id === s.id; });
        });
        var newSelectedColumns = __spreadArray([], effSelected);
        // Try to identify if this is the first refresh when we already have a transform
        // It'd be nice if previousAvailableColumns was undefined, that'd be more clear/explicit
        var firstRefreshWithTransform = previousAvailableColumns.length === 0 &&
            connState.value.transform !== undefined;
        if (columnsMode === 'columns-from-response') {
            // Choose some initial columns if we just loaded (and if we don't have any already)
            if (selectedColumns.length === 0 && availableColumns.length > 0) {
                newSelectedColumns = availableColumns.slice(0, 3);
            }
        }
        else if (columnsMode === 'columns-in-request') {
            var columnsInRequest = (_a = suggestion.endpoint.connector) === null || _a === void 0 ? void 0 : _a.columnsInRequest;
            if (!columnsInRequest)
                throw new Error("Expected columnsInRequest"); // should never happen
            if (!firstRefreshWithTransform) {
                // avoid re-adding columns on first load
                // 1. user adds a metric to the request
                // 2. we auto-add that column to the transform
                // 3. they remove it from the transform (we don't remove it from the request)
                // 4. they re-edit the connection (or re-preview), and we inadvertently re-add it since its missing
                var newColumnsFromRequest = getNewColumnsFromRequest(columnsInRequest, connState.value, availableColumns, previousAvailableColumns);
                // Add exact matches
                newColumnsFromRequest.matched.forEach(function (newColumn) {
                    if (!newSelectedColumns.find(function (s) { return s.id === newColumn.id; })) {
                        newSelectedColumns.push(newColumn);
                    }
                });
            }
            // if we don't have any columns, then add some
            // Choose some initial columns if we just loaded (and if we don't have any already)
            if (newSelectedColumns.length === 0 &&
                effSelected.length === 0 &&
                availableColumns.length > 0) {
                newSelectedColumns = availableColumns.slice(0, 3);
            }
        }
        newSelectedColumns = removeMissingColumns(newSelectedColumns, availableColumns);
        var firstRefresh = previousAvailableColumns.length === 0;
        // on the first refresh don't detect any columns as `new`
        if (!firstRefresh) {
            // any available columns, not previously available
            var tempNewAvailableColumns = availableColumns.filter(function (a) {
                return previousAvailableColumns.find(function (pa) { return pa.id === a.id; }) === undefined;
            });
            setNewAvailableColumns(tempNewAvailableColumns);
        }
        // changes?
        if (!react_fast_compare_1.default(selectedColumns, newSelectedColumns)) {
            columnsState.setSelectedColumns(newSelectedColumns);
        }
    }, [
        columnsState,
        columnsMode,
        connState.value,
        preview.data.status,
        previousAvailableColumns,
        previousPreview === null || previousPreview === void 0 ? void 0 : previousPreview.data.status,
        (_a = suggestion.endpoint.connector) === null || _a === void 0 ? void 0 : _a.columnsInRequest,
    ]);
    // filter out any columns that are selected
    // since we don't update `newAvailableColumns` all the time, only on refresh
    // goal: as the user selects these new columns we want the new-count to decrement
    var newAvailableColumnsExceptSelected = newAvailableColumns.filter(function (na) {
        return columnsState.selectedColumns.find(function (s) { return s.id === na.id; }) === undefined;
    });
    return {
        newAvailableColumns: newAvailableColumnsExceptSelected,
    };
};
exports.useAutoColumns = useAutoColumns;
