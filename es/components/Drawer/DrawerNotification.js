function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Drawer, Form, Tabs } from 'antd';
import i18n from 'i18next';
import NotificationDetail from './NotificationDetail';
import AnnouncementDetail from './AnnouncementDetail';
import { fetchAPI } from '@fwork/frontend-helper';
import MoreOption from './MoreOption';
import NoNotification from './NoNotification';

var TabPane = Tabs.TabPane;

var DrawerNotification = function (_React$Component) {
  _inherits(DrawerNotification, _React$Component);

  function DrawerNotification(props) {
    _classCallCheck(this, DrawerNotification);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.isLoadingNotification = false;
    _this.isLoadingAnnouncement = false;
    _this.isLastNotification = false;
    _this.isLastAnnouncement = false;

    _this.getNotification = function () {
      var lastCreatedAt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (_this.isLoadingNotification) {
        return;
      }
      if (!lastCreatedAt) {
        _this.setState({
          notifications: []
        });
      }
      _this.isLoadingNotification = true;
      var FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
      var HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
      var url = 'notifications';
      fetchAPI({
        baseURL: HEADER_BACKEND,
        url: url,
        method: 'GET',
        params: {
          lastCreatedAt: lastCreatedAt
        }
      }).then(function (res) {
        var notifications = _this.state.notifications.concat(res.data.data);
        _this.setState({
          notifications: notifications
        });
        // this.isLoadingNotification = false;
        // if (res.data.data.length < 20) {
        //   this.isLastNotification = true;
        // }
        // if (!lastCreatedAt) {
        //   let elmNotification = document.getElementsByClassName("tab-notification");
        //   if (elmNotification.length) {
        //     this.elmNotification = elmNotification[0];
        //     this.elmNotification.addEventListener('scroll', this.handleScrollNotification, true);
        //   }
        // }
        _this.isLoadingNotification = false;
      }).catch(function (err) {
        _this.isLoadingNotification = false;
        console.error('fetchNumberOfNotification:', err);
      });
    };

    _this.getAnnouncement = function () {
      var lastCreatedAt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      // if (this.isLastAnnouncement || this.isLoadingAnnouncement) {
      //   return;
      // }
      _this.isLoadingAnnouncement = true;
      if (!lastCreatedAt) {
        _this.setState({
          announcements: []
        });
      }
      var FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
      var HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
      var url = 'notifications/announcements';
      fetchAPI({
        baseURL: HEADER_BACKEND,
        url: url,
        method: 'GET',
        params: {
          lastCreatedAt: lastCreatedAt
        }
      }).then(function (res) {
        _this.isLoadingAnnouncement = false;
        if (res.data.data.length < 20) {
          _this.isLastAnnouncement = true;
        }
        var announcements = _this.state.announcements.concat(res.data.data);
        _this.setState({
          announcements: announcements
        });
        if (!lastCreatedAt) {
          var elmAnnouncement = document.getElementsByClassName('tab-announcement');
          if (elmAnnouncement.length) {
            _this.elmAnnouncement = elmAnnouncement[0];
            _this.elmAnnouncement.addEventListener('scroll', _this.handleScrollAnnouncement, true);
          }
        }
      }).catch(function (err) {
        _this.isLoadingAnnouncement = false;
        console.error('fetchNumberOfNotification:', err);
      });
    };

    _this._markAsReadAll = function () {
      var FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
      var HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
      var url = 'notifications/mark-as-read';
      fetchAPI({
        baseURL: HEADER_BACKEND,
        url: url,
        method: 'POST'
      }).then(function () {
        _this.state.notifications.forEach(function (notification) {
          notification.status = 2;
        });
        _this.state.announcements.forEach(function (announcement) {
          announcement.status = 2;
        });
        _this.setState({});
        _this.props.markAsReadAll();
      }).catch(function (err) {
        console.error('_markAsRead:', err);
      });
    };

    _this._markAsRead = function (notification) {
      var FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
      var HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
      var url = 'notifications/mark-as-read';
      var notificationId = notification ? notification._id : null;
      var noti = {
        show: false // defalut method GET === false
      };

      fetchAPI({
        baseURL: HEADER_BACKEND,
        url: url,
        method: 'POST',
        body: {
          notificationId: notificationId
        },
        notification: noti
      }).then(function (res) {
        if (parseInt(notification.type) === 1) {
          var index = _this.state.notifications.findIndex(function (notificationState) {
            return notificationState._id === notification._id;
          });
          _this.state.notifications[index].status = 2;
        } else {
          var _index = _this.state.announcements.findIndex(function (notificationState) {
            return notificationState._id === notification._id;
          });
          _this.state.announcements[_index].status = 2;
        }
        _this.setState({});
        _this.props.markAsRead(notification.type);
      }).catch(function (err) {
        console.error('_markAsRead:', err);
      });
    };

    _this.handleScrollAnnouncement = function () {
      if (_this.elmAnnouncement.scrollTop > _this.elmAnnouncement.scrollHeight - _this.elmAnnouncement.offsetHeight - 250) {
        if (!_this.state.announcements.length) {
          return;
        }
        _this.getAnnouncement(_this.state.announcements[_this.state.announcements.length - 1].createdDate);
      }
    };

    _this.handleScrollNotification = function () {
      if (_this.elmNotification.scrollTop > _this.elmNotification.scrollHeight - _this.elmNotification.offsetHeight - 250) {
        if (!_this.state.notifications.length) {
          return;
        }
        _this.getNotification(_this.state.notifications[_this.state.notifications.length - 1].createdDate);
      }
    };

    _this.state = {
      notifications: [],
      announcements: [],
      visible: false
    };
    return _this;
  }

  DrawerNotification.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (props.visible && props.action === 'Notification') {
      return {
        visible: true
      };
    } else {
      return {
        visible: false
      };
    }
  };

  DrawerNotification.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (this.props.visible && !prevProps.visible) {
      this.getNotification();
      this.getAnnouncement();
    }
  };

  DrawerNotification.prototype.componentDidMount = function componentDidMount() {
    this.getNotification();
    this.getAnnouncement();
  };

  DrawerNotification.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.elmNotification) {
      this.elmNotification.removeEventListener('scroll', this.handleScrollNotification);
    }
    if (this.elmAnnouncement) {
      this.elmAnnouncement.removeEventListener('scroll', this.handleScrollAnnouncement);
    }
  };

  DrawerNotification.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        visible = _props.visible,
        onClose = _props.onClose,
        callback = _props.callback,
        numberOfNotification = _props.numberOfNotification,
        numberOfAnnouncement = _props.numberOfAnnouncement;

    var numberOfNotificationText = numberOfNotification > 99 ? '99+' : numberOfNotification;
    var numberOfAnnouncementText = numberOfAnnouncement > 99 ? '99+' : numberOfAnnouncement;
    var operations = React.createElement(MoreOption, { markAsRead: this._markAsReadAll });
    return React.createElement(
      Drawer,
      {
        placement: 'right',
        closable: true,
        width: 400,
        onClose: onClose,
        visible: visible,
        className: 'notification-list'
      },
      React.createElement(
        Tabs,
        { defaultActiveKey: '1', onChange: callback, tabBarExtraContent: operations },
        React.createElement(
          TabPane,
          { className: 'tab-notification', tab: i18n.t('Hệ thống') + ' (' + numberOfNotificationText + ')',
            key: '1' },
          this.state.notifications.map(function (notification, i) {
            return React.createElement(NotificationDetail, {
              history: _this2.props.history,
              notification: notification,
              key: i,
              markAsRead: function markAsRead() {
                return _this2._markAsRead(notification);
              }
            });
          }),
          !this.state.notifications.length ? React.createElement(NoNotification, null) : null
        ),
        React.createElement(
          TabPane,
          { className: 'tab-announcement', tab: i18n.t('Công báo') + ' (' + numberOfAnnouncementText + ')',
            key: '2', onTabClick: function onTabClick() {} },
          this.state.announcements.map(function (notification, i) {
            return React.createElement(AnnouncementDetail, {
              history: _this2.props.history,
              notification: notification,
              key: i,
              markAsRead: function markAsRead() {
                return _this2._markAsRead(notification);
              }
            });
          }),
          !this.state.announcements.length ? React.createElement(NoNotification, null) : null
        )
      )
    );
  };

  return DrawerNotification;
}(React.Component);

var _DrawerNotification = Form.create({ name: 'form_drawer_profile' })(DrawerNotification);
export default _DrawerNotification;