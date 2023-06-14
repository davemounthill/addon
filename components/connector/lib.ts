"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkConnPaginationState = exports.mkConnectorTitle = exports.mkEndpointName = exports.mkLabelFromValue = exports.ensureControlInConnState = exports.DefaultThemeType = void 0;
var typed_apis_1 = require("@syncwith/typed-apis");
var dateRangeAdapter_1 = require("./dateRangeAdapter");
exports.DefaultThemeType = 'narrow';
var ensureControlInConnState = function (connState, ctrl, spreadsheetProperties) {
    if (ctrl.type === 'dateRange') {
        return dateRangeAdapter_1.ensureDateRangeInConnState(connState, ctrl, typed_apis_1.DefaultDateRange, spreadsheetProperties.timezone);
    }
    throw new Error("Unsupported control type: " + ctrl.type);
};
exports.ensureControlInConnState = ensureControlInConnState;
function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
var camelCaseToWords = function (s) {
    return (s
        // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function (x) { return x.toUpperCase(); }));
};
var isCamelCase = function (s) {
    return !s.match(/[\s_-]/g);
};
/** Turn api values into nicer labels, eg `incomplete_expired` -> `Incomplete expired` */
var mkLabelFromValue = function (value) {
    if (isCamelCase(value)) {
        return camelCaseToWords(value);
    }
    var newValue = value;
    newValue = replaceAll(newValue, '-', ' ');
    newValue = replaceAll(newValue, '_', ' ');
    newValue = replaceAll(newValue, '.', ' ');
    return capitalizeFirstLetter(newValue);
};
exports.mkLabelFromValue = mkLabelFromValue;
var mkEndpointName = function (path) {
    var parts = path.split('/');
    return capitalizeFirstLetter(parts[parts.length - 1]);
};
exports.mkEndpointName = mkEndpointName;
var mkConnectorTitle = function (suggestion) {
    var _a;
    return (((_a = suggestion.endpoint.connector) === null || _a === void 0 ? void 0 : _a.title) ||
        suggestion.endpoint.operation['x-title'] ||
        exports.mkEndpointName(suggestion.endpoint.path));
};
exports.mkConnectorTitle = mkConnectorTitle;
var mkConnPaginationState = function (pagination) {
    if (pagination.type === 'cursor') {
        var type = pagination.type, parameter = pagination.parameter, path = pagination.path, maxPages = pagination.maxPages;
        return {
            type: type,
            parameter: parameter,
            maxPages: maxPages ? maxPages.toString() : '',
            path: path.join('.'),
        };
    }
    if (pagination.type === 'offset') {
        var type = pagination.type, increment = pagination.increment, initialValue = pagination.initialValue, parameter = pagination.parameter, maxPages = pagination.maxPages, stopWhenCurrentValueExceeds = pagination.stopWhenCurrentValueExceeds, stopWhenNullOrEmpty = pagination.stopWhenNullOrEmpty, stopWhenNextValueExceeds = pagination.stopWhenNextValueExceeds;
        var stopPath = stopWhenCurrentValueExceeds ||
            stopWhenNextValueExceeds ||
            stopWhenNullOrEmpty;
        return {
            type: type,
            increment: increment.toString(),
            initialValue: initialValue.toString(),
            parameter: parameter,
            // eslint-disable-next-line no-nested-ternary
            stopMode: stopWhenNullOrEmpty
                ? 'stopWhenNullOrEmpty'
                : stopWhenCurrentValueExceeds
                    ? 'stopWhenCurrentValueExceeds'
                    : 'stopWhenNextValueExceeds',
            stopPath: stopPath ? stopPath.join('.') : '',
            maxPages: maxPages ? maxPages.toString() : '',
        };
    }
    if (pagination.type === 'url') {
        var type = pagination.type, path = pagination.path, location_1 = pagination.location, maxPages = pagination.maxPages;
        return {
            type: type,
            path: path.join('.'),
            location: location_1,
            maxPages: maxPages ? maxPages.toString() : '',
        };
    }
    throw new Error("Pagination type not yet supported: " + JSON.stringify(pagination));
};
exports.mkConnPaginationState = mkConnPaginationState;
