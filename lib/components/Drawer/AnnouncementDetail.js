'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _Calendar = require('../icon/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _iconLink = require('../../assets/icons/icon-link.svg');

var _iconLink2 = _interopRequireDefault(_iconLink);

var _frontendHelper = require('@fwork/frontend-helper');

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnnouncementDetail = function (_React$Component) {
  _inherits(AnnouncementDetail, _React$Component);

  function AnnouncementDetail() {
    var _temp, _this, _ret;

    _classCallCheck(this, AnnouncementDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClickNotification = function () {
      var noti = _this.props.notification;
      if (noti.status === 1) {
        _this.props.markAsRead();
      }
      if (noti.url) {
        var url = noti.url;
        if (noti.url.slice(0, 4) !== 'http') {
          url = 'http://' + noti.url;
        }
        window.open(url);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // redirect = (url, service) => {
  //   console.log('runnign');
  //     // const regex = new RegExp(`(\/?)${service.toLocaleLowerCase()}`);
  //     // this.props.history.push(url.replace(regex, ''));
  //     this.props.history.push(url.replace(url));
  // }
  AnnouncementDetail.prototype.render = function render() {
    var _this2 = this;

    var notification = this.props.notification;

    return _react2.default.createElement(
      'div',
      {
        className: 'notification-detail' + (parseInt(notification.status) === 1 ? ' unread' : ''),
        onClick: this.handleClickNotification
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
            _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: '<font color="#172b4d"><b>[' + notification.title + ']</b></font> ' + notification.content } }),
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
              ),
              notification.url && _react2.default.createElement(
                'div',
                { className: 'fwk-notification-linked' },
                _react2.default.createElement('img', { className: 'fwk-notification-linked-icon', src: _iconLink2.default }),
                _react2.default.createElement(
                  'span',
                  null,
                  _i18next2.default.t('Liên kết')
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

  return AnnouncementDetail;
}(_react2.default.Component);

exports.default = AnnouncementDetail;
module.exports = exports['default'];