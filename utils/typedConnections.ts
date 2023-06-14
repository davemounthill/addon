"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTypedCustomApi = exports.getConnectionType = exports.getCustomApiType = void 0;
var runtypesRegistry_1 = require("./runtypesRegistry");
var getCustomApiType = function (customApi) {
    if ('blob' in customApi && customApi.blob) {
        var blob = customApi.blob;
        if ('type' in blob && typeof blob.type === 'string') {
            var type = blob.type;
            var maybeAPI = runtypesRegistry_1.RuntypesRegistry.findTypedAPI(type);
            if (maybeAPI) {
                return {
                    typedAPI: maybeAPI,
                    blob: blob,
                };
            }
        }
    }
    return null;
};
exports.getCustomApiType = getCustomApiType;
var getConnectionType = function (conn) {
    return exports.getCustomApiType(conn.data);
};
exports.getConnectionType = getConnectionType;
var isValidTypedCustomApi = function (customApi, typedAPIWithBlob) {
    var typedAPI = typedAPIWithBlob.typedAPI, blob = typedAPIWithBlob.blob;
    // This connection was probably created as a typed API.
    //
    // If the value is still compatible with the runtype, and
    // the generated custom API parameters match the saved ones,
    // the user can edit the connection using the structured UI.
    var validation = typedAPI.runtype.validate(blob);
    // We previously considered not just whether the blob conformed to our
    // runtypes schema, but also whether called typedAPI.toCustomApi(blob)
    // resulted in the same values that were already present on the connection.
    //
    // In hindsight, this seems like overkill and prevents us from making small
    // tweaks that don't affect the shape of the data, but do affect the quality
    // of the data (eg parsing dates, asking for more results per page).
    //
    // If we want to revive such a feature in the future, we should introduce a
    // version number in the runtypes, like:
    //
    // version: Literal(1)
    //
    // which can be incremented to prevent old instances of the connector from
    // coming along for the ride.
    return validation.success;
};
exports.isValidTypedCustomApi = isValidTypedCustomApi;
