import React from 'react';
import {Drawer, Form, Button, Avatar} from 'antd';
import Logout from '../../assets/icons/sign-out.svg';
import User from '../../assets/icons/user.svg';
import ChangePassword from '../../assets/icons/padlock.svg';
import Setting from '../../assets/icons/icon_setting.svg';
import i18n from 'i18next';
import '../../lang/i18n';
class DrawerProfile extends React.Component {
  render () {
    const {
      visible,
      onClose,
      logout,
      authUser
    } = this.props;

    return (
      <Drawer
        placement="right"
        closable={true}
        width={320}
        onClose={onClose}
        visible={visible}
      >
        <div>
          <div className="fwork-title-profile">
            <img src={ Logout } onClick={logout} />
            <p onClick={logout}>{i18n.t('Đăng xuất')}</p>
          </div>
          <div className = "fwork-profile-drawer">
            <div className="fwork-profile-image-drawer" >
              {!authUser.loading && authUser.isLogged && authUser.profile.avatar ?
                (<img
                  src={authUser.profile.avatar}
                  alt="Avatar"/>) : (
                  <Avatar>{ authUser.isLogged ? authUser.profile.fullName[0] : 'F'}</Avatar>
                )}
            </div>
            <div className="fwork-profile-info">
              <span className="fwork-profile-name">{ !authUser.loading && authUser.isLogged ? authUser.company.company.name : null }</span>
              <span className="fwork-profile-email">{ !authUser.loading && authUser.isLogged ? authUser.email : null }</span>
              <span className="fwork-profile-job">{ !authUser.loading && authUser.isLogged ? authUser.company.position : null }</span>
            </div>
          </div>
          <div className= "fwork-profile-account">
            <p className= "fwork-profile-account-p">{i18n.t('Thông tin tài khoản')}</p>
            <div className="fwork-profile-account-list">
              <img src={ User } />
              <p>{i18n.t('Hồ sơ cá nhân')}</p>
            </div>
            <div className="fwork-profile-account-list">
              <img src = { ChangePassword } />
              <p>{i18n.t('Thay đổi mật khẩu')}</p>
            </div>
            <div className="fwork-profile-account-list">
              <img src={ Setting } />
              <p>{i18n.t('Cài đặt')}</p>
            </div>
          </div>
          <div className="fwork-profile-footer">
            <p className = "fwork-profile-footer-p">{i18n.t('Trợ giúp FWork')}</p>
            <p className="fwork-profile-footer-content">{i18n.t('Cung cấp thông tin cơ bản hay chuyên sâu về hệ thống. Bạn có thể tìm hiểu thông qua hướng dẫn sử dụng, câu hỏi Q&A, video...')}</p>
            <Button className="fwork-profile-footer-btn" type="danger" ghost>{i18n.t('Tìm hiểu ngay')}</Button>
          </div>
        </div>
      </Drawer>
    );
  }
}

const _DrawerProfile = Form.create({ name: 'form_drawer_profile' })(DrawerProfile);
export default _DrawerProfile;
