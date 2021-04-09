import React from 'react';
import { Drawer, Form, Avatar, Tabs } from 'antd';
import Bell1 from '../../assets/icons/bell1.svg';
import styled from 'styled-components';
import i18n from 'i18next';
import '../../lang/i18n';
import NotificationDetail from './NotificationDetail';

const { TabPane } = Tabs;
export const StyledAvatar = styled(Avatar)`
  span.ant-avatar-string {
    font-size: 0 !important
  }

  span.ant-avatar-string:first-letter {
    font-size: 18px;
  }
`;
class DrawerNotification extends React.Component {

  render () {
    let {
      visible,
      onClose,
      numberOfNotification,
      callback,
      notifications
    } = this.props;
    let notificationsOfSystems = notifications.filter(notification => parseInt(notification.type) === 1);
    let notificationsOfChat = notifications.filter(notification => parseInt(notification.type) === 2);
    return (
      <Drawer
        placement="right"
        closable={true}
        width={320}
        onClose={onClose}
        visible={visible}
      >
        <div>
          <div>
            <div className="fwork-title-notification">
              <a href="#" className="fwork-notification-a">
                <img src={ Bell1 } className="logo-img" />
                {
                  numberOfNotification ?
                    (<mark>
                      <p className="fwork-total-mess">{numberOfNotification > 99 ? '99' : numberOfNotification }</p>
                      {numberOfNotification > 99 ? (<span>+</span>) : ('')}</mark>) : null
                }
              </a>
              <p className="fwork-total-p">{i18n.t('Thông báo')}</p>
            </div>
          </div>
          <div>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab={i18n.t('Tất cả')} key="1">
                {notifications.map((notification, i) => {
                  return <NotificationDetail notification={notification} key={i}/>;
                })}
              </TabPane>
              <TabPane tab={i18n.t('Hệ thống')} key="2">
                {notificationsOfSystems.map((notification, i) => {
                  return <NotificationDetail notification={notification} key={i}/>;
                })}
              </TabPane>
              <TabPane tab={i18n.t('Trò chuyện')} key="3">
                {notificationsOfChat.map((notification, i) => {
                  return <NotificationDetail notification={notification} key={i}/>;
                })}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Drawer>
    );
  }
}

const _DrawerNotification = Form.create({ name: 'form_drawer_profile' })(DrawerNotification);
export default _DrawerNotification;
