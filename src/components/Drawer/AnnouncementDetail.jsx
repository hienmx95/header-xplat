import React from 'react';
import { Avatar, Tooltip } from 'antd';
import Calendar from '../icon/Calendar';
import IconLink from '../../assets/icons/icon-link.svg';
import { DateTimeFormat } from '@fwork/frontend-helper';
import i18n from 'i18next';

class AnnouncementDetail extends React.Component {
  handleClickNotification = () => {
    const noti = this.props.notification;
    if (noti.status === 1 ){
      this.props.markAsRead();
    }
    if (noti.url) {
      let url = noti.url;
      if(noti.url.slice(0,4)!== 'http'){
        url = 'http://'+ noti.url;
      }
      window.open(url);
    }
  }

  // redirect = (url, service) => {
  //   console.log('runnign');
  //     // const regex = new RegExp(`(\/?)${service.toLocaleLowerCase()}`);
  //     // this.props.history.push(url.replace(regex, ''));
  //     this.props.history.push(url.replace(url));
  // }
  render() {
    const {
      notification
    } = this.props;
    return (
      <div
        className={'notification-detail' + ((parseInt(notification.status) === 1) ? ' unread' : '')}
        onClick={this.handleClickNotification}
      >
        <div className="fwork-header-info-mess">
          <Avatar src={notification.image} size={34} className="fwork-avatar">FW</Avatar>
          <div className="fwork-notification-content-mark">
            <div className="fwork-notification-content">
              <p dangerouslySetInnerHTML={{ __html: `<font color="#172b4d"><b>[${notification.title}]</b></font> ${notification.content}` }} />
              <div className="created-date">
                <Calendar />
                <span className="fwork-notification-munite"><DateTimeFormat ago={true}>{notification.createdDate}</DateTimeFormat></span>
                { notification.url && <div className="fwk-notification-linked"><img className="fwk-notification-linked-icon" src={ IconLink } /><span>{i18n.t('Liên kết')}</span></div> }
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

export default AnnouncementDetail;
