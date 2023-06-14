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
exports.customApiFromParsedRequest = void 0;
var customApiFromParsedRequest = function (parsed) {
    var headers = parsed.headers
        ? Object.entries(parsed.headers).map(function (_a) {
            var k = _a[0], v = _a[1];
            return { name: k, value: v };
        })
        : undefined;
    var parameters = parsed.query
        ? Object.entries(parsed.query).map(function (_a) {
            var k = _a[0], v = _a[1];
            return { name: k, value: v ? v.toString() : '' };
        })
        : undefined;
    var body = parsed.body && parsed.body.type !== 'multipart/form-data'
        ? {
            contentType: parsed.body.type,
            content: parsed.body.data,
        }
        : undefined;
    // Only make changes that we found
    return __assign(__assign(__assign(__assign(__assign({ endpoint: parsed.url }, (parsed.method && { method: parsed.method })), (headers && { headers: headers })), (parameters && { parameters: parameters })), (body && { body: body })), (parsed.method && { method: parsed.method }));
};
exports.customApiFromParsedRequest = customApiFromParsedRequest;
