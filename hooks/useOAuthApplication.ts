"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOAuthApplication = void 0;
var react_1 = require("react");
var oauth_1 = require("../components/editConnection/lib/oauth");
/** Responsible for maintaining the current OAuth app based on the endpoint */
var useOAuthApplication = function (props) {
    var oauthApps = props.oauthApps, endpoint = props.endpoint;
    // Since we can do this synchronously, its simple, but lets use `useMemo` to avoid recalculating things unnecessarily
    var oauthApp = react_1.useMemo(function () {
        var rv = oauth_1.getOAuthAppForEndpoint(oauthApps, endpoint);
        return rv;
    }, [endpoint, oauthApps]);
    return { oauthApp: oauthApp };
};
exports.useOAuthApplication = useOAuthApplication;
