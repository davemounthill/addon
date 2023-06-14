"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebAppUrl = exports.mkWebAppUrl = void 0;
var addonVariant_1 = require("../../shared/addonVariant");
var OneTimePasswordContext_1 = require("../context/OneTimePasswordContext");
var SYNCWITH_BASE = process.env.NODE_ENV === 'production'
    ? "https://" + addonVariant_1.WEB_HOST
    : 'http://localhost:3000';
var mkWebAppUrl = function (relativeUrl, otp) {
    var url = "" + SYNCWITH_BASE + relativeUrl;
    return otp
        ? SYNCWITH_BASE + "/api/login?otp=" + otp + "&redirect=" + encodeURIComponent(url)
        : url;
};
exports.mkWebAppUrl = mkWebAppUrl;
var useWebAppUrl = function (relativeUrl) {
    var _a = OneTimePasswordContext_1.useOneTimePasswordContext(), otp = _a.otp, consumeToken = _a.consumeToken;
    return {
        url: exports.mkWebAppUrl(relativeUrl, otp),
        consumeToken: consumeToken,
    };
};
exports.useWebAppUrl = useWebAppUrl;
