"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BigResource() {
  return _react2.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "32",
      height: "32",
      viewBox: "0 0 32 32"
    },
    _react2.default.createElement(
      "defs",
      null,
      _react2.default.createElement(
        "linearGradient",
        {
          id: "a",
          x2: "1",
          y1: "0.5",
          y2: "0.5",
          gradientUnits: "objectBoundingBox"
        },
        _react2.default.createElement("stop", { offset: "0", stopColor: "#d31d00" }),
        _react2.default.createElement("stop", { offset: "1", stopColor: "#fa7522" })
      )
    ),
    _react2.default.createElement(
      "g",
      { "data-name": "Group 4221", transform: "translate(-264 -76)" },
      _react2.default.createElement("circle", {
        cx: "16",
        cy: "16",
        r: "16",
        fill: "url(#a)",
        "data-name": "Ellipse 32",
        transform: "translate(264 76)"
      }),
      _react2.default.createElement("path", {
        fill: "#fff",
        stroke: "#fff",
        strokeWidth: "0.3",
        d: "M15.556 0H4.889a.446.446 0 00-.444.444v4h-4a.446.446 0 00-.444.444v10.668A.446.446 0 00.445 16h10.666a.446.446 0 00.444-.444v-4h4a.446.446 0 00.445-.445V.444A.446.446 0 0015.556 0zm-4.889 15.111H.889V5.333h3.556v5.778a.446.446 0 00.444.444h5.778zm4.444-4.444H5.333V.889h9.778z",
        "data-name": "77 essential icons layers",
        transform: "translate(258 70) translate(14 14)"
      })
    )
  );
}

exports.default = BigResource;
module.exports = exports["default"];