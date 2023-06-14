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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
var EditConnectionPage_1 = require("./editConnection/EditConnectionPage");
var EditTypedConnection_1 = __importDefault(require("./typedConnection/EditTypedConnection"));
var store_1 = require("../store");
var sentry_1 = require("../utils/sentry");
var ErrorBoundary_1 = __importDefault(require("./error/ErrorBoundary"));
var ErrorOccurred_1 = __importDefault(require("./error/ErrorOccurred"));
var eventTracking_1 = require("../utils/eventTracking");
var StoreLoadedContext_1 = require("../store/StoreLoadedContext");
var Layout_1 = require("./Layout");
var Home_1 = require("./home/Home");
var Host_1 = require("./host/Host");
var HostInterstitial_1 = require("./host-interstitial/HostInterstitial");
var SidebarModals_1 = require("./SidebarModals");
var GlobalSocket_1 = require("../store/GlobalSocket");
var Search_1 = require("./search/Search");
var ConfigureTemplate_1 = require("./templates/ConfigureTemplate");
var Browse_1 = require("./browse/Browse");
var BrowseCategory_1 = require("./browseCategory/BrowseCategory");
var Onboarding_1 = require("./onboarding/Onboarding");
var Personal_1 = require("./onboarding/Personal");
var SmuggleAccessTokens_1 = require("./SmuggleAccessTokens");
var ConnectorSidebar_1 = require("./connector/ConnectorSidebar");
var ConnectorDialog_1 = require("./connector/ConnectorDialog");
var OneTimePasswordContext_1 = require("../context/OneTimePasswordContext");
var FreeTrialChoosePlan_1 = require("./free-trial/FreeTrialChoosePlan");
var RequireFreeTrial_1 = require("./free-trial/RequireFreeTrial");
var Business_1 = require("./onboarding/Business");
var useNavigateToConn_1 = require("../hooks/useNavigateToConn");
var ConnectionNotFound_1 = require("./home/ConnectionNotFound");
var BrowseMore_1 = require("./browse/BrowseMore");
var MarketingChat_1 = require("./onboarding/MarketingChat");
var OnboardingBusinessType_1 = require("./onboarding/OnboardingBusinessType");
var Main = function () {
    var store = store_1.useGlobal()[0];
    var _a = store_1.useLocation(), getLocation = _a.getLocation, setLocation = _a.setLocation, setLocationAndHistory = _a.setLocationAndHistory;
    var location = getLocation().current;
    var renderLoading = function () {
        // Give some insight into the progress without really saying what we're doing
        var caption = store.authState.status === 'loading' ? 'Initializing' : 'Configuring';
        return (jsx_runtime_1.jsx(Layout_1.Layout, { children: jsx_runtime_1.jsx(Layout_1.LayoutPart.Body, { children: jsx_runtime_1.jsxs("div", __assign({ className: "twbs", style: { textAlign: 'center', padding: '10px' } }, { children: [jsx_runtime_1.jsxs("p", __assign({ style: { fontSize: '12px', margin: '1em' } }, { children: [caption, "..."] }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Spinner, { animation: "border", size: "sm" }, void 0)] }), void 0) }, void 0) }, void 0));
    };
    var renderDialogLoading = function () {
        return (jsx_runtime_1.jsxs("div", __assign({ className: "twbs", style: { textAlign: 'center', padding: '10px' } }, { children: [jsx_runtime_1.jsx("p", __assign({ style: { fontSize: '12px', margin: '1em' } }, { children: "Loading..." }), void 0), jsx_runtime_1.jsx(react_bootstrap_1.Spinner, { animation: "border", size: "sm" }, void 0)] }), void 0));
    };
    var onError = function (error, info) {
        var userId = store.authState.status === 'loaded'
            ? store.authState.value.id
            : undefined;
        eventTracking_1.trackErrFromError('unhandled', error);
        sentry_1.captureException(error, { userId: userId });
        setLocation({ path: '/error', error: error, info: info });
    };
    var renderLocation = function () {
        if (location.path === '/')
            return jsx_runtime_1.jsx(Home_1.Home, {}, void 0);
        if (location.path === '/onboarding')
            return jsx_runtime_1.jsx(Onboarding_1.Onboarding, {}, void 0);
        if (location.path === '/connector/:connector')
            return (jsx_runtime_1.jsx(ConnectorSidebar_1.ConnectorSidebar, { suggestion: location.suggestion, conn: location.conn }, void 0));
        if (location.path === '/connector/:connector/preview')
            return (jsx_runtime_1.jsx(ConnectorDialog_1.ConnectorDialog, { suggestion: location.suggestion, conn: location.conn, socketRoomId: location.socketRoomId }, void 0));
        if (location.path === '/free-trial/choose-plan')
            return jsx_runtime_1.jsx(FreeTrialChoosePlan_1.FreeTrialChoosePlan, {}, void 0);
        if (location.path === '/onboarding/marketing')
            return jsx_runtime_1.jsx(MarketingChat_1.MarketingChat, {}, void 0);
        if (location.path === '/onboarding/business')
            return jsx_runtime_1.jsx(Business_1.Business, {}, void 0);
        if (location.path === '/onboarding/business-type')
            return jsx_runtime_1.jsx(OnboardingBusinessType_1.OnboardingBusinessType, {}, void 0);
        if (location.path === '/onboarding/personal')
            return jsx_runtime_1.jsx(Personal_1.Personal, {}, void 0);
        if (location.path === '/browse')
            return jsx_runtime_1.jsx(Browse_1.Browse, {}, void 0);
        if (location.path === '/browse-more')
            return jsx_runtime_1.jsx(BrowseMore_1.BrowseMore, {}, void 0);
        if (location.path === '/browse/:category')
            return jsx_runtime_1.jsx(BrowseCategory_1.BrowseCategory, { categorySlug: location.categorySlug }, void 0);
        if (location.path === '/search')
            return jsx_runtime_1.jsx(Search_1.Search, { query: location.query }, void 0);
        if (location.path === '/connection/custom-api')
            return (jsx_runtime_1.jsx(EditConnectionPage_1.EditConnectionPage, { suggestion: location.suggestion, conn: location.conn }, void 0));
        if (location.path === '/connection/custom-api/preview')
            return (jsx_runtime_1.jsx(EditConnectionPage_1.EditConnectionPage, { conn: location.conn, suggestion: location.suggestion, socketRoomId: location.socketRoomId }, void 0));
        if (location.path === '/connection/:type')
            return jsx_runtime_1.jsx(EditTypedConnection_1.default, { api: location.api, blob: location.blob }, void 0);
        if (location.path === '/connection/custom-api/:id')
            return (jsx_runtime_1.jsx(EditConnectionPage_1.EditConnectionPage, { conn: location.conn, suggestion: location.suggestion }, void 0));
        if (location.path === '/connection/custom-api/:id/preview')
            return (jsx_runtime_1.jsx(EditConnectionPage_1.EditConnectionPage, { conn: location.conn, suggestion: location.suggestion, socketRoomId: location.socketRoomId }, void 0));
        if (location.path === '/connection/:type/:id')
            return jsx_runtime_1.jsx(EditTypedConnection_1.default, { api: location.api, conn: location.conn }, void 0);
        if (location.path === '/host/:host')
            return jsx_runtime_1.jsx(Host_1.Host, { suggestion: location.suggestion, filter: location.filter }, void 0);
        if (location.path === '/host-interstitial/:host')
            return (jsx_runtime_1.jsx(HostInterstitial_1.HostInterstitial, { name: location.name, icon: location.icon, suggestions: location.suggestions, templates: location.templates }, void 0));
        if (location.path === '/template/:template')
            return jsx_runtime_1.jsx(ConfigureTemplate_1.ConfigureTemplate, { template: location.template }, void 0);
        // If we got here, we could not find the connection by id
        if (location.path === '/connection/edit/:id')
            return (jsx_runtime_1.jsx(ConnectionNotFound_1.ConnectionNotFound, { connectionId: location.connectionId }, void 0));
        // should never happen
        sentry_1.captureException(new Error("Unknown path: " + location.path));
        return jsx_runtime_1.jsx("b", { children: "unknown path" }, void 0);
    };
    if (location.path === '/error') {
        return (jsx_runtime_1.jsx("div", __assign({ className: "twbs", style: { height: '100%' } }, { children: jsx_runtime_1.jsx(OneTimePasswordContext_1.OneTimePasswordContextProvider, { children: jsx_runtime_1.jsx(ErrorOccurred_1.default, { error: location.error, info: location.info }, void 0) }, void 0) }), void 0));
    }
    // Bit of a hack: if we have a dialog id, and location is /, then we're about to show a dialog, so show the loading screen
    if (store.dialogId && location.path === '/')
        return renderDialogLoading();
    if (store.authState.status !== 'loaded' ||
        store.billingState.status !== 'loaded' ||
        store.connectionState.status !== 'loaded' ||
        store.otherConnectionCount.status !== 'loaded' ||
        !store.spreadsheetProperties ||
        store.state === 'loading') {
        return renderLoading();
    }
    if (location.path === '/connection/edit/:id') {
        var conn = store.connectionState.value.find(function (c) { return c.connection.id === location.connectionId; });
        if (conn) {
            useNavigateToConn_1.openExistingConnection(store.authState.value, store.oauthApps, conn.connection).then(function (loc) { return setLocationAndHistory(loc, [{ path: '/' }]); });
            return renderLoading();
        }
    }
    var useBootstrap = location.path.startsWith('/onboarding') === false;
    return (jsx_runtime_1.jsx("div", __assign({ className: useBootstrap ? 'twbs' : undefined, style: { height: '100%' } }, { children: jsx_runtime_1.jsx(OneTimePasswordContext_1.OneTimePasswordContextProvider, { children: jsx_runtime_1.jsx(ErrorBoundary_1.default, __assign({ onError: onError }, { children: jsx_runtime_1.jsxs(StoreLoadedContext_1.StoreLoadedProvider, __assign({ oauthApps: store.oauthApps, experiments: store.experiments, spreadsheetProperties: store.spreadsheetProperties, auth: store.authState.value, billing: store.billingState.value, connections: store.connectionState.value, otherConnectionCount: store.otherConnectionCount.value, groupedHosts: store.groupedHosts }, { children: [jsx_runtime_1.jsx(RequireFreeTrial_1.RequireFreeTrial, { children: jsx_runtime_1.jsx(GlobalSocket_1.GlobalSocket, { children: jsx_runtime_1.jsx(SidebarModals_1.SidebarModals, { children: renderLocation() }, void 0) }, void 0) }, void 0), jsx_runtime_1.jsx(SmuggleAccessTokens_1.SmuggleAccessTokens, {}, void 0)] }), void 0) }), void 0) }, void 0) }), void 0));
};
exports.Main = Main;
