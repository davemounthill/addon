"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePreviousAvailableColumns = void 0;
var react_1 = require("react");
var usePreviousAvailableColumns = function (props) {
    var preview = props.preview, availableColumns = props.availableColumns;
    var previousAvailableColumns = react_1.useRef([]);
    react_1.useEffect(function () {
        // Only change our available columns if we've loaded our preview data (eg avoid "flashing" to no columns while refreshing)
        if (preview.data.status === 'loaded') {
            previousAvailableColumns.current = availableColumns;
        }
    }, [availableColumns, preview.data.status]);
    return previousAvailableColumns.current; // in the end, return the current ref value.
};
exports.usePreviousAvailableColumns = usePreviousAvailableColumns;
