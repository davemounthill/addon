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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRefreshConnectionMetadata = void 0;
var react_1 = require("react");
var ApiRequestError_1 = __importDefault(require("../api/ApiRequestError"));
var connection_1 = require("../api/connection");
var StoreLoadedContext_1 = require("../store/StoreLoadedContext");
var use_global_1 = __importDefault(require("../store/use-global"));
var eventTracking_1 = require("../utils/eventTracking");
var nested_error_1 = require("../utils/nested-error");
var sentry_1 = require("../utils/sentry");
var useRefreshConnectionMetadata = function () {
    var _a = react_1.useContext(StoreLoadedContext_1.StoreLoadedContext), connections = _a.connections, auth = _a.auth, spreadsheetProperties = _a.spreadsheetProperties;
    var _b = use_global_1.default(), actions = _b[1];
    react_1.useEffect(function () {
        var interval = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedAts, maxUpdatedAt, updatedConnections, toUpdate, err_1, nested;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log('Checking connections...');
                        updatedAts = connections.map(function (conn) { return conn.connection.metadata.updatedAt; });
                        updatedAts.sort();
                        maxUpdatedAt = updatedAts.length > 0 ? updatedAts[updatedAts.length - 1] : undefined;
                        console.log('Max updatedAt: ', maxUpdatedAt);
                        if (!maxUpdatedAt) return [3 /*break*/, 2];
                        return [4 /*yield*/, connection_1.getConnections(auth, spreadsheetProperties.id, maxUpdatedAt)];
                    case 1:
                        updatedConnections = _a.sent();
                        toUpdate = updatedConnections.filter(function (c1) {
                            return connections.find(function (c2) { return c2.connection.id === c1.id; });
                        });
                        console.log("Found " + updatedConnections.length + " updated connections, updating " + toUpdate.length + " of them");
                        // if there are any updated, then update only their metadata in our store
                        if (toUpdate.length > 0) {
                            toUpdate.forEach(function (conn) {
                                actions.updateConnectionMetadata(conn.id, conn.metadata);
                            });
                        }
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1 instanceof ApiRequestError_1.default) {
                            // do nothing
                        }
                        else {
                            nested = new nested_error_1.NestedError("Unexpected error occured while refreshing connection metadata: " + err_1.message, err_1);
                            sentry_1.captureException(nested);
                            eventTracking_1.trackErrFromError('connection-metadata-refresh', nested);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, 60000);
        return function () { return clearInterval(interval); };
    }, [actions, auth, connections, spreadsheetProperties.id]);
};
exports.useRefreshConnectionMetadata = useRefreshConnectionMetadata;
