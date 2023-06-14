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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyError = exports.toProperties = exports.toPropertiesObject = exports.toPropertiesArray = exports.connToProps = exports.getMetadataRows = void 0;
var json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
var common_utils_1 = require("@syncwith/common-utils");
var HttpApiRequestError_1 = __importDefault(require("../api/HttpApiRequestError"));
var util_1 = require("../api/util");
var connection_1 = require("./connection");
var nested_error_1 = require("./nested-error");
var networkError_1 = require("./networkError");
var sentry_1 = require("./sentry");
function getMetadataRows(conn) {
    if ('metadata' in conn) {
        var rows = conn.metadata.rows;
        if (typeof rows === 'number') {
            // The count includes the header row
            return rows - 1;
        }
    }
    return undefined;
}
exports.getMetadataRows = getMetadataRows;
var connToProps = function (conn, options) {
    var _a, _b, _c;
    if (options === void 0) { options = {}; }
    var excludeRows = options.excludeRows;
    var schedules = conn.schedules || [];
    var refresh = schedules.length === 0 ? 'manual' : schedules[0].interval;
    return __assign(__assign({ id: 'id' in conn ? conn.id : undefined, endpoint: conn.data.endpoint, host: connection_1.getConnectionHost(conn), method: conn.data.method, jmespath: conn.data.jmespath, name: conn.name, refresh: refresh, headers: JSON.stringify(conn.data.headers), pagination: JSON.stringify(conn.data.pagination), parameters: JSON.stringify(conn.data.parameters), variables: JSON.stringify(conn.data.variables || []), pathParameters: JSON.stringify(conn.data.pathParameters || []), updateMode: conn.data.updateMode, statusRow: conn.statusRow, body: (_a = conn.data.body) === null || _a === void 0 ? void 0 : _a.content, auth: conn.data.authentication
            ? JSON.stringify(conn.data.authentication)
            : '', transform: conn.data.transform ? JSON.stringify(conn.data.transform) : '', generic: (_b = conn.data.blob) === null || _b === void 0 ? void 0 : _b.generic }, (excludeRows !== true && { rows: getMetadataRows(conn) })), { type: (_c = conn.data.blob) === null || _c === void 0 ? void 0 : _c.type });
};
exports.connToProps = connToProps;
var toPropertiesArray = function (array) {
    if (array.every(function (v) { return typeof v === 'string'; })) {
        return array;
    }
    if (array.every(function (v) { return typeof v === 'number'; })) {
        return array;
    }
    if (array.every(function (v) { return typeof v === 'boolean'; })) {
        return array;
    }
    return array.map(function (v) { return (v ? JSON.stringify(v) : ''); });
};
exports.toPropertiesArray = toPropertiesArray;
var toPropertiesObject = function (object) {
    var properties = {};
    Object.entries(object).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (typeof value === 'number' ||
            typeof value === 'boolean' ||
            typeof value === 'string') {
            properties[key] = value;
        }
        else {
            properties[key] = value ? JSON.stringify(value) : undefined;
        }
    });
    return properties;
};
exports.toPropertiesObject = toPropertiesObject;
var toProperties = function (object) {
    var properties = {};
    Object.entries(object).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (Array.isArray(value)) {
            properties[key] = exports.toPropertiesArray(value);
        }
        else if (common_utils_1.isObject(value)) {
            properties[key] = exports.toPropertiesObject(value);
        }
        else if (typeof value === 'number' ||
            typeof value === 'boolean' ||
            typeof value === 'string') {
            properties[key] = value;
        }
        else {
            properties[key] = value ? JSON.stringify(value) : undefined;
        }
    });
    return properties;
};
exports.toProperties = toProperties;
var stringSubset = function (s, n) {
    return s.length > n ? s.substr(0, n) + "..." : s;
};
var identifyError = function (error) {
    // need to check this BEFORE NestedError since this *is* a NestedError
    if (error instanceof HttpApiRequestError_1.default) {
        // this can be a NoOAuthAccessTokenError from Webbase
        var serializedError = networkError_1.SerializedError.guard(error.content)
            ? error.content
            : undefined;
        var content = typeof error.content === 'string'
            ? error.content
            : json_stable_stringify_1.default(error.content);
        var subcode = void 0;
        if (serializedError) {
            subcode = serializedError.code
                ? serializedError.name + ":" + serializedError.code
                : serializedError.name;
        }
        return {
            class: error.name,
            code: String(error.statusCode),
            subcode: subcode,
            details: error.statusText + ": " + stringSubset(content, 512),
        };
    }
    if (util_1.isAxiosError(error)) {
        var errClass = 'Axios.Error';
        if (error.message === 'Network Error')
            errClass = 'Axios.NetworkError';
        var response = sentry_1.getResponse(error);
        var details = error.config.method + " " + error.config.url;
        if (response) {
            var responseStr = typeof response === 'string' ? response : json_stable_stringify_1.default(response);
            details = stringSubset(responseStr, 512);
        }
        var request = error.request;
        return {
            class: errClass,
            details: (request === null || request === void 0 ? void 0 : request.responseURL)
                ? request.responseURL + ": " + details
                : details,
            code: error.code,
        };
    }
    if (error instanceof nested_error_1.NestedError && error.innerErrors.length) {
        return exports.identifyError(error.innerErrors[0]);
    }
    if (networkError_1.NetworkError.guard(error)) {
        return {
            class: 'NetworkError',
            code: error.code,
            details: json_stable_stringify_1.default(error),
        };
    }
    return {
        class: error.name,
        details: json_stable_stringify_1.default(error),
    };
};
exports.identifyError = identifyError;
