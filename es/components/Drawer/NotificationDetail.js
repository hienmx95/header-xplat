function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Avatar, Tooltip } from 'antd';
import Calendar from '../icon/Calendar';
import { DateTimeFormat } from '@fwork/frontend-helper';
import i18n from 'i18next';

var NotificationDetail = function (_React$Component) {
  _inherits(NotificationDetail, _React$Component);

  function NotificationDetail() {
    _classCallCheck(this, NotificationDetail);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  NotificationDetail.prototype.render = function render() {
    var _this2 = this;

    var notification = this.props.notification;


    return React.createElement(
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
            React.createElement('p', { dangerouslySetInnerHTML: { __html: notification.content } }),
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

  return NotificationDetail;
}(React.Component);

export default NotificationDetail;