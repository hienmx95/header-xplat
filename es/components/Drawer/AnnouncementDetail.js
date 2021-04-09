function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Avatar, Tooltip } from 'antd';
import Calendar from '../icon/Calendar';
import IconLink from '../../assets/icons/icon-link.svg';
import { DateTimeFormat } from '@fwork/frontend-helper';
import i18n from 'i18next';

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

    return React.createElement(
      'div',
      {
        className: 'notification-detail' + (parseInt(notification.status) === 1 ? ' unread' : ''),
        onClick: this.handleClickNotification
      },
      React.createElement(
        'div',
        { className: 'fwork-header-info-mess' },
        React.createElement(
          Avatar,
          { src: notification.image, size: 34, className: 'fwork-avatar' },
          'FW'
        ),
        React.createElement(
          'div',
          { className: 'fwork-notification-content-mark' },
          React.createElement(
            'div',
            { className: 'fwork-notification-content' },
            React.createElement('p', { dangerouslySetInnerHTML: { __html: '<font color="#172b4d"><b>[' + notification.title + ']</b></font> ' + notification.content } }),
            React.createElement(
              'div',
              { className: 'created-date' },
              React.createElement(Calendar, null),
              React.createElement(
                'span',
                { className: 'fwork-notification-munite' },
                React.createElement(
                  DateTimeFormat,
                  { ago: true },
                  notification.createdDate
                )
              ),
              notification.url && React.createElement(
                'div',
                { className: 'fwk-notification-linked' },
                React.createElement('img', { className: 'fwk-notification-linked-icon', src: IconLink }),
                React.createElement(
                  'span',
                  null,
                  i18n.t('Liên kết')
                )
              )
            )
          ),
          parseInt(notification.status) === 1 && React.createElement(
            Tooltip,
            { placement: 'topRight', title: i18n.t('Đánh dấu đã đọc') },
            React.createElement('div', { className: 'mark-as-read-dot', onClick: function onClick(e) {
                e.stopPropagation();_this2.props.markAsRead();
              } })
          )
        )
      )
    );
  };

  return AnnouncementDetail;
}(React.Component);

export default AnnouncementDetail;