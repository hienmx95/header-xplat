import React from 'react';
import { StyledAvatar } from './DrawerNotification';
import moment from 'moment';

class NotificationDetail extends React.Component {

  handleClickNotification() {
    let { url, service, resource, code } = this.props.notification;
    if (url) {
      this.redirect(url);
    }
    if (service || resource || code) {
      url = `/${service.toLocaleLowerCase()}/${resource}/${code}`;
      this.redirect(url, service);
    }
  }

  redirect(url, service){
    if (process.env.PROJECT_CODE === service) {
      const regex = new RegExp(`(\/?)${service.toLocaleLowerCase()}`);
      this.props.history.push(url.replace(regex, ''));
    } else {
      window.location.href = url;
    }
  }

  render() {
    let {
      notification
    } = this.props;

    return (
      <div className="fwork-header-info-mess"
        onClick={this.handleClickNotification}>
        <StyledAvatar className="fwork-avatar" style={{ color: '#f9f9f9', backgroundColor: '#b7eb8f' }}
          size="large">Huong</StyledAvatar>
        <div style={{ paddingLeft: '15px' }}>
          <p className="fwork-notification-content">{notification.content}</p>
          <span className="fwork-notification-munite">{moment(notification.createdDate).format('DD/MM/YYYY h:mm A')}</span>
        </div>
      </div>
    );
  }
}

export default NotificationDetail;
