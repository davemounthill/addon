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
exports.useNavigateToAPI = void 0;
var eventTracking_1 = require("../utils/eventTracking");
var store_1 = require("../store");
// Helpers to log events + update locations for UI targets that can
// be reached via multiple methods
var useNavigateToAPI = function () {
    var setLocation = store_1.useLocation().setLocation;
    var navigateToHostInterstitial = function (_a) {
        var query = _a.query, icon = _a.icon, category = _a.category, name = _a.name, tier = _a.tier, subtier = _a.subtier, suggestions = _a.suggestions, templates = _a.templates;
        // TODO: should we have a special event for this? For now maybe it's
        //       convenient to just have 1 event for analytics, and we can
        //       use the pageview event to differentiate
        eventTracking_1.trackEvent(eventTracking_1.Events.apiSuggestionSelect, {
            query: query,
            category: category,
            name: name,
            tier: tier,
            subtier: subtier,
            interstitial: true,
        });
        setLocation({
            path: '/host-interstitial/:host',
            name: name,
            icon: icon,
            suggestions: suggestions,
            templates: templates,
        });
    };
    var navigateToCustomAPI = function (_a) {
        var source = _a.source, category = _a.category, query = _a.query;
        eventTracking_1.trackEvent(eventTracking_1.Events.apiSuggestionSelect, {
            source: source,
            category: category || 'custom',
            custom: true,
            query: query,
        });
        setLocation({
            path: '/connection/custom-api',
        });
    };
    var navigateToHost = function (_a) {
        var suggestion = _a.suggestion, category = _a.category, query = _a.query;
        eventTracking_1.trackEvent(eventTracking_1.Events.apiSuggestionSelect, {
            query: query,
            category: category,
            host: suggestion.host,
            tier: suggestion.tier,
            subtier: suggestion.subtier,
        }, {
            userProperties: [
                {
                    action: 'setOnce',
                    name: 'firstSuggestionSelect',
                    value: suggestion.name || suggestion.host,
                },
            ],
        });
        setLocation({
            path: '/host/:host',
            suggestion: suggestion,
        });
    };
    var navigateToConnector = function (_a) {
        var suggestion = _a.suggestion, category = _a.category, query = _a.query, api = _a.api;
        eventTracking_1.trackEvent(eventTracking_1.Events.apiSuggestionSelect, {
            query: query,
            category: category,
            typedConnection: {
                title: suggestion.name,
                path: '/connection/:type',
            },
            type: api.type,
            tier: suggestion.tier,
            subtier: suggestion.subtier,
        }, {
            userProperties: [
                {
                    action: 'setOnce',
                    name: 'firstSuggestionSelect',
                    value: suggestion.name || suggestion.host,
                },
            ],
        });
        setLocation({
            path: '/connection/:type',
            api: api,
        });
    };
    var navigateToTemplate = function (_a) {
        var category = _a.category, template = _a.template, source = _a.source;
        eventTracking_1.trackEvent(eventTracking_1.Events.sheetsTemplateClick, __assign({ id: template.id, category: category, spreadsheetId: template.spreadsheetId, title: template.title, source: source }, (template.subtier ? { subtier: template.subtier } : {})));
        setLocation({
            path: '/template/:template',
            template: template,
        });
    };
    return {
        navigateToConnector: navigateToConnector,
        navigateToCustomAPI: navigateToCustomAPI,
        navigateToHost: navigateToHost,
        navigateToHostInterstitial: navigateToHostInterstitial,
        navigateToTemplate: navigateToTemplate,
    };
};
exports.useNavigateToAPI = useNavigateToAPI;
