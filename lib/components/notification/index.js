'use strict';

exports.__esModule = true;
exports.openNotification = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Remove = require('../icon/Remove');

var _Remove2 = _interopRequireDefault(_Remove);

var _Success = require('../icon/Success');

var _Success2 = _interopRequireDefault(_Success);

var _Edit = require('../icon/Edit');

var _Edit2 = _interopRequireDefault(_Edit);

var _Warning = require('../icon/Warning');

var _Warning2 = _interopRequireDefault(_Warning);

var _Alert = require('../icon/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Comment = require('../icon/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openNotification = exports.openNotification = function openNotification(type, action, title, content) {
  var description = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var duration = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;

  var dataIcon = {
    'success': _react2.default.createElement(_Success2.default, null),
    'error': _react2.default.createElement(_Success2.default, null),
    'comment': _react2.default.createElement(_Comment2.default, null),
    'alert': _react2.default.createElement(_Alert2.default, null),
    'warning': _react2.default.createElement(_Warning2.default, null),
    'edit': _react2.default.createElement(_Edit2.default, null),
    'remove': _react2.default.createElement(_Remove2.default, null)
  };
  _antd.notification.open({
    message: _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: '<font color="#172b4d"><b>[' + title + ']</b> ' + content + '</font>' } }),
    description: description,
    onClick: action,
    duration: duration,
    icon: dataIcon[type],
    className: 'fwork-notification ' + type
  });
};