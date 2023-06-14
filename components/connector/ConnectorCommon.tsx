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
exports.ConnectorCommon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ConnStateContext_1 = require("../editConnection/connState/ConnStateContext");
var SocketContext_1 = require("../editConnection/context/SocketContext");
var useDialogSocketRoomId_1 = require("../editConnection/useDialogSocketRoomId");
var ValidationContext_1 = require("./validation/ValidationContext");
var ConnectorContext_1 = require("./context/ConnectorContext");
var useInitConnState_1 = require("./hooks/useInitConnState");
var SaveConnectionContext_1 = require("../editConnection/context/SaveConnectionContext");
var ConditonalPreviewContext_1 = require("./context/ConditonalPreviewContext");
var ConnectorCommon = function (props) {
    var children = props.children;
    var socketRoomId = useDialogSocketRoomId_1.useDialogSocketRoomId(props).socketRoomId;
    var initConnState = useInitConnState_1.useInitConnState(props);
    return (jsx_runtime_1.jsx(ConnectorContext_1.ConnectorContextProvider, __assign({}, props, { children: jsx_runtime_1.jsx(ConnStateContext_1.ConnStateProvider, __assign({ conn: props.conn, suggestion: props.suggestion, initConnState: initConnState.apply }, { children: jsx_runtime_1.jsx(ConditonalPreviewContext_1.ConditionalPreviewContextProvider, { children: jsx_runtime_1.jsx(ValidationContext_1.ValidationContextProvider, { children: jsx_runtime_1.jsx(SocketContext_1.SocketProvider, __assign({ roomId: socketRoomId }, { children: jsx_runtime_1.jsx(ValidationContext_1.ValidationContextConsumer, { children: function (_a) {
                                var validate = _a.validate;
                                return (jsx_runtime_1.jsx(SaveConnectionContext_1.SaveConnectionContextProvider, __assign({ validate: function () { return validate(false, 'save'); } }, { children: children }), void 0));
                            } }, void 0) }), void 0) }, void 0) }, void 0) }), void 0) }), void 0));
};
exports.ConnectorCommon = ConnectorCommon;
