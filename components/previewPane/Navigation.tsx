"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_bootstrap_1 = require("react-bootstrap");
var Navigation = function (props) {
    var id = props.id, navKey = props.navKey, onChange = props.onChange;
    return (jsx_runtime_1.jsx(react_bootstrap_1.Form.Switch, { label: 'View raw data', checked: navKey === 'source', onChange: function () {
            if (navKey === 'source') {
                onChange('preview');
            }
            else {
                onChange('source');
            }
        }, id: id }, void 0));
};
exports.Navigation = Navigation;
