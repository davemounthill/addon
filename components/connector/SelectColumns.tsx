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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectColumns = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var typed_apis_1 = require("@syncwith/typed-apis");
var useStrictContext_1 = require("../../hooks/useStrictContext");
var ColumnsContext_1 = require("./context/ColumnsContext");
var SelectColumnsSubItem_1 = require("./ui/SelectColumnsSubItem");
var ValidationContext_1 = require("./validation/ValidationContext");
var SelectColumns = function (props) {
    var className = props.className, disabled = props.disabled;
    var _a = useStrictContext_1.useStrictContext(ColumnsContext_1.ColumnsContext), selectedColumns = _a.selectedColumns, availableColumns = _a.availableColumns, newAvailableColumns = _a.newAvailableColumns, setSelectedColumns = _a.setSelectedColumns;
    var validation = useStrictContext_1.useStrictContext(ValidationContext_1.ValidationContext);
    var items = availableColumns
        // Filter out selected columns (since we don't give the multiselect a list of selected columns to show)
        .filter(function (a) { return selectedColumns.find(function (s) { return s.id === a.id; }) === undefined; })
        .map(function (_a) {
        var id = _a.id, label = _a.label, sublabel = _a.sublabel;
        // visually indicate if this is a new column (vs the last response we saw)
        var isNew = !!newAvailableColumns.find(function (n) { return n.id === id; });
        return __assign({ id: id, label: label, sublabel: isNew ? 'New' : undefined }, (sublabel && {
            group: {
                id: sublabel,
                label: sublabel,
            },
        }));
    });
    return (jsx_runtime_1.jsx("div", __assign({ className: "" + className }, { children: jsx_runtime_1.jsxs("div", __assign({ className: "flex items-center" }, { children: [!disabled && newAvailableColumns.length > 0 && (jsx_runtime_1.jsxs("div", __assign({ className: "mr-2 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800" }, { children: [newAvailableColumns.length, " new"] }), void 0)), jsx_runtime_1.jsx("div", { children: jsx_runtime_1.jsx(typed_apis_1.MultiSelect, { disabled: disabled, CustomSubItem: SelectColumnsSubItem_1.SelectColumnsSubItem, className: "w-96", themeType: "narrow", placeholder: "Add column(s)", items: items, selected: [], noItemsWithFilterLabel: "No matching columns found", noItemsLabel: "No more columns available", moreItemsLabelFn: function (itemCount, maxItems) {
                            return "Showing the top " + maxItems + " columns. Search to see more.";
                        }, onSelectedItemsChange: function (selected) {
                            // here we only add new items...
                            validation.clear();
                            var newColumns = selected.map(function (sel) {
                                var col = availableColumns.find(function (c) { return c.id === sel.id; });
                                if (!col)
                                    throw new Error("No column found with id " + sel.id);
                                return col;
                            });
                            setSelectedColumns(__spreadArray(__spreadArray([], selectedColumns), newColumns));
                        } }, void 0) }, void 0)] }), void 0) }), void 0));
};
exports.SelectColumns = SelectColumns;
