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
exports.validateOAuth = void 0;
var validateOAuth = function (connState, newState) {
    if (!connState.oauthConnectionId ||
        connState.oauthConnectionId.length === 0) {
        var authentication = {
            connection: 'Please connect an account',
        };
        return __assign(__assign({}, newState), { authentication: authentication, valid: false });
    }
    return newState;
};
exports.validateOAuth = validateOAuth;
