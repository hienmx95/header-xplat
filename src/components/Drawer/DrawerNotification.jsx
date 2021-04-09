import React from 'react';
import { Drawer, Form, Tabs } from 'antd';
import i18n from 'i18next';
import NotificationDetail from './NotificationDetail';
import AnnouncementDetail from './AnnouncementDetail';
import { fetchAPI } from '@fwork/frontend-helper';
import MoreOption from './MoreOption';
import NoNotification from './NoNotification';

const { TabPane } = Tabs;

class DrawerNotification extends React.Component {
  elmNotification;
  elmAnnouncement;
  isLoadingNotification = false;
  isLoadingAnnouncement = false;
  isLastNotification = false;
  isLastAnnouncement = false;
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      announcements: [],
      visible: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.visible && props.action === 'Notification') {
      return {
        visible: true
      };
    } else {
      return {
        visible: false
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible && !prevProps.visible) {
      this.getNotification();
      this.getAnnouncement();
    }
  }

  componentDidMount() {
    this.getNotification();
    this.getAnnouncement();
  }

  componentWillUnmount() {
    if (this.elmNotification) {
      this.elmNotification.removeEventListener('scroll', this.handleScrollNotification);
    }
    if (this.elmAnnouncement) {
      this.elmAnnouncement.removeEventListener('scroll', this.handleScrollAnnouncement);
    }
  }

  getNotification = (lastCreatedAt = null) => {
    if (this.isLoadingNotification) {
      return;
    }
    if (!lastCreatedAt) {
      this.setState({
        notifications: []
      });
    }
    this.isLoadingNotification = true;
    const FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
    const HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
    const url = 'notifications';
    fetchAPI({
      baseURL: HEADER_BACKEND,
      url,
      method: 'GET',
      params: {
        lastCreatedAt
      }
    }).then(res => {
      const notifications = this.state.notifications.concat(res.data.data);
      this.setState({
        notifications
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
      this.isLoadingNotification = false;
    }).catch(err => {
      this.isLoadingNotification = false;
      console.error('fetchNumberOfNotification:', err);
    });
  };

  getAnnouncement = (lastCreatedAt = null) => {
    // if (this.isLastAnnouncement || this.isLoadingAnnouncement) {
    //   return;
    // }
    this.isLoadingAnnouncement = true;
    if (!lastCreatedAt) {
      this.setState({
        announcements: []
      });
    }
    const FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
    const HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
    const url = 'notifications/announcements';
    fetchAPI({
      baseURL: HEADER_BACKEND,
      url,
      method: 'GET',
      params: {
        lastCreatedAt
      }
    }).then(res => {
      this.isLoadingAnnouncement = false;
      if (res.data.data.length < 20) {
        this.isLastAnnouncement = true;
      }
      const announcements = this.state.announcements.concat(res.data.data);
      this.setState({
        announcements
      });
      if (!lastCreatedAt) {
        const elmAnnouncement = document.getElementsByClassName('tab-announcement');
        if (elmAnnouncement.length) {
          this.elmAnnouncement = elmAnnouncement[0];
          this.elmAnnouncement.addEventListener('scroll', this.handleScrollAnnouncement, true);
        }
      }
    }).catch(err => {
      this.isLoadingAnnouncement = false;
      console.error('fetchNumberOfNotification:', err);
    });
  };

  _markAsReadAll = () => {
    const FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
    const HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
    const url = 'notifications/mark-as-read';
    fetchAPI({
      baseURL: HEADER_BACKEND,
      url,
      method: 'POST'
    }).then(() => {
      this.state.notifications.forEach(notification => {
        notification.status = 2;
      });
      this.state.announcements.forEach(announcement => {
        announcement.status = 2;
      });
      this.setState({});
      this.props.markAsReadAll();
    }).catch(err => {
      console.error('_markAsRead:', err);
    });
  };

  _markAsRead = (notification) => {
    const FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
    const HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
    const url = 'notifications/mark-as-read';
    const notificationId = notification ? notification._id : null;
    const noti = {
      show: false // defalut method GET === false
    };

    fetchAPI({
      baseURL: HEADER_BACKEND,
      url,
      method: 'POST',
      body: {
        notificationId,
      },
      notification: noti
    }).then(res => {
      if (parseInt(notification.type) === 1) {
        const index = this.state.notifications.findIndex(notificationState => notificationState._id === notification._id);
        this.state.notifications[index].status = 2;
      } else {
        const index = this.state.announcements.findIndex(notificationState => notificationState._id === notification._id);
        this.state.announcements[index].status = 2;
      }
      this.setState({});
      this.props.markAsRead(notification.type);
    }).catch(err => {
      console.error('_markAsRead:', err);
    });
  };

  handleScrollAnnouncement = () => {
    if (this.elmAnnouncement.scrollTop > (this.elmAnnouncement.scrollHeight - this.elmAnnouncement.offsetHeight - 250)) {
      if (!this.state.announcements.length) {
        return;
      }
      this.getAnnouncement(this.state.announcements[this.state.announcements.length - 1].createdDate);
    }
  };

  handleScrollNotification = () => {
    if (this.elmNotification.scrollTop > (this.elmNotification.scrollHeight - this.elmNotification.offsetHeight - 250)) {
      if (!this.state.notifications.length) {
        return;
      }
      this.getNotification(this.state.notifications[this.state.notifications.length - 1].createdDate);
    }
  };

  render() {
    const {
      visible,
      onClose,
      callback,
      numberOfNotification,
      numberOfAnnouncement
    } = this.props;
    const numberOfNotificationText = numberOfNotification > 99 ? '99+' : numberOfNotification;
    const numberOfAnnouncementText = numberOfAnnouncement > 99 ? '99+' : numberOfAnnouncement;
    const operations = <MoreOption markAsRead={this._markAsReadAll} />;
    return (
      <Drawer
        placement="right"
        closable={true}
        width={400}
        onClose={onClose}
        visible={visible}
        className="notification-list"
      >
        <Tabs defaultActiveKey="1" onChange={callback} tabBarExtraContent={operations}>
          <TabPane className="tab-notification" tab={`${i18n.t('Hệ thống')} (${numberOfNotificationText})`}
            key="1">
            {
              this.state.notifications.map((notification, i) => {
                return <NotificationDetail
                  history={this.props.history}
                  notification={notification}
                  key={i}
                  markAsRead={() => this._markAsRead(notification)}
                />;
              })
            }
            {
              !this.state.notifications.length ? (<NoNotification />) : null
            }
          </TabPane>
          <TabPane className="tab-announcement" tab={`${i18n.t('Công báo')} (${numberOfAnnouncementText})`}
            key="2" onTabClick={() => {
            }}>
            {this.state.announcements.map((notification, i) => {
              return <AnnouncementDetail
                history={this.props.history}
                notification={notification}
                key={i}
                markAsRead={() => this._markAsRead(notification) }
              />;
            })}
            {
              !this.state.announcements.length ? (<NoNotification />) : null
            }
          </TabPane>
        </Tabs>
      </Drawer>
    );
  }
}

const _DrawerNotification = Form.create({ name: 'form_drawer_profile' })(DrawerNotification);
export default _DrawerNotification;
