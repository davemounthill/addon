"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
var react_1 = require("react");
function useSocketIo(roomId, handler) {
    // When we emit a message on the websocket, the server will amplify it to all sockets
    // in `roomId`. That includes us.
    //
    // To avoid running our handler method for messages which we sent, we include this id
    // in the outgoing message, and ignore inbound messages with the same id.
    var myId = react_1.useState((new Date().getTime() * Math.random()).toString(36))[0];
    var socketRef = react_1.useRef(null);
    var initialzedRef = react_1.useRef(false);
    react_1.useEffect(function () {
        console.log("registering socket " + myId + " for room " + roomId);
        var socket = socket_io_client_1.io("https://" + process.env.WEBBASE_HOST, {
            query: {
                roomId: roomId,
            },
        });
        socketRef.current = socket;
        socket.onAny(function (eventName, senderId) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (senderId === myId) {
                console.log("ignoring message from self");
                return;
            }
            handler.apply(void 0, __spreadArray([eventName], args));
        });
        initialzedRef.current = true;
        return function disconnect() {
            console.log("disconnect socket " + myId + " for room " + roomId);
            socket.disconnect();
            socketRef.current = null;
        };
        // Only run this once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function emit(eventName) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (socketRef.current === null) {
            throw new Error("socket not initialized");
        }
        (_a = socketRef.current).emit.apply(_a, __spreadArray([eventName, myId], args));
    }
    return { emit: emit, initialized: initialzedRef.current };
}
exports.default = useSocketIo;
