"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionHost = void 0;
// eslint-disable-next-line import/prefer-default-export
var getConnectionHost = function (conn) {
    try {
        var url = new URL(conn.data.endpoint);
        // In node, { and } are not URL encoded when in the host.
        // In the Chrome VM, they are, so decode them.
        var host = url.host.replace(/%7B/gi, '{').replace(/%7D/gi, '}');
        for (var _i = 0, _a = conn.data.pathParameters || []; _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b.name, value = _b.value;
            host = host.replace("{" + name_1 + "}", value);
        }
        return host;
    }
    catch (_) {
        return undefined;
    }
};
exports.getConnectionHost = getConnectionHost;
