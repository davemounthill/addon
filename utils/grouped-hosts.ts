"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
var keyOf = function (entry) {
    return entry.host + ":" + entry.prefix + ":" + entry.type;
};
var merge = function (
// The ordered list of results.
list, 
// The flattened list of all connectors/top-level APIs that should be joined.
groupedHosts, templates) {
    var isGroupable = {};
    for (var _i = 0, groupedHosts_1 = groupedHosts; _i < groupedHosts_1.length; _i++) {
        var row = groupedHosts_1[_i];
        isGroupable[row.domain || row.host] = true;
    }
    var seenDomains = {};
    var rv = [];
    var _loop_1 = function (item) {
        var domain = item.domain || item.host;
        if (!isGroupable[domain]) {
            // Vanilla entry, don't try to collapse it
            rv.push({
                self: item,
                suggestions: [],
                templates: templates.filter(function (template) {
                    return template.hosts.find(function (host) { return host === item.type || item.host; });
                }),
            });
            return "continue";
        }
        if (seenDomains[domain])
            return "continue";
        seenDomains[domain] = true;
        // Create an entry for this groupable thing:
        //
        // - prefer the shortest NULL type entry as the root
        //   - this is a hack, but is probably good enough
        // - then use the items in groupedHost, but override the sort order with
        //   the sort order from list, ie personalize the results so "balance" shows
        //   the Binance Balance connector first, then the other ones
        var entries = groupedHosts.filter(function (groupItem) { return (groupItem.domain || groupItem.host) === domain; });
        var self_1 = entries
            .filter(function (entry) { return !entry.type; })
            .sort(function (a, b) { return (a.host + a.prefix).length - (b.host + b.prefix).length; })[0];
        // eslint-disable-next-line no-continue
        if (!self_1)
            return "continue";
        var sortOrders = {};
        var i = 1;
        for (var _b = 0, list_2 = list; _b < list_2.length; _b++) {
            var entry = list_2[_b];
            sortOrders[keyOf(entry)] = i;
            i += 1;
        }
        for (var _c = 0, entries_1 = entries; _c < entries_1.length; _c++) {
            var entry = entries_1[_c];
            sortOrders[keyOf(entry)] = i;
            i += 1;
        }
        rv.push({
            self: self_1,
            suggestions: entries.sort(function (a, b) { return (sortOrders[keyOf(a)] || 0) - (sortOrders[keyOf(b)] || 0); }),
            templates: templates.filter(function (template) {
                return template.hosts.find(function (host) { return host === self_1.host; });
            }),
        });
    };
    for (var _a = 0, list_1 = list; _a < list_1.length; _a++) {
        var item = list_1[_a];
        _loop_1(item);
    }
    return rv;
};
exports.merge = merge;
