"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellPreviewer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var common_utils_1 = require("@syncwith/common-utils");
var FieldOverlay_1 = require("./FieldOverlay");
var CellPreviewer = function (props) {
    var id = props.id, value = props.value;
    var getPopoverContent = function () {
        return common_utils_1.isObject(value) ? (jsx_runtime_1.jsx("pre", { children: JSON.stringify(value, null, 2) }, void 0)) : (value === null || value === void 0 ? void 0 : value.toString());
    };
    var getTitle = function () {
        return Array.isArray(value)
            ? value.length + " items"
            : common_utils_1.isObject(value)
                ? "1 item, " + Object.keys(value).length + " fields"
                : typeof value === 'string'
                    ? "Text"
                    : typeof value;
    };
    return (jsx_runtime_1.jsx(FieldOverlay_1.FieldOverlay, { id: id, popoverClassName: "value-popover", childClassName: "value-popover-child", getContent: getPopoverContent, getTitle: getTitle, delay: 200 }, void 0));
};
exports.CellPreviewer = CellPreviewer;
