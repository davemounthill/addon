"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRequest = exports.matchMethod = void 0;
var url_regex_1 = __importDefault(require("url-regex"));
var uuid_1 = require("uuid");
var common_utils_1 = require("@syncwith/common-utils");
// return 'get' or 'post' or undefined
var normalizeMethod = function (method) {
    if (method.toLowerCase() === 'get')
        return 'get';
    if (method.toLowerCase() === 'post')
        return 'post';
    return undefined;
};
var methodRegex1 = /^(get|post)\s+.*/i;
var methodRegex2 = /.*\s+(get|post)\s+.*/i;
var methodRegex3 = /.*\s+(get|post)$/i;
var matchMethod = function (s) {
    var match = s.match(methodRegex1) || s.match(methodRegex2) || s.match(methodRegex3);
    if (match) {
        return normalizeMethod(match[1]);
    }
    return undefined;
};
exports.matchMethod = matchMethod;
var reduceWhitespace = function (s) {
    return s.replace(/\s+/g, ' ').trim();
};
// prepend https:// if missing
var ensureUrlHasScheme = function (url) {
    var urlLowercase = url.toLowerCase();
    if (urlLowercase.startsWith('http')) {
        return url;
    }
    return "https://" + url;
};
// Split a url into its query parameters and the rest
var splitUrl = function (url) {
    try {
        var parsed = new URL(url);
        var query_1 = {};
        parsed.searchParams.forEach(function (value, key) {
            query_1[key] = value;
        });
        if (Object.keys(query_1).length > 0) {
            var parts = url.split('?');
            return {
                url: parts[0],
                query: query_1,
            };
        }
    }
    catch (_) {
        // do nothing
    }
    return { url: url };
};
var matchUrl = function (maybeUrl) {
    var parsed = common_utils_1.parseUrl(maybeUrl);
    if (parsed) {
        return maybeUrl;
    }
    var urlMatch = maybeUrl.match(url_regex_1.default({ strict: false }));
    return urlMatch ? urlMatch[0] : undefined;
};
var parseURL = function (rawRequest) {
    // similar to {foo} below, need to handle cell refs with spaces eg {{'Sheet name'!A2:A2}}
    var cellRefs = common_utils_1.matchCellReferences(rawRequest).map(function (_a) {
        var matched = _a.matched, range = _a.range;
        return {
            matched: matched,
            range: range,
            id: uuid_1.v4(),
        };
    });
    var request = rawRequest;
    // remove the cell refs
    cellRefs.forEach(function (_a) {
        var matched = _a.matched, id = _a.id;
        request = request.replace(matched, id);
    });
    // We want to use url-request to match URLs in all sorts of noisy data.
    // However, we also want {parameter} style params in the host to work,
    // eg {foo}.zendesk.com or https://{foo}.zendesk.com, and the curly braces
    // throw off url-request.
    //
    // Workaround: replace { and }s with very improbable strings of characters,
    // parse, then replace them back.
    var LEFT_CURLY = 'XHYXHYXHY';
    var RIGHT_CURLY = 'YHXYHXYHX';
    request = request.replace(/{/g, LEFT_CURLY).replace(/}/g, RIGHT_CURLY);
    var urlMatch = matchUrl(request);
    if (urlMatch) {
        var urlRaw_1 = ensureUrlHasScheme(urlMatch
            .replace(new RegExp(LEFT_CURLY, 'g'), '{')
            .replace(new RegExp(RIGHT_CURLY, 'g'), '}'));
        // replace cell refs
        cellRefs.forEach(function (_a) {
            var matched = _a.matched, id = _a.id;
            urlRaw_1 = urlRaw_1.replace(id, matched);
        });
        var _a = splitUrl(urlRaw_1), url = _a.url, query = _a.query;
        return {
            url: url,
            method: exports.matchMethod(request),
            query: query,
        };
    }
    return undefined;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var parseRequest = function (requestRaw) {
    if (!requestRaw)
        return undefined;
    var request = reduceWhitespace(requestRaw);
    return parseURL(request);
};
exports.parseRequest = parseRequest;
