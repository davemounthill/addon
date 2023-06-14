"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverFunctions = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var Server = require('gas-client').default;
var server = new Server({
    // this is necessary for local development but will be ignored in production
    allowedDevelopmentDomains: function (origin) {
        return /https:\/\/.*\.googleusercontent\.com$/.test(origin);
    },
    parentTargetOrigin: '*',
});
exports.default = server;
var serverFunctions = server.serverFunctions;
exports.serverFunctions = serverFunctions;
