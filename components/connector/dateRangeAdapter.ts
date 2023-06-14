"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangeFromConnState = exports.ensureDateRangeInConnState = exports.dateRangeToParameters = void 0;
var dto_1 = require("@syncwith/dto");
var typed_apis_1 = require("@syncwith/typed-apis");
var helpers_1 = require("../editConnection/connState/helpers");
var toTimeRangeHandleAllTime = function (form, value, timezone) {
    if (value.type === 'all-time') {
        return typed_apis_1.toTimeRange(form, {
            type: 'last-x',
            value: {
                period: 'year',
                includeThisPeriod: true,
                qty: 10,
            },
        });
    }
    return typed_apis_1.toTimeRange(form, value, timezone);
};
var dateRangeToParameters = function (ctrl, value, timezone) {
    var timeRange = toTimeRangeHandleAllTime(ctrl.parameters.gte.form, // assume same form on both params :(
    value, timezone);
    if (!timeRange) {
        throw new Error("Failed to get timeRange from " + JSON.stringify(value));
    }
    return [
        {
            name: ctrl.parameters.gte.name,
            value: timeRange.since,
        },
        {
            name: ctrl.parameters.lte.name,
            value: timeRange.until,
        },
    ];
};
exports.dateRangeToParameters = dateRangeToParameters;
var mkVariableName = function (ctrlName) { return "sw-control-" + ctrlName; };
var ensureDateRangeInConnState = function (connState, ctrl, value, timezone) {
    // Store the actual value as a variable (so we can round-trip it)
    var updated = helpers_1.ensureVariable(connState, {
        name: mkVariableName(ctrl.name),
        value: JSON.stringify(typed_apis_1.valueToRt(value)),
    });
    // Generate the actual parameters that the connection will use
    var params = exports.dateRangeToParameters(ctrl, value, timezone);
    for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
        var param = params_1[_i];
        updated = helpers_1.ensureParameter(updated, param);
    }
    return updated;
};
exports.ensureDateRangeInConnState = ensureDateRangeInConnState;
var getDateRangeFromConnState = function (connState, name) {
    var variableName = mkVariableName(name);
    var variable = connState.variables.find(function (v) { return v.name === variableName; });
    var parsed = variable ? JSON.parse(variable.value) : undefined;
    if (parsed && dto_1.DateRange.guard(parsed)) {
        return typed_apis_1.rtToValue(parsed);
    }
    return undefined;
};
exports.getDateRangeFromConnState = getDateRangeFromConnState;
