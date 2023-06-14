"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnChangeNotifier = void 0;
var react_1 = require("react");
var TransformContext_1 = require("./context/TransformContext");
// A control that listens for new column names and publishes them upwards
// so that the Synchronize update mode control can have a list of column
// names to show the user.
var ColumnChangeNotifier = function (props) {
    var onColumnsChanged = props.onColumnsChanged;
    var output = react_1.useContext(TransformContext_1.TransformContext).output;
    var _a = react_1.useState([]), names = _a[0], setNames = _a[1];
    react_1.useEffect(function () {
        if (!output)
            return;
        var result = output.result, truncatedResult = output.truncatedResult;
        var data = truncatedResult || result;
        var newNames = data.columns.map(function (col) { return col.displayName; });
        if (JSON.stringify(names) !== JSON.stringify(newNames)) {
            onColumnsChanged(newNames);
            setNames(newNames);
        }
    }, [onColumnsChanged, output, names, setNames]);
    return null;
};
exports.ColumnChangeNotifier = ColumnChangeNotifier;
