'use strict';

exports.__esModule = true;
exports.default = NoNotification;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NoData = require('../icon/NoData');

var _NoData2 = _interopRequireDefault(_NoData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoNotification(props) {
  return _react2.default.createElement(
    'div',
    { className: 'no-notification' },
    _react2.default.createElement(_NoData2.default, null),
    _react2.default.createElement(
      'p',
      null,
      'B\u1EA1n kh\xF4ng c\xF3 th\xF4ng b\xE1o n\xE0o!'
    )
  );
}
module.exports = exports['default'];