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
exports.useColumns = void 0;
var json2table_1 = require("@syncwith/json2table");
var useStrictContext_1 = require("../../../hooks/useStrictContext");
var StoreLoadedContext_1 = require("../../../store/StoreLoadedContext");
var ConnStateContext_1 = require("../../editConnection/connState/ConnStateContext");
var json2TableTransform_1 = require("./json2TableTransform");
var lib_1 = require("../lib");
var PreviewContext_1 = require("../context/PreviewContext");
var useJson2TableCols_1 = require("./useJson2TableCols");
var mkColumn = function (col) {
    // attempt to parse and regenerate json2table stuff
    var path = col.name.split('.');
    var subLabelPath = path.slice(1, path.length - 1);
    var sublabel = subLabelPath.length > 0
        ? subLabelPath.map(lib_1.mkLabelFromValue).join('.')
        : undefined;
    return {
        label: col.displayName,
        id: col.name,
        path: path,
        sublabel: sublabel,
    };
};
var useColumns = function (props) {
    var timezone = useStrictContext_1.useStrictContext(StoreLoadedContext_1.StoreLoadedContext).spreadsheetProperties.timezone;
    var data = props.data;
    var connState = useStrictContext_1.useStrictContext(ConnStateContext_1.ConnStateContext);
    var json2TableCols = useJson2TableCols_1.useJson2TableCols({ data: data, timezone: timezone });
    var preview = useStrictContext_1.useStrictContext(PreviewContext_1.PreviewContext);
    var getSelectedColumns = function () {
        // look at our transform to return columns
        if (connState.value.transform && preview.data.status === 'loaded') {
            // Generate our preview output here (TODO: don't regenerate this unnecessarily like this)
            var output = json2table_1.json2table(
            // eslint-disable-next-line @typescript-eslint/ban-types
            preview.data.value.results[0].json, connState.value.transform);
            return output.columns.map(mkColumn);
        }
        return [];
    };
    var selectedColumns = getSelectedColumns();
    var setSelectedColumns = function (columns) {
        // reset back to an undefined transform if no columns
        var transform = columns.length > 0
            ? json2TableTransform_1.json2TableTransform(data, columns, json2TableCols)
            : undefined;
        connState.set(function (state) {
            return __assign(__assign({}, state), { transform: transform });
        });
    };
    var availableColumns = json2TableCols.output.columns.map(mkColumn);
    return {
        selectedColumns: selectedColumns,
        availableColumns: availableColumns,
        setSelectedColumns: setSelectedColumns,
    };
};
exports.useColumns = useColumns;
