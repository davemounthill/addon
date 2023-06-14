"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identify = exports.event = exports.pageview = void 0;
var react_ga_1 = __importDefault(require("react-ga"));
var requireEnv_1 = __importDefault(require("./requireEnv"));
var options = {
    gaOptions: {
        // I had to enable these cookie settings to get GA tracking to work on localhost, or perhaps at all, I'm not 100% sure
        cookieDomain: 'auto',
        cookieFlags: 'SameSite=None; Secure',
    },
    titleCase: false,
};
react_ga_1.default.initialize(requireEnv_1.default('GOOGLE_ANALYTICS_ID'), options);
var pageview = function (path, title) {
    react_ga_1.default.pageview(path, undefined, title);
};
exports.pageview = pageview;
var event = function (args) {
    react_ga_1.default.event(args);
};
exports.event = event;
var identify = function (identity) {
    react_ga_1.default.set({ userId: identity.userId });
};
exports.identify = identify;
