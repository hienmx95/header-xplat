"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Dot() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%" },
    _react2.default.createElement("circle", { cx: "50%", cy: "50%", r: "3", fill: "#67748a" })
  );
}

exports.default = Dot;
module.exports = exports["default"];