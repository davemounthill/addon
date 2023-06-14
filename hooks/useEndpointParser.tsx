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
exports.useEndpointParser = void 0;
var react_1 = __importDefault(require("react"));
var sentry_1 = require("../utils/sentry");
var eventTracking_1 = require("../utils/eventTracking");
var nested_error_1 = require("../utils/nested-error");
var parseRequest_1 = require("../utils/parseRequest");
var parseRequestCustomApi_1 = require("../utils/parseRequestCustomApi");
var connection_1 = require("../api/connection");
var StoreLoadedContext_1 = require("../store/StoreLoadedContext");
var ui_1 = require("../components/ui");
var useEndpointParser = function () {
    var auth = react_1.default.useContext(StoreLoadedContext_1.StoreLoadedContext).auth;
    var displayModalSpinner = react_1.default.useContext(ui_1.ModalSpinnerContext).displayModalSpinner;
    var parseCURLCommandSafely = function (curlCommand) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1, nested;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connection_1.parseCURLCommand(auth, curlCommand)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_1 = _a.sent();
                    nested = new nested_error_1.NestedError("Failed to parse curl command: " + err_1.message, err_1);
                    sentry_1.captureException(nested, { curlCommand: curlCommand });
                    eventTracking_1.trackErrFromError('endpoint-paste', nested, { curlCommand: curlCommand });
                    return [2 /*return*/, undefined];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var parse = function (value) { return __awaiter(void 0, void 0, void 0, function () {
        var canceled_1, modal, parsed, err_2, nested;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(value && value.toLowerCase().indexOf('curl ') >= 0)) return [3 /*break*/, 4];
                    canceled_1 = false;
                    modal = displayModalSpinner('Parsing CURL command...', function () {
                        canceled_1 = true;
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, parseCURLCommandSafely(value)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    if (!canceled_1) {
                        modal.close();
                    }
                    return [7 /*endfinally*/];
                case 4:
                    parsed = parseRequest_1.parseRequest(value);
                    if (parsed) {
                        return [2 /*return*/, parseRequestCustomApi_1.customApiFromParsedRequest(parsed)];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _a.sent();
                    nested = new nested_error_1.NestedError("Failed to parse endpoint: " + err_2.message, err_2);
                    eventTracking_1.trackErrFromError('endpoint-parse', nested, { value: value });
                    sentry_1.captureException(nested);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, undefined];
            }
        });
    }); };
    return { parse: parse };
};
exports.useEndpointParser = useEndpointParser;
