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
exports.useNavigateToConnector = exports.openExistingGenericConnector = void 0;
var react_1 = require("react");
var connectionSuggestion_1 = require("../api/connectionSuggestion");
var openAPIEndpoint_1 = require("../utils/openAPIEndpoint");
var ui_1 = require("../components/ui");
var findEndpointSuggestion = function (auth, url, method) { return __awaiter(void 0, void 0, void 0, function () {
    var spec, openApiEndpointSuggestion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connectionSuggestion_1.getEndpointSpec(auth, url, method, {
                    mergeUserSpec: false, // for connectors (to make our lives simpler, for now) we don't want user spec data merged in on the fly
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
var openExistingGenericConnector = function (auth, conn) { return __awaiter(void 0, void 0, void 0, function () {
    var connId, suggestion, host, hostEndpointSuggestion, loc;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                connId = 'id' in conn ? conn.id : 'new';
                // make sure its a generic connector
                if (((_a = conn.data.blob) === null || _a === void 0 ? void 0 : _a.generic) !== true) {
                    throw new Error("Connection is not a generic connector: " + connId);
                }
                return [4 /*yield*/, findEndpointSuggestion(auth, conn.data.endpoint, conn.data.method)];
            case 1:
                suggestion = ((_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.endpoint) || undefined;
                if (!suggestion) {
                    throw new Error("No suggestion found for connection " + connId + " with endpoint " + conn.data.endpoint);
                }
                return [4 /*yield*/, connectionSuggestion_1.getHostSuggestion(auth, suggestion.host)];
            case 2:
                host = _c.sent();
                hostEndpointSuggestion = {
                    host: host,
                    endpoint: suggestion,
                };
                loc = {
                    path: '/connector/:connector',
                    conn: conn,
                    suggestion: hostEndpointSuggestion,
                };
                return [2 /*return*/, loc];
        }
    });
}); };
exports.openExistingGenericConnector = openExistingGenericConnector;
/** Centralizes the code to get the necessary data needed and then navigate to start a new connection */
var useNavigateToConnector = function (auth) {
    var displayModalSpinner = react_1.useContext(ui_1.ModalSpinnerContext).displayModalSpinner;
    /** If you already have a suggestion for the endpoint, and want to navigate to EditConnection, use this */
    var newFromSuggestion = function (host, suggestion) { return __awaiter(void 0, void 0, void 0, function () {
        var modal, endpointSpec;
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
                    return [2 /*return*/, {
                            path: "/connector/:connector",
                            suggestion: { endpoint: endpointSpec.endpoint, host: host },
                        }];
                case 3:
                    modal.close();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /** DEV only, not for real users */
    var newFromSuggestionPasted = function (suggestion) { return __awaiter(void 0, void 0, void 0, function () {
        var modal, host;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modal = displayModalSpinner('Loading...');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, connectionSuggestion_1.getHostSuggestion(auth, suggestion.host)];
                case 2:
                    host = _a.sent();
                    return [2 /*return*/, {
                            path: "/connector/:connector",
                            suggestion: { endpoint: suggestion, host: host },
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
                return [2 /*return*/, exports.openExistingGenericConnector(auth, conn)];
            }
            finally {
                modal.close();
            }
            return [2 /*return*/];
        });
    }); };
    return {
        newFromSuggestion: newFromSuggestion,
        openExisting: openExisting,
        newFromSuggestionPasted: newFromSuggestionPasted,
    };
};
exports.useNavigateToConnector = useNavigateToConnector;
