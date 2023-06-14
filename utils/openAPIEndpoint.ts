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
exports.getAllParameters = exports.parseSuggestionFromOpenAPI = exports.mkEndpoint = exports.canonicalizePath = exports.canonicalizeServerUrl = void 0;
var common_utils_1 = require("@syncwith/common-utils");
var HttpSchemes = new Set(['basic', 'bearer', 'hmac']);
var parseParameter = function (p) {
    var schema = common_utils_1.getNonRefOptional(p.schema);
    var rv = {
        name: p.name,
        description: p.description,
        required: p.required,
        default: p.default,
        title: p['x-title'],
        placeholder: p['x-placeholder'] || p.example,
        schema: schema,
        security: false,
        externalDocsURL: p['x-docs-url'],
        in: p.in,
        connectorPriority: p['x-connectorPriority'],
    };
    var defaultValue = schema === null || schema === void 0 ? void 0 : schema.default;
    if (p['x-useDefault'] === true && rv.default === undefined) {
        // we need a string value for Parameter.value, so be precise about what types we support and how we convert them
        if (typeof defaultValue === 'string') {
            rv.default = defaultValue;
        }
        else if (Array.isArray(defaultValue) &&
            defaultValue.length > 0 &&
            typeof defaultValue[0] === 'string') {
            rv.default = defaultValue.join(',');
        }
        else if (typeof defaultValue === 'number' ||
            typeof defaultValue === 'boolean') {
            rv.default = defaultValue.toString();
        }
    }
    return rv;
};
var canonicalizeServerUrl = function (serverUrl) {
    // remove any trailing slashes
    return serverUrl.replace(/\/+$/, '');
};
exports.canonicalizeServerUrl = canonicalizeServerUrl;
var canonicalizePath = function (path) {
    // remove any leading slashes
    return "/" + path.replace(/^\/+/, '');
};
exports.canonicalizePath = canonicalizePath;
/** Safely put together a server url and path, avoiding problems and fixing issues */
var mkEndpoint = function (serverUrlRaw, pathRaw) {
    var serverUrl = exports.canonicalizeServerUrl(serverUrlRaw);
    // remove any leading slashes
    var path = exports.canonicalizePath(pathRaw);
    return "" + serverUrl + path;
};
exports.mkEndpoint = mkEndpoint;
// Try to parse an API that we understand from an OpenAPI spec.
//
// We expect to receive an OpenAPI document with a single path, which
// supports a single operation, which has server/authentication data
// defined at the operation level.
var parseSuggestionFromOpenAPI = function (api) {
    var _a;
    var paths = Object.keys(api.paths);
    var op = common_utils_1.getApiOperation(api);
    if (!op)
        return null;
    var operation = op.operation, method = op.method;
    if (!operation.servers || operation.servers.length !== 1)
        return null;
    var server = operation.servers[0];
    var serverUrl = server.url;
    var endpoint = exports.mkEndpoint(serverUrl, paths[0]);
    var url = new URL(endpoint);
    // Bit of a hack - this can be ReferenceObject or ParameterObject,
    // we're filtering to only get ParameterObject. We expect that the server
    // has normalized the spec so that there are no ReferenceObjects.
    var operationParameters = (operation.parameters || []).flatMap(function (p) {
        return common_utils_1.isNonRef(p) ? [p] : [];
    });
    var pathParameters = operationParameters.filter(function (p) { return p.in === 'path'; });
    var rawQueryParameters = operationParameters.filter(function (p) { return p.in === 'query'; });
    var headerParameters = operationParameters.filter(function (p) { return p.in === 'header'; });
    var finalSecuritySchemes = parseSecuritySchemes(api);
    var headers = headerParameters.map(parseParameter);
    var queryParameters = rawQueryParameters.map(parseParameter);
    return {
        endpoint: endpoint,
        summary: operation.summary,
        externalDocsURL: (_a = operation.externalDocs) === null || _a === void 0 ? void 0 : _a.url,
        method: method,
        scheme: url.protocol.replace(':', ''),
        host: url.host,
        path: exports.canonicalizePath(paths[0]),
        pathParameters: pathParameters.map(parseParameter),
        queryParameters: queryParameters,
        headers: headers,
        openapi: api,
        operation: operation,
        securitySchemes: finalSecuritySchemes,
        connector: op.operation['x-connector'],
    };
};
exports.parseSuggestionFromOpenAPI = parseSuggestionFromOpenAPI;
var getAllParameters = function (suggestion) {
    return __spreadArray(__spreadArray(__spreadArray([], suggestion.headers), suggestion.queryParameters), suggestion.pathParameters);
};
exports.getAllParameters = getAllParameters;
function parseSecuritySchemes(api) {
    var _a;
    // We only use the securityRequirements from the root (expect none at the operation)
    var securityRequirements = api.security;
    if (!securityRequirements)
        return undefined;
    // Find all securitySchemes
    var allSecuritySchemes = Object.entries(((_a = api.components) === null || _a === void 0 ? void 0 : _a.securitySchemes) || []).map(function (_a) {
        var name = _a[0], scheme = _a[1];
        return { name: name, scheme: common_utils_1.getNonRef(scheme) };
    });
    // Find security schemes used on this operation, or on all endpoints
    var securitySchemesUsed = new Set(securityRequirements.flatMap(function (req) { return Object.keys(req); }));
    // Filter to the ones on this operation
    var securitySchemes = allSecuritySchemes
        .filter(function (scheme) { return securitySchemesUsed.has(scheme.name); })
        .map(function (_a) {
        var scheme = _a.scheme;
        return scheme;
    });
    // Fix them up if needed
    var fixedSecuritySchemes = securitySchemes
        .map(function (scheme) {
        if (scheme.type === 'http') {
            return __assign(__assign({}, scheme), { scheme: scheme.scheme.toLowerCase() });
        }
        return scheme;
    })
        .filter(function (scheme) {
        // For HTTP filter out anything except the ones we support
        return scheme.type === 'http' ? HttpSchemes.has(scheme.scheme) : true;
    });
    // If we removed the only schemes, then return undefined (instead of [])
    // eg we don't know if there is auth or not
    if (securitySchemes.length > 0 && fixedSecuritySchemes.length === 0) {
        return undefined;
    }
    // Check for an optional securityRequirement
    var optionalSecurityRequirement = securityRequirements.find(function (req) { return Object.keys(req).length === 0; });
    return optionalSecurityRequirement
        ? __spreadArray([{ type: 'none' }], fixedSecuritySchemes) : fixedSecuritySchemes;
}
