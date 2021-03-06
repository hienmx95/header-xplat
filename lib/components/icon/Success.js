"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CloseIcon() {
  return _react2.default.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", id: "check-circle", width: "18", height: "18", viewBox: "0 0 18 18" },
    _react2.default.createElement("path", {
      fill: "#069662",
      id: "Shape",
      d: "M9 18A9 9 0 0 1 2.636 2.636a9 9 0 0 1 12.728 12.728A8.942 8.942 0 0 1 9 18zM4.872 8.2a.633.633 0 0 0-.314.084.63.63 0 0 0-.236.863l1.914 3.347a.632.632 0 0 0 .863.237.609.609 0 0 0 .15-.117l.007-.007 6.319-6.34a.633.633 0 0 0-.9-.893l-5.753 5.772-1.5-2.628a.631.631 0 0 0-.55-.318z",
      className: "cls-1" })
  );
}

exports.default = CloseIcon;
module.exports = exports["default"];