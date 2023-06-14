"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOAuthConnections = void 0;
var react_1 = require("react");
var typed_apis_1 = require("@syncwith/typed-apis");
var auth_1 = require("../api/auth");
var useOAuthConnectionCallback_1 = require("./useOAuthConnectionCallback");
/** Responsible for managing the set of connections for an OAuth app */
var useOAuthConnections = function (props) {
    var auth = props.auth, oauthApp = props.oauthApp;
    // When our oauthapplication changes, start listening for messages about it
    var _a = react_1.useState(function () { return Date.now(); }), lastRefreshTime = _a[0], setLastRefreshTime = _a[1];
    useOAuthConnectionCallback_1.useOAuthConnectionCallback(function () {
        setLastRefreshTime(Date.now());
    });
    // When our oauthapplication changes, see if we need to clear things out
    return typed_apis_1.useApi(function () {
        if (!oauthApp)
            return typed_apis_1.notAbleToLoad();
        return auth_1.getOAuthConnections(auth, oauthApp.id);
    }, [auth, oauthApp, lastRefreshTime]);
};
exports.useOAuthConnections = useOAuthConnections;
