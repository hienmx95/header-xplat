'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _Calendar = require('../icon/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _frontendHelper = require('@fwork/frontend-helper');

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationDetail = function (_React$Component) {
  _inherits(NotificationDetail, _React$Component);

  function NotificationDetail() {
    _classCallCheck(this, NotificationDetail);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  NotificationDetail.prototype.render = function render() {
    var _this2 = this;

    var notification = this.props.notification;


    return _react2.default.createElement(
      'div',
      {
        className: 'notification-detail' + (parseInt(notification.status) === 1 ? ' unread' : ''),
        onClick: function onClick() {
          if (notification.status === 1) {
            _this2.props.markAsRead();
          }
          var url = notification.url,
              service = notification.service,
              resource = notification.resource,
              code = notification.code;

          if (url) {
            window.location.href = url;
            return;
          }
          if (!service || !resource || !code) {
            return;
          }
          url = url ? url : '/' + service.toLocaleLowerCase() + '/' + resource + '/' + code;
          if (process.env.PROJECT_CODE === service) {
            var regex = new RegExp('(/?)' + service.toLocaleLowerCase());
            _this2.props.history.push(url.replace(regex, ''));
          } else {
            window.location.href = url;
          }
        }
      },
      _react2.default.createElement(
        'div',
        { className: 'fwork-header-info-mess' },
        _react2.default.createElement(
          _antd.Avatar,
          { src: notification.image, size: 34, className: 'fwork-avatar' },
          'FW'
        ),
        _react2.default.createElement(
          'div',
          { className: 'fwork-notification-content-mark' },
          _react2.default.createElement(
            'div',
            { className: 'fwork-notification-content' },
            _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: notification.content } }),
            _react2.default.createElement(
              'div',
              { className: 'created-date' },
              _react2.default.createElement(_Calendar2.default, null),
              _react2.default.createElement(
                'span',
                { className: 'fwork-notification-munite' },
                _react2.default.createElement(
                  _frontendHelper.DateTimeFormat,
                  { ago: true },
                  notification.createdDate
                )
              )
            )
          ),
          parseInt(notification.status) === 1 && _react2.default.createElement(
            _antd.Tooltip,
            { placement: 'topRight', title: _i18next2.default.t('Đánh dấu đã đọc') },
            _react2.default.createElement('div', { className: 'mark-as-read-dot', onClick: function onClick(e) {
                e.stopPropagation();_this2.props.markAsRead();
              } })
          )
        )
      )
    );
  };

  return NotificationDetail;
}(_react2.default.Component);

exports.default = NotificationDetail;
module.exports = exports['default'];