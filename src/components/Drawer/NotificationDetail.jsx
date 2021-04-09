import React from 'react';
import { Avatar, Tooltip } from 'antd';
import Calendar from '../icon/Calendar';
import { DateTimeFormat } from '@fwork/frontend-helper';
import i18n from 'i18next';

class NotificationDetail extends React.Component {
  render() {
    const {
      notification
    } = this.props;

    return (
      <div
        className={'notification-detail' + ((parseInt(notification.status) === 1) ? ' unread' : '')}
        onClick={() => {
          if(notification.status === 1){
            this.props.markAsRead();
          }
          let { url, service, resource, code } = notification;
          if(url) {
            window.location.href = url;
            return;
          }
          if (!service || !resource || !code) {
            return;
          }
          url = url ? url : `/${service.toLocaleLowerCase()}/${resource}/${code}`;
          if (process.env.PROJECT_CODE === service) {
            const regex = new RegExp(`(\/?)${service.toLocaleLowerCase()}`);
            this.props.history.push(url.replace(regex, ''));
          } else {
            window.location.href = url;
          }
        }}
      >
        <div className="fwork-header-info-mess">
          <Avatar src={notification.image} size={34} className="fwork-avatar">FW</Avatar>
          <div className="fwork-notification-content-mark">
            <div className="fwork-notification-content">
              <p dangerouslySetInnerHTML={{ __html: notification.content }} />
              <div className="created-date">
                <Calendar />
                <span className="fwork-notification-munite"><DateTimeFormat ago={true}>{notification.createdDate}</DateTimeFormat></span>
                {/* {parseInt(notification.status) === 1 &&
                (<span className="mark-as-read" onClick={(e) => { e.stopPropagation(); this.props.markAsRead(); }}>{i18n.t('Đánh dấu đã đọc')}</span>)
              } */}
              </div>
            </div>
            {parseInt(notification.status) === 1 &&
              (<Tooltip placement="topRight" title={i18n.t('Đánh dấu đã đọc')}>
                <div className="mark-as-read-dot" onClick={(e) => { e.stopPropagation(); this.props.markAsRead(); }}></div>
              </Tooltip>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationDetail;
