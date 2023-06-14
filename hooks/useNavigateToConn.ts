"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNavigateToConn = exports.openExistingConnection = void 0;
var react_1 = require("react");
var typed_apis_1 = require("@syncwith/typed-apis");
var common_utils_1 = require("@syncwith/common-utils");
var connectionSuggestion_1 = require("../api/connectionSuggestion");
var openAPIEndpoint_1 = require("../utils/openAPIEndpoint");
var nested_error_1 = require("../utils/nested-error");
var eventTracking_1 = require("../utils/eventTracking");
var ui_1 = require("../components/ui");
var useEndpointParser_1 = require("./useEndpointParser");
var typedConnections_1 = require("../utils/typedConnections");
var sentry_1 = require("../utils/sentry");
var StoreLoadedContext_1 = require("../store/StoreLoadedContext");
var useNavigateToConnector_1 = require("./useNavigateToConnector");
var runtypesRegistry_1 = require("../utils/runtypesRegistry");
var findEndpointSuggestion = function (auth, url, method) { return __awaiter(void 0, void 0, void 0, function () {
    var spec, openApiEndpointSuggestion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connectionSuggestion_1.getEndpointSpec(auth, url, method, {
                    mergeUserSpec: true,
                })];
            case 1:
                spec = _a.sent();
                if (!spec || !spec.endpoint)
                    return [2 /*return*/, undefined];
                openApiEndpointSuggestion = openAPIEndpoint_1.parseSuggestionFromOpenAPI(spec.endpoint.openapi);
                if (!openApiEndpointSuggestion)
                    return [2 /*return*/, undefined];
                return [2 /*return*/, {
                        endpoint: openApiEndpointSuggestion,
                        tier: spec.tier,
                        subtier: spec.subtier,
                    }];
        }
    });
}); };
var maybeTypedLocation = function (oauthApps, openapi, conn) {
    var apiOperation = common_utils_1.getApiOperation(openapi);
    if (!apiOperation)
        return undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof apiOperation.operation['x-typed-api'] !== 'string')
        return undefined;
    var endpoint = "" + (apiOperation.operation.servers || [{ url: '' }])[0].url + apiOperation.path;
    var oauthApp = oauthApps.find(function (app) { return app.regex.test(endpoint); });
    var typedApi = typed_apis_1.createTypedAPI(openapi, oauthApp, {}).typedApi;
    if (!conn) {
        return {
            path: '/connection/:type',
            api: typedApi,
        };
    }
    // If the blob doesn't conform to the typed API, we likely changed the API
    // on them. Degrade to a vanilla API editing experience.
    if (typedApi.runtype.validate(conn.data.blob).success) {
        return {
            path: '/connection/:type/:id',
            api: typedApi,
            conn: conn,
        };
    }
    // track an error
    var connId = 'id' in conn ? conn.id : 'new';
    var err = new Error("Typed connection " + connId + " does not conform");
    var props = {
        label: typedApi.label,
        type: typedApi.type,
        connection: connId,
    };
    sentry_1.captureException(err, props);
    eventTracking_1.trackErrFromError('connection-edit', err, props);
    return undefined;
};
/** Open an existing connection */
var openExistingConnection = function (auth, oauthApps, conn) { return __awaiter(void 0, void 0, void 0, function () {
    var maybeAPIWithBlob, connIsNew, connId, err, props, methodAndEndpoint, typedSuggestion, location_1, suggestion, hostEndpointSuggestion;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                // first see if its a generic connector
                if (((_a = conn.data.blob) === null || _a === void 0 ? void 0 : _a.generic) === true) {
                    return [2 /*return*/, useNavigateToConnector_1.openExistingGenericConnector(auth, conn)];
                }
                maybeAPIWithBlob = typedConnections_1.getConnectionType(conn);
                if (maybeAPIWithBlob) {
                    connIsNew = !('id' in conn);
                    // Don't check the validation if its a new connection; it may be a template that is partially filled
                    if (connIsNew || typedConnections_1.isValidTypedCustomApi(conn.data, maybeAPIWithBlob)) {
                        return [2 /*return*/, {
                                path: "/connection/:type/:id",
                                api: maybeAPIWithBlob.typedAPI,
                                conn: conn,
                            }];
                    }
                    connId = 'id' in conn ? conn.id : 'new';
                    err = new Error("Typed connection " + connId + " does not conform");
                    props = {
                        label: maybeAPIWithBlob.typedAPI.label,
                        type: maybeAPIWithBlob.typedAPI.type,
                        connection: connId,
                    };
                    sentry_1.captureException(err, props);
                    eventTracking_1.trackErrFromError('connection-edit', err, props);
                }
                methodAndEndpoint = /^(get|head|post|patch|put|delete) (https?:\/\/.+)$/.exec((((_b = conn.data.blob) === null || _b === void 0 ? void 0 : _b.type) || ''));
                if (!methodAndEndpoint) return [3 /*break*/, 2];
                return [4 /*yield*/, findEndpointSuggestion(auth, methodAndEndpoint[2], methodAndEndpoint[1])];
            case 1:
                typedSuggestion = _d.sent();
                if (typedSuggestion) {
                    location_1 = maybeTypedLocation(oauthApps, typedSuggestion.endpoint.openapi, conn);
                    if (location_1)
                        return [2 /*return*/, location_1];
                }
                _d.label = 2;
            case 2: return [4 /*yield*/, findEndpointSuggestion(auth, conn.data.endpoint, conn.data.method)];
            case 3:
                suggestion = ((_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.endpoint) || undefined;
                hostEndpointSuggestion = suggestion
                    ? {
                        host: {
                            host: '',
                            endpointCount: 0,
                            prefix: '',
                            tier: '',
                            subtier: '',
                        },
                        endpoint: suggestion,
                    }
                    : undefined;
                return [2 /*return*/, {
                        path: "/connection/custom-api/:id",
                        conn: conn,
                        suggestion: hostEndpointSuggestion,
                    }];
        }
    });
}); };
exports.openExistingConnection = openExistingConnection;
/** Centralizes the code to get the necessary data needed and then navigate to start a new connection */
var useNavigateToConn = function (auth) {
    var endpointParser = useEndpointParser_1.useEndpointParser();
    var displayModalSpinner = react_1.useContext(ui_1.ModalSpinnerContext).displayModalSpinner;
    var oauthApps = react_1.useContext(StoreLoadedContext_1.StoreLoadedContext).oauthApps;
    var navigateToConnector = useNavigateToConnector_1.useNavigateToConnector(auth);
    var getSuggestionFromUrl = function (url, method) { return __awaiter(void 0, void 0, void 0, function () {
        var spec, suggestion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findEndpointSuggestion(auth, url, method)];
                case 1:
                    spec = _a.sent();
                    suggestion = spec
                        ? {
                            endpoint: spec.endpoint,
                            host: {
                                host: spec.endpoint.host,
                                prefix: '/',
                                endpointCount: 0,
                                tier: spec.tier,
                                subtier: spec.subtier,
                            },
                        }
                        : undefined;
                    return [2 /*return*/, suggestion];
            }
        });
    }); };
    var maybeSearchHook = function (value) {
        for (var _i = 0, _a = runtypesRegistry_1.RuntypesRegistry.typedAPIs; _i < _a.length; _i++) {
            var typedApi = _a[_i];
            var parsed = void 0;
            try {
                parsed = typedApi.searchHook ? typedApi.searchHook(value) : undefined;
            }
            catch (err) {
                // they shouldn't be throwing errors!
                var nested = new nested_error_1.NestedError("Unexpected error calling searchHook for " + typedApi.label + ": " + err.message, err);
                eventTracking_1.trackErrFromError("search-hook", err);
                sentry_1.captureException(nested, {
                    value: value,
                    typedApi: { type: typedApi.type, label: typedApi.label },
                });
            }
            if (parsed) {
                var maybeTypedAPIWithBlob = typedConnections_1.getCustomApiType(parsed);
                if (maybeTypedAPIWithBlob) {
                    var typedAPI = maybeTypedAPIWithBlob.typedAPI, blob = maybeTypedAPIWithBlob.blob;
                    return {
                        path: "/connection/:type",
                        api: typedAPI,
                        blob: blob,
                    };
                }
            }
        }
        return undefined;
    };
    /** For SyncWith staff, lets us paste in an endpoint spec to test it out */
    var maybePastedSpec = function (pasted) {
        try {
            var parsed = JSON.parse(pasted);
            var suggestion = openAPIEndpoint_1.parseSuggestionFromOpenAPI(parsed);
            return suggestion
                ? navigateToConnector.newFromSuggestionPasted(suggestion)
                : undefined;
        }
        catch (err) {
            console.error("Unexpected error parsing spec: " + err.message);
            return undefined;
        }
    };
    /** Use this if the user pasted a value, possibly a URL, or a CURL command etc */
    var newFromPastedEndpoint = function (pasted) { return __awaiter(void 0, void 0, void 0, function () {
        var maybeSearchHookLoc, maybePastedSpecLoc, customApi, modal, conn, suggestion, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    maybeSearchHookLoc = maybeSearchHook(pasted);
                    if (maybeSearchHookLoc) {
                        return [2 /*return*/, maybeSearchHookLoc];
                    }
                    maybePastedSpecLoc = maybePastedSpec(pasted);
                    if (maybePastedSpecLoc) {
                        return [2 /*return*/, maybePastedSpecLoc];
                    }
                    return [4 /*yield*/, endpointParser.parse(pasted)];
                case 1:
                    customApi = _b.sent();
                    if (!customApi) return [3 /*break*/, 7];
                    modal = displayModalSpinner('Loading...');
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, , 6, 7]);
                    conn = { data: customApi };
                    if (!customApi.endpoint) return [3 /*break*/, 4];
                    return [4 /*yield*/, getSuggestionFromUrl(customApi.endpoint, customApi.method || 'get')];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = undefined;
                    _b.label = 5;
                case 5:
                    suggestion = _a;
                    if (suggestion) {
                        eventTracking_1.trackEvent(eventTracking_1.Events.apiSuggestionPaste, {
                            endpoint: customApi.endpoint,
                            tier: suggestion.host.tier,
                            subtier: suggestion.host.subtier,
                        });
                    }
                    return [2 /*return*/, {
                            path: "/connection/custom-api",
                            conn: suggestion ? undefined : conn,
                            suggestion: suggestion,
                        }];
                case 6:
                    modal.close();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/, undefined];
            }
        });
    }); };
    /** If you only have the url (and method) and want to navigate to EditConnection use this */
    var newFromUrlMethod = function (url, method) { return __awaiter(void 0, void 0, void 0, function () {
        var modal, suggestion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modal = displayModalSpinner('Loading...');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, getSuggestionFromUrl(url, method)];
                case 2:
                    suggestion = _a.sent();
                    return [2 /*return*/, {
                            path: "/connection/custom-api",
                            suggestion: suggestion,
                        }];
                case 3:
                    modal.close();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/, undefined];
            }
        });
    }); };
    /** If you already have a suggestion for the endpoint, and want to navigate to EditConnection, use this */
    var newFromSuggestion = function (host, suggestion) { return __awaiter(void 0, void 0, void 0, function () {
        var modal, endpointSpec, location_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modal = displayModalSpinner('Loading...');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, findEndpointSuggestion(auth, suggestion.endpoint, suggestion.method)];
                case 2:
                    endpointSpec = _a.sent();
                    if (!endpointSpec)
                        throw new Error("Expected endpointSpec");
                    location_2 = maybeTypedLocation(oauthApps, endpointSpec.endpoint.openapi);
                    if (location_2)
                        return [2 /*return*/, location_2];
                    return [2 /*return*/, {
                            path: "/connection/custom-api",
                            suggestion: { endpoint: endpointSpec.endpoint, host: host },
                        }];
                case 3:
                    modal.close();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var openExisting = function (conn) { return __awaiter(void 0, void 0, void 0, function () {
        var modal;
        return __generator(this, function (_a) {
            modal = displayModalSpinner('Loading...');
            try {
                return [2 /*return*/, exports.openExistingConnection(auth, oauthApps, conn)];
            }
            finally {
                modal.close();
            }
            return [2 /*return*/];
        });
    }); };
    return {
        newFromSuggestion: newFromSuggestion,
        newFromUrlMethod: newFromUrlMethod,
        newFromPastedEndpoint: newFromPastedEndpoint,
        openExisting: openExisting,
    };
};
exports.useNavigateToConn = useNavigateToConn;
