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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.trackConnectionAttempt = exports.trackPageview = exports.trackEventAtMostOnce = exports.trackEvent = exports.trackErrFromError = exports.trackErr = exports.identify = exports.Events = void 0;
// It's fairly gross that these are in typed-apis vs a shared analytics package,
// but it's good enough for now.
var amplitude_js_1 = __importDefault(require("amplitude-js"));
var typed_apis_1 = require("@syncwith/typed-apis");
var json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
var uuid_1 = require("uuid");
var sentry_1 = require("./sentry");
var requireEnv_1 = __importDefault(require("./requireEnv"));
var connectionSuggestion_1 = require("../api/connectionSuggestion");
var ga = __importStar(require("./ga"));
var addonVariant_1 = require("../../shared/addonVariant");
var eventTrackingUtil_1 = require("./eventTrackingUtil");
var events_1 = require("./events");
var events_2 = require("./events");
Object.defineProperty(exports, "Events", { enumerable: true, get: function () { return events_2.Events; } });
var API_KEY = requireEnv_1.default('AMPLITUDE_API_KEY');
amplitude_js_1.default.getInstance().init(API_KEY, undefined, {
    apiEndpoint: 'amp.syncwith.com',
});
typed_apis_1.initializeAmplitude(amplitude_js_1.default.getInstance());
// This function is wrapped so that a caller has to import this module,
// which ensures amplitude is initialized.
function identify(identity) {
    typed_apis_1.identifyAmplitudeUser(identity);
}
exports.identify = identify;
var trackErr = function (error, errorProperties) {
    if (errorProperties === void 0) { errorProperties = {}; }
    var action = error.action, message = error.message;
    ga.event({ category: 'err', action: action, label: message });
    var id = error.id || uuid_1.v4();
    var properties = __assign(__assign({}, errorProperties), { app: addonVariant_1.getApp(), err: __assign(__assign({}, error), { id: id }) });
    amplitude_js_1.default.getInstance().logEvent('err', properties);
    typed_apis_1.trackAnalyticsEventToWebBase({
        name: 'err',
        properties: properties,
    });
};
exports.trackErr = trackErr;
var trackErrFromError = function (action, error, errorProperties, source, id) {
    if (errorProperties === void 0) { errorProperties = {}; }
    if (source === void 0) { source = undefined; }
    if (id === void 0) { id = undefined; }
    var identified = eventTrackingUtil_1.identifyError(error);
    var eventError = __assign(__assign({ source: source || 'sheets-addon' }, identified), { action: action, message: error.message, id: id });
    exports.trackErr(eventError, errorProperties);
};
exports.trackErrFromError = trackErrFromError;
function trackEvent(event, origProperties, options) {
    var properties = __assign(__assign({}, origProperties), { app: addonVariant_1.getApp() });
    var label = Object.keys(properties).length > 0
        ? json_stable_stringify_1.default(properties)
        : undefined;
    ga.event({
        category: event.category.toString(),
        action: event.name,
        label: label,
    });
    typed_apis_1.trackEvent(event, properties, options);
}
exports.trackEvent = trackEvent;
var tracked = {};
/**
 * Track this event at most once, eg on the first occurrence. This can be useful for an event that would be very frequent, but you want to know
 * if it ever happens.
 */
function trackEventAtMostOnce(event, properties) {
    if (properties === void 0) { properties = {}; }
    if (!(event.name in tracked)) {
        tracked[event.name] = true;
        trackEvent(event, properties);
    }
}
exports.trackEventAtMostOnce = trackEventAtMostOnce;
function trackPageview(path, title) {
    if (title === void 0) { title = undefined; }
    var effTitle = title || document.title;
    ga.pageview(path, effTitle);
    amplitude_js_1.default
        .getInstance()
        .logEvent('pageview', { path: path, title: effTitle, app: addonVariant_1.getApp() });
    typed_apis_1.trackAnalyticsEventToWebBase({
        name: 'pageview',
        properties: { path: path, title: effTitle, app: addonVariant_1.getApp() },
    });
}
exports.trackPageview = trackPageview;
/**
 * Record a connection attempt.
 *
 * First calls a SyncWith API to classify the connection's tier/subtier
 *
 * Uses logEventWithTimestamp so that we can do this in the background but
 * still have the right ordering of events in Amplitude.
 */
function trackConnectionAttempt(auth, url, type, properties) {
    return __awaiter(this, void 0, void 0, function () {
        var now, _a, tier, subtier, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    now = new Date();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, connectionSuggestion_1.getHostTier(auth, url, type)];
                case 2:
                    _a = _b.sent(), tier = _a.tier, subtier = _a.subtier;
                    trackEvent(events_1.Events.connectionAttempt, __assign(__assign({}, properties), { tier: tier, subtier: subtier }), {
                        timestamp: now,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    sentry_1.captureException(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.trackConnectionAttempt = trackConnectionAttempt;
