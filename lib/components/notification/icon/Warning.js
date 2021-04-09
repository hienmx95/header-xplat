"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Warning() {
  return _react2.default.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 18 18" },
    _react2.default.createElement(
      "g",
      { id: "exclamation-circle", opacity: "0.65" },
      _react2.default.createElement("path", { id: "Shape", d: "M9,18A9,9,0,0,1,2.636,2.636,9,9,0,0,1,15.364,15.364,8.942,8.942,0,0,1,9,18Zm0-5.625a.791.791,0,1,0,.791.791A.792.792,0,0,0,9,12.375ZM9,3.357a.7.7,0,0,0-.7.7v6.486a.7.7,0,1,0,1.406,0V4.061A.7.7,0,0,0,9,3.357Z", transform: "translate(0 0)", fill: "#f1b228" })
    )
  );
}

exports.default = Warning;
module.exports = exports["default"];