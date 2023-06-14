"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInitConnState = void 0;
var react_1 = require("react");
var StoreLoadedContext_1 = require("../../../store/StoreLoadedContext");
var openAPIEndpoint_1 = require("../../../utils/openAPIEndpoint");
var helpers_1 = require("../../editConnection/connState/helpers");
var lib_1 = require("../lib");
var useInitConnState = function (props) {
    var spreadsheetProperties = react_1.useContext(StoreLoadedContext_1.StoreLoadedContext).spreadsheetProperties;
    var operation = props.suggestion.endpoint.operation;
    var apply = function (connState) {
        var updated = connState;
        // Identify us as a generic connector
        updated.blob = {
            generic: true,
        };
        // Hack for now since Stripe has an extensive default transform set for the connectors which we no longer want
        updated.transform = undefined;
        // set default values for controls
        for (var _i = 0, _a = operation['x-controls'] || []; _i < _a.length; _i++) {
            var control = _a[_i];
            updated = lib_1.ensureControlInConnState(connState, control, spreadsheetProperties);
        }
        // Set default values for parameters, headers, etc
        var params = openAPIEndpoint_1.getAllParameters(props.suggestion.endpoint);
        for (var _b = 0, params_1 = params; _b < params_1.length; _b++) {
            var param = params_1[_b];
            if (param.default) {
                var name_1 = param.name;
                updated = helpers_1.ensureParamOfType(updated, param.in, {
                    name: name_1,
                    value: param.default,
                });
            }
        }
        // pagination
        if (operation['x-pagination']) {
            updated.pagination = lib_1.mkConnPaginationState(operation['x-pagination']);
        }
        return updated;
    };
    return { apply: apply };
};
exports.useInitConnState = useInitConnState;
