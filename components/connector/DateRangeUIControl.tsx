"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangeUIControl = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var typed_apis_1 = require("@syncwith/typed-apis");
var react_1 = require("react");
var StoreLoadedContext_1 = require("../../store/StoreLoadedContext");
var ConnStateContext_1 = require("../editConnection/connState/ConnStateContext");
var dateRangeAdapter_1 = require("./dateRangeAdapter");
var lib_1 = require("./lib");
var DateRangeUIControl = function (props) {
    var ctrl = props.ctrl;
    var connState = react_1.useContext(ConnStateContext_1.ConnStateContext);
    var spreadsheetProperties = react_1.useContext(StoreLoadedContext_1.StoreLoadedContext).spreadsheetProperties;
    var getDateRange = function () {
        return (dateRangeAdapter_1.getDateRangeFromConnState(connState.value, ctrl.name) || typed_apis_1.DefaultDateRange);
    };
    var handleDateRangeChange = function (newValue) {
        connState.set(function (state) {
            return dateRangeAdapter_1.ensureDateRangeInConnState(state, ctrl, newValue, spreadsheetProperties.timezone);
        });
    };
    return (jsx_runtime_1.jsx(typed_apis_1.DateRangePicker, { value: getDateRange(), onChange: handleDateRangeChange, themeType: lib_1.DefaultThemeType, className: "w-full" }, void 0));
};
exports.DateRangeUIControl = DateRangeUIControl;
