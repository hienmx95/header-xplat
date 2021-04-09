"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Table() {
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
      { "data-name": "Group 4224" },
      _react2.default.createElement(
        "g",
        {
          "data-name": "Group 4203",
          transform: "translate(-264 -76) translate(-3838 -2856)"
        },
        _react2.default.createElement("circle", {
          cx: "16",
          cy: "16",
          r: "16",
          fill: "url(#a)",
          "data-name": "Ellipse 32",
          transform: "translate(4102 2932)"
        }),
        _react2.default.createElement(
          "g",
          { "data-name": "Group 205", transform: "translate(4110 2940)" },
          _react2.default.createElement("path", {
            fill: "none",
            d: "M0 0H16V16H0z",
            "data-name": "Rectangle 48 Copy 4"
          }),
          _react2.default.createElement("path", {
            fill: "#fff",
            d: "M14.875 12.5H1.125A1.151 1.151 0 010 11.328V1.172A1.151 1.151 0 011.125 0h13.75A1.15 1.15 0 0116 1.172v10.156a1.15 1.15 0 01-1.125 1.172zM5.124 8.578v2.75h9.75v-2.75a.016.016 0 01-.016.016H5.141a.016.016 0 01-.015-.016zm-4-3.89v6.641H4V4.688zm4.017 2.734h9.718a.016.016 0 01.016.016v-2.75h-9.75v2.75a.016.016 0 01.016-.016zm-4.016-6.25v2.343h13.75V1.172z",
            transform: "translate(0 1.75)"
          })
        )
      )
    )
  );
}

exports.default = Table;
module.exports = exports["default"];