/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable linebreak-style */
import React from 'react';
import '../scss/header.scss';
import i18n from 'i18next';
import LogoFWDEV from '../assets/icons/logo3.svg';
import '../lang/i18n';
import { Row, Col, Avatar, Layout, Tooltip, Input } from 'antd';
import { connect } from 'react-redux';
import IconMenu from '../assets/icons/icon_menu.svg';
import IconNotification from '../assets/icons/icon_notification.svg';
import DrawerProfile from '../components/Drawer/DrawerProfile';
import DrawerNotification from '../components/Drawer/DrawerNotification';
import LogoDefault from '../assets/images/icon-lg-fwork.jpg';
import IconHelp from '../assets/icons/icon_help.svg';
import IconPlus from '../assets/icons/icon-plus.svg';
import { openNotification } from './notification';
import IconHome from '../assets/icons/icon-home.svg';
import IconHomeSearch from '../assets/icons/icon-home-search.svg';
import { logout, fetchAPI } from '@fwork/frontend-helper';
const { Search } = Input;

class HeaderCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      checked: true,
      showDrw: false,
      showHideMenu: false,
      action: '',
      lang: localStorage.getItem('lng') || 'en',
      projects: [],
      projectDetail: [],
      numberOfNotification: 0,
      numberOfAnnouncement: 0,
      totalUnread: 0,
      totalUnreadText: '',
      notifications: [],
      showMenu: false,
      services: [],
      stores: [],
      customize: [],
      extendApp: [],
      listDataProject: [],
      search: false,
      clickedOutside: false,
      showDropdown: false,
      clickHideMenu: false
    };

  }
  componentDidMount() {
    this.listenNewNotification();
    this.fetchNumberOfNotification();
    this.fetchExtendApp().then(res => {
      const appExtend = res.data.data;
      if (appExtend && appExtend.length <= 0) return;
      this.setState({
        extendApp: appExtend
      });
    }).catch(err => {
      console.error('err fetchServiceExtend: ', err);
    });
    this.fetchProjects().then(res => {
      const project = res.data.result;
      if (project && project.length <= 0) return;
      this.setState({
        projects: project.filter(item => item.default),
        stores: project.filter(item => item.store),
        customize: project.filter(item => item.customize)
      });
    }).catch(err => {
      console.error('err fetchProjects: ', err);
    });
    this.fetchService().then(res => {
      const service = res.data.data;
      // if (services.length <= 0) return;
      this.setState({
        services: service
      });
    }).catch(err => {
      console.error('err fetchService: ', err);
    });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  openUrl = ({ url, service, resource, code }) => {
    if (service === 'announcement') {
      return this.openUrlAnnoucement(url);
    }
    if (url) {
      return this.redirect(url);
    }
    if (!service || !resource || !code) {
      return;
    }
    url = `/${service.toLocaleLowerCase()}/${resource}/${code}`;
    this.redirect(url, service);
  };

  openUrlAnnoucement = (url) => {
    if (url) {
      let newUrl = url;
      if (url.slice(0, 4) !== 'http') {
        newUrl = 'http://' + url;
      }
      window.open(newUrl);
    }
  }
  redirect(url, service) {
    if (process.env.PROJECT_CODE === service) {
      const regex = new RegExp(`(\/?)${service.toLocaleLowerCase()}`);
      this.props.history.push(url.replace(regex, ''));
    } else {
      window.location.href = url;
    }
  }

  listenNewNotification = () => {
    if (!window.socket) {
      setTimeout(() => {
        this.listenNewNotification();
      }, 3000);
      return;
    }
    if (window.socket) {
      window.socket.on('new_notification', data => {
        openNotification(data.messageType, () => { this.openUrl(data); }, data.title, data.content);
        if (parseInt(data.type) === 1 && parseInt(data.actionType) === 4) {
          return;
        }
        this.fetchNumberOfNotification();
        const newNumberOfNotification = parseInt(this.state.totalUnread) + 1;
        this.setState({
          totalUnread: newNumberOfNotification,
          totalUnreadText: newNumberOfNotification > 99 ? '99+' : newNumberOfNotification
        });
      });
    }
  };

  fetchNumberOfNotification = () => {
    const FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
    const HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
    const url = 'notifications/count-unread';
    fetchAPI({
      baseURL: HEADER_BACKEND,
      url,
      method: 'GET'
    }).then(res => {
      if (res.status !== 200 && res.status !== 304) {
        return;
      }
      this.setState({
        totalUnread: res.data.data.totalUnread ? res.data.data.totalUnread : 0,
        numberOfNotification: res.data.data.numberOfNotification ? res.data.data.numberOfNotification : 0,
        numberOfAnnouncement: res.data.data.numberOfAnnouncement ? res.data.data.numberOfAnnouncement : 0,
        totalUnreadText: res.data.data.totalUnread > 99 ? '99+' : res.data.data.totalUnread
      });
    }).catch(err => {
      console.error('fetchNumberOfNotification:', err);
    });
  };

  fetchService = () => {
    const FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
    const PORTAl_BACKEND = FWORK_API_ENDPOINT + '/portal';
    const url = '/get-service';
    return fetchAPI({
      baseURL: PORTAl_BACKEND,
      url,
      method: 'GET'
    });
  }

  fetchProjects = () => {
    const FWORK_DEVELOPER_API_ENDPOINT = process.env.FWORK_DEVELOPER_API_ENDPOINT || process.env.REACT_APP_FWORK_DEVELOPER_API_ENDPOINT;
    const DEVELOPER_BACKEND = FWORK_DEVELOPER_API_ENDPOINT || 'https://developer.fpt.work/api/v1';
    const url = '/projects';
    return fetchAPI({
      baseURL: DEVELOPER_BACKEND,
      url,
      method: 'GET'
    });
  };

  fetchExtendApp = () => {
    const FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
    const PORTAL_BACKEND = FWORK_API_ENDPOINT + '/portal';
    const url = '/extend-app';
    return fetchAPI({
      baseURL: PORTAL_BACKEND,
      url,
      method: 'GET'
    });
  };

  logout = () => {
    this.props.logoutUser();
  };


  handleServiceCustomize = (data, cmpId) => {
    const listService = [];
    data.find(el => {
      if (!el || el.onlyCompany) {
        return;
      }
      const data = el.onlyCompany.find(e => e.companyId === cmpId && e.status);
      if (data) {
        listService.push(el);
      }
    });
    return listService;
  };

  handleDataProject(def, store, service, customize, extendApp) {
    const { authUser } = this.props;
    let arrData = [];
    if (authUser.isLogged) {
      if (authUser.profile.role === 'super-admin' || authUser._id === authUser.company.represent) {
        arrData = def;
      }
    }
    const filtered = store.filter(item => {
      if (service.findIndex(elm => (elm.code === item.projectId && elm.status === true)) > -1) {
        return item;
      }
    });

    let serviceCustomize = [];
    if (authUser.isLogged) {
      serviceCustomize = this.handleServiceCustomize(customize, authUser.company._id);
    }
    arrData = [...arrData, ...filtered, ...serviceCustomize, ...extendApp];
    return arrData;
  }

  showMenu(data) {
    if (data) {
      const project = data.filter(e => e && e._id !== localStorage.getItem('id'));
      return project.map((item) => {
        return (
          <Col className="fwk-item" span={(data && data.length > 6) ? 12 : 12} key={item._id} >
            <a href={item.url}>
              <div className="fwork-menu-dropdown">
                <Avatar src={item.icon ? item.icon : LogoDefault} className="fwork-menu-dropdown-avatar" shape="square" size={48} />
                <div className="fwork-menu-dropdown-div">
                  <p className="fwork-menu-dropdown-p">{item.name}</p>
                  <p className="fwork-menu-dropdown-span">{item.description}</p>
                </div>
              </div>
            </a>

          </Col>
        );
      });
    } else {
      return '';
    }
  }

  showDrawer = () => {
    const { showDrw } = this.state;
    this.setState({
      action: !showDrw ? 'Profile' : '',
      showDrw: !showDrw
    });
  };

  showDrawerNotification = () => {
    const { showDrw } = this.state;
    this.setState({
      action: !showDrw ? 'Notification' : '',
      showDrw: !showDrw
    });
  };

  onClose = () => {
    this.setState({
      action: '',
      showDrw: false
    });
  };

  callback = (key) => {
    // eslint-disable-next-line no-console
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  myRef = React.createRef();

  handleClickInside = (e) => {
    if (!this.state.clickedOutside) {
      this.setState({
        showDropdown: !this.state.showDropdown,
        showDrw: false
      });
    } else {
      if (e.target && (e.target.classList.contains('fwork-mega-menu') || e.target.classList.contains('fwk-mega-icon'))) {
        const inputs = document.getElementById('fwk-menu-show').getElementsByTagName('input');
        for (let i = 0; i < inputs.length; ++i) {
          inputs[i].value = '';
        }
        this.setState({
          showDropdown: !this.state.showDropdown,
          clickedOutside: false,
          showDrw: false
        });
      } else {
        this.setState({
          showDropdown: true,
          showDrw: false
        });
      }
    }
  }

  handleClickOutside = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ clickedOutside: false, showDropdown: false });
    } else {
      this.setState({ clickedOutside: true });
    }
  };

  _markAsReadAll = () => {
    this.setState({
      numberOfNotification: 0,
      numberOfAnnouncement: 0,
      totalUnread: 0,
      totalUnreadText: ''
    });
  };

  _markAsRead = (type) => {
    const newNumberOfTotal = parseInt(this.state.totalUnread) - 1;
    if (type === 1) {
      const newNumberOfNotification = parseInt(this.state.numberOfNotification) - 1;
      this.setState({
        numberOfNotification: newNumberOfNotification,
        totalUnread: newNumberOfTotal,
        totalUnreadText: newNumberOfTotal > 99 ? '99+' : newNumberOfTotal
      });
    } else {
      const newNumberOfAnnouncement = parseInt(this.state.numberOfAnnouncement) - 1;
      this.setState({
        numberOfAnnouncement: newNumberOfAnnouncement,
        totalUnread: newNumberOfTotal,
        totalUnreadText: newNumberOfTotal > 99 ? '99+' : newNumberOfTotal
      });
    }
    // this.fetchNumberOfNotification();
  };

  handleSearch = (val) => {
    const { projects, stores, services } = this.state;
    // const DEVELOPER_BACKEND = process.env.DEVELOPER_BACKEND || 'https://developer.fpt.work/api/v1/';
    // const url = 'projects-by-owner';
    // return fetchAPI({
    //   baseURL: DEVELOPER_BACKEND,
    //   url,
    //   method: 'GET',
    //   params: { search: val }

    // });
    const dataPrj = this.handleDataProject(projects, stores, services);
    let suggestions = [];
    if (val.trim().length > 0) {
      suggestions = dataPrj.filter(
        sug => sug.name.toLowerCase().indexOf(val.toLowerCase()) > -1
      );
      this.setState({
        search: true,
        listDataProject: suggestions
      });
    } else {
      this.setState({
        search: false,
        listDataProject: []
      });
    }
  }

  handleClickHomePage = () => {
    window.location.href = '/';
  }

  handleLinkHome = () => {
    this.props.history.push('/');
  }

  handleCallBackCreate = () => {
    if (this.props.linkCreate) {
      this.props.history.push(this.props.linkCreate);
    } else {
      if (this.props.callbackCreate) {
        this.props.callbackCreate();
      }
    }
  }

  // handleClickCreateNew = (url) => {
  //   this.props.history.push(url);
  // }

  // eslint-disable-next-line no-console
  render() {
    const { projects, totalUnreadText, stores, services, action, showDrw, customize, extendApp } = this.state;
    const { authUser, colorService, logo, linkCreate, linkHelp, callbackCreate } = this.props;
    let dataPrj = [];
    if (this.state.listDataProject.length === 0 && !this.state.search) {
      dataPrj = this.handleDataProject(projects, stores, services, customize, extendApp);
    } else {
      dataPrj = this.state.listDataProject;
    }

    return (
      <div style={{ position: 'fixed', top: 0, zIndex: 10000, width: '100%' }}>
        <Layout>
          <div className="fwork-header-portal" style={{ background: colorService }}>
            <div className="fwork-header-logo" onClick={this.handleLinkHome}>
              <img style={{ cursor: 'pointer' }} src={logo ? logo : LogoFWDEV} alt="logo" />
              {/* {titleService} */}
            </div>
            <div style={{
              display: 'flex',
              position: 'absolute',
              right: 24
            }}>
              <div className="fwork-header-action">
                <Tooltip placement="bottom" title={i18n.t('Thông báo')} overlayClassName="fwk-tooltip-header">
                  <div className={(action === 'Notification' && showDrw) ? 'fwork-header-notification fwork-header-notification-active' : 'fwork-header-notification'}>
                    <a onClick={this.showDrawerNotification} style={{ padding: '0px 0px 0px 10px' }}>
                      <img src={IconNotification} />
                      {/* <mark><p>12</p></mark> */}
                      {totalUnreadText ? (<mark><p>{totalUnreadText}</p></mark>) : null}
                    </a>
                  </div>
                </Tooltip>

                <Tooltip placement="bottom" title={i18n.t('Trợ giúp')} overlayClassName="fwk-tooltip-header">
                  <div className="fwork-header-help" style={{ lineHeight: '45px' }}>
                    <a style={{ padding: '0px 16px' }} href={linkHelp ? `https://support.fpt.work/service${linkHelp}` : 'https://support.fpt.work/'} target='_blank'>
                      <img src={IconHelp} />
                    </a>
                  </div>
                </Tooltip>
                <div id="fwork-show-list" className="fwork-header-avatar">
                  <div className={action === 'Profile' && showDrw ? 'fwork-profile fwork-profile-active' : 'fwork-profile'} onClick={this.showDrawer}>
                    <div className="fwork-profile-image">
                      {authUser.isLogged && authUser.profile && authUser.profile.avatar
                        ? (<img
                          src={authUser.profile.avatar}
                          alt="Avatar" />) : (
                          <Avatar>{authUser.isLogged ? authUser.profile.firstName[0].toUpperCase() + authUser.profile.lastName[0].toUpperCase() : 'A'}</Avatar>
                        )}
                    </div>
                  </div>
                </div>
                <ul className="fwork-main-nav">
                  <li className={this.state.showDropdown ? 'fwork-top-level-link fwk-list-drp' : 'fwork-top-level-link'} ref={this.myRef} id="fwk-menu-show" onClick={this.handleClickInside}>
                    <Tooltip placement="bottom" title={i18n.t('Ứng dụng')} overlayClassName="fwk-tooltip-header">
                      <span className="fwork-mega-menu"><img className="fwk-mega-icon" src={IconMenu} alt="icon" /></span>
                    </Tooltip>
                    <div style={{ width: (projects && projects.length > 6) ? '500px' : '500px' }}
                      className="fwork-dropdown-menu-block" id="fwk-inside-drp" >
                      <div className="row">
                        <div className="fwork-list-prj">
                          <Row type="flex" justify="start" gutter={24}>
                            <Col span={24}>
                              <div className="fwork-search-header">
                                <img src={IconHomeSearch} />
                                <p className="fwork-search-p-header" onClick={this.handleClickHomePage}>Services Portal
                                  <span className="fwork-search-span-header">{dataPrj ? dataPrj.length : 0} {i18n.t('Ứng dụng đã cài đặt')}</span></p>
                              </div>
                              <Search
                                className="fwork-search-input-header"
                                placeholder={i18n.t('Tìm kiếm ứng dụng')}
                                onChange={e => {
                                  this.handleSearch(e.target.value);
                                }}
                                style={{ height: 32, marginBottom: 16 }}
                              />
                            </Col>
                            <div className="fwk-item-prj">
                              {this.showMenu(dataPrj)}
                            </div>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <Tooltip placement="bottomRight" title='Fwork Portal' overlayClassName="fwk-tooltip-header">
                  <div className="fwork-header-home" style={{ lineHeight: '48px' }}>
                    <div className="fwk-opacity"> </div>
                    <a className="fwk-link-home" style={{ padding: '0px 10px' }} onClick={this.handleClickHomePage}>
                      <img src={IconHome} />
                    </a>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </Layout>
        {this.state.action === 'Profile' ? (
          <DrawerProfile
            onClose={this.onClose}
            visible={this.state.showDrw}
            logout={this.props.logoutUser}
            authUser={this.props.authUser}
            history={this.props.history}
          />
        ) : (
            <DrawerNotification
              markAsRead={this._markAsRead}
              markAsReadAll={this._markAsReadAll}
              onClose={this.onClose}
              visible={this.state.showDrw}
              action={this.state.action}
              numberOfNotification={this.state.numberOfNotification}
              numberOfAnnouncement={this.state.numberOfAnnouncement}
              callback={this.callback}
              history={this.props.history}
              notifications={this.state.notifications}
            />
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authUser } = state;
  return {
    authUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCustom);
