'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../scss/header.scss');

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _logo = require('../assets/icons/logo3.svg');

var _logo2 = _interopRequireDefault(_logo);

require('../lang/i18n');

var _antd = require('antd');

var _reactRedux = require('react-redux');

var _icon_menu = require('../assets/icons/icon_menu.svg');

var _icon_menu2 = _interopRequireDefault(_icon_menu);

var _icon_notification = require('../assets/icons/icon_notification.svg');

var _icon_notification2 = _interopRequireDefault(_icon_notification);

var _DrawerProfile = require('../components/Drawer/DrawerProfile');

var _DrawerProfile2 = _interopRequireDefault(_DrawerProfile);

var _DrawerNotification = require('../components/Drawer/DrawerNotification');

var _DrawerNotification2 = _interopRequireDefault(_DrawerNotification);

var _iconLgFwork = require('../assets/images/icon-lg-fwork.jpg');

var _iconLgFwork2 = _interopRequireDefault(_iconLgFwork);

var _icon_help = require('../assets/icons/icon_help.svg');

var _icon_help2 = _interopRequireDefault(_icon_help);

var _iconPlus = require('../assets/icons/icon-plus.svg');

var _iconPlus2 = _interopRequireDefault(_iconPlus);

var _notification = require('./notification');

var _iconHome = require('../assets/icons/icon-home.svg');

var _iconHome2 = _interopRequireDefault(_iconHome);

var _iconHomeSearch = require('../assets/icons/icon-home-search.svg');

var _iconHomeSearch2 = _interopRequireDefault(_iconHomeSearch);

var _frontendHelper = require('@fwork/frontend-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/jsx-no-target-blank */
/* eslint-disable linebreak-style */


var Search = _antd.Input.Search;

var HeaderCustom = function (_React$Component) {
  _inherits(HeaderCustom, _React$Component);

  function HeaderCustom(props) {
    _classCallCheck(this, HeaderCustom);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.openUrl = function (_ref) {
      var url = _ref.url,
          service = _ref.service,
          resource = _ref.resource,
          code = _ref.code;

      if (service === 'announcement') {
        return _this.openUrlAnnoucement(url);
      }
      if (url) {
        return _this.redirect(url);
      }
      if (!service || !resource || !code) {
        return;
      }
      url = '/' + service.toLocaleLowerCase() + '/' + resource + '/' + code;
      _this.redirect(url, service);
    };

    _this.openUrlAnnoucement = function (url) {
      if (url) {
        var newUrl = url;
        if (url.slice(0, 4) !== 'http') {
          newUrl = 'http://' + url;
        }
        window.open(newUrl);
      }
    };

    _this.listenNewNotification = function () {
      if (!window.socket) {
        setTimeout(function () {
          _this.listenNewNotification();
        }, 3000);
        return;
      }
      if (window.socket) {
        window.socket.on('new_notification', function (data) {
          (0, _notification.openNotification)(data.messageType, function () {
            _this.openUrl(data);
          }, data.title, data.content);
          if (parseInt(data.type) === 1 && parseInt(data.actionType) === 4) {
            return;
          }
          _this.fetchNumberOfNotification();
          var newNumberOfNotification = parseInt(_this.state.totalUnread) + 1;
          _this.setState({
            totalUnread: newNumberOfNotification,
            totalUnreadText: newNumberOfNotification > 99 ? '99+' : newNumberOfNotification
          });
        });
      }
    };

    _this.fetchNumberOfNotification = function () {
      var FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
      var HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
      var url = 'notifications/count-unread';
      (0, _frontendHelper.fetchAPI)({
        baseURL: HEADER_BACKEND,
        url: url,
        method: 'GET'
      }).then(function (res) {
        if (res.status !== 200 && res.status !== 304) {
          return;
        }
        _this.setState({
          totalUnread: res.data.data.totalUnread ? res.data.data.totalUnread : 0,
          numberOfNotification: res.data.data.numberOfNotification ? res.data.data.numberOfNotification : 0,
          numberOfAnnouncement: res.data.data.numberOfAnnouncement ? res.data.data.numberOfAnnouncement : 0,
          totalUnreadText: res.data.data.totalUnread > 99 ? '99+' : res.data.data.totalUnread
        });
      }).catch(function (err) {
        console.error('fetchNumberOfNotification:', err);
      });
    };

    _this.fetchService = function () {
      var FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
      var PORTAl_BACKEND = FWORK_API_ENDPOINT + '/portal';
      var url = '/get-service';
      return (0, _frontendHelper.fetchAPI)({
        baseURL: PORTAl_BACKEND,
        url: url,
        method: 'GET'
      });
    };

    _this.fetchProjects = function () {
      var FWORK_DEVELOPER_API_ENDPOINT = process.env.FWORK_DEVELOPER_API_ENDPOINT || process.env.REACT_APP_FWORK_DEVELOPER_API_ENDPOINT;
      var DEVELOPER_BACKEND = FWORK_DEVELOPER_API_ENDPOINT || 'https://developer.fpt.work/api/v1';
      var url = '/projects';
      return (0, _frontendHelper.fetchAPI)({
        baseURL: DEVELOPER_BACKEND,
        url: url,
        method: 'GET'
      });
    };

    _this.fetchExtendApp = function () {
      var FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
      var PORTAL_BACKEND = FWORK_API_ENDPOINT + '/portal';
      var url = '/extend-app';
      return (0, _frontendHelper.fetchAPI)({
        baseURL: PORTAL_BACKEND,
        url: url,
        method: 'GET'
      });
    };

    _this.logout = function () {
      _this.props.logoutUser();
    };

    _this.handleServiceCustomize = function (data, cmpId) {
      var listService = [];
      data.find(function (el) {
        if (!el || el.onlyCompany) {
          return;
        }
        var data = el.onlyCompany.find(function (e) {
          return e.companyId === cmpId && e.status;
        });
        if (data) {
          listService.push(el);
        }
      });
      return listService;
    };

    _this.showDrawer = function () {
      var showDrw = _this.state.showDrw;

      _this.setState({
        action: !showDrw ? 'Profile' : '',
        showDrw: !showDrw
      });
    };

    _this.showDrawerNotification = function () {
      var showDrw = _this.state.showDrw;

      _this.setState({
        action: !showDrw ? 'Notification' : '',
        showDrw: !showDrw
      });
    };

    _this.onClose = function () {
      _this.setState({
        action: '',
        showDrw: false
      });
    };

    _this.callback = function (key) {
      // eslint-disable-next-line no-console
    };

    _this.myRef = _react2.default.createRef();

    _this.handleClickInside = function (e) {
      if (!_this.state.clickedOutside) {
        _this.setState({
          showDropdown: !_this.state.showDropdown,
          showDrw: false
        });
      } else {
        if (e.target && (e.target.classList.contains('fwork-mega-menu') || e.target.classList.contains('fwk-mega-icon'))) {
          var inputs = document.getElementById('fwk-menu-show').getElementsByTagName('input');
          for (var i = 0; i < inputs.length; ++i) {
            inputs[i].value = '';
          }
          _this.setState({
            showDropdown: !_this.state.showDropdown,
            clickedOutside: false,
            showDrw: false
          });
        } else {
          _this.setState({
            showDropdown: true,
            showDrw: false
          });
        }
      }
    };

    _this.handleClickOutside = function (e) {
      if (!_this.myRef.current.contains(e.target)) {
        _this.setState({ clickedOutside: false, showDropdown: false });
      } else {
        _this.setState({ clickedOutside: true });
      }
    };

    _this._markAsReadAll = function () {
      _this.setState({
        numberOfNotification: 0,
        numberOfAnnouncement: 0,
        totalUnread: 0,
        totalUnreadText: ''
      });
    };

    _this._markAsRead = function (type) {
      var newNumberOfTotal = parseInt(_this.state.totalUnread) - 1;
      if (type === 1) {
        var newNumberOfNotification = parseInt(_this.state.numberOfNotification) - 1;
        _this.setState({
          numberOfNotification: newNumberOfNotification,
          totalUnread: newNumberOfTotal,
          totalUnreadText: newNumberOfTotal > 99 ? '99+' : newNumberOfTotal
        });
      } else {
        var newNumberOfAnnouncement = parseInt(_this.state.numberOfAnnouncement) - 1;
        _this.setState({
          numberOfAnnouncement: newNumberOfAnnouncement,
          totalUnread: newNumberOfTotal,
          totalUnreadText: newNumberOfTotal > 99 ? '99+' : newNumberOfTotal
        });
      }
      // this.fetchNumberOfNotification();
    };

    _this.handleSearch = function (val) {
      var _this$state = _this.state,
          projects = _this$state.projects,
          stores = _this$state.stores,
          services = _this$state.services;
      // const DEVELOPER_BACKEND = process.env.DEVELOPER_BACKEND || 'https://developer.fpt.work/api/v1/';
      // const url = 'projects-by-owner';
      // return fetchAPI({
      //   baseURL: DEVELOPER_BACKEND,
      //   url,
      //   method: 'GET',
      //   params: { search: val }

      // });

      var dataPrj = _this.handleDataProject(projects, stores, services);
      var suggestions = [];
      if (val.trim().length > 0) {
        suggestions = dataPrj.filter(function (sug) {
          return sug.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        _this.setState({
          search: true,
          listDataProject: suggestions
        });
      } else {
        _this.setState({
          search: false,
          listDataProject: []
        });
      }
    };

    _this.handleClickHomePage = function () {
      window.location.href = '/';
    };

    _this.handleLinkHome = function () {
      _this.props.history.push('/');
    };

    _this.handleCallBackCreate = function () {
      if (_this.props.linkCreate) {
        _this.props.history.push(_this.props.linkCreate);
      } else {
        if (_this.props.callbackCreate) {
          _this.props.callbackCreate();
        }
      }
    };

    _this.state = {
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

    return _this;
  }

  HeaderCustom.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.listenNewNotification();
    this.fetchNumberOfNotification();
    this.fetchExtendApp().then(function (res) {
      var appExtend = res.data.data;
      if (appExtend && appExtend.length <= 0) return;
      _this2.setState({
        extendApp: appExtend
      });
    }).catch(function (err) {
      console.error('err fetchServiceExtend: ', err);
    });
    this.fetchProjects().then(function (res) {
      var project = res.data.result;
      if (project && project.length <= 0) return;
      _this2.setState({
        projects: project.filter(function (item) {
          return item.default;
        }),
        stores: project.filter(function (item) {
          return item.store;
        }),
        customize: project.filter(function (item) {
          return item.customize;
        })
      });
    }).catch(function (err) {
      console.error('err fetchProjects: ', err);
    });
    this.fetchService().then(function (res) {
      var service = res.data.data;
      // if (services.length <= 0) return;
      _this2.setState({
        services: service
      });
    }).catch(function (err) {
      console.error('err fetchService: ', err);
    });
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  HeaderCustom.prototype.redirect = function redirect(url, service) {
    if (process.env.PROJECT_CODE === service) {
      var regex = new RegExp('(/?)' + service.toLocaleLowerCase());
      this.props.history.push(url.replace(regex, ''));
    } else {
      window.location.href = url;
    }
  };

  HeaderCustom.prototype.handleDataProject = function handleDataProject(def, store, service, customize, extendApp) {
    var authUser = this.props.authUser;

    var arrData = [];
    if (authUser.isLogged) {
      if (authUser.profile.role === 'super-admin' || authUser._id === authUser.company.represent) {
        arrData = def;
      }
    }
    var filtered = store.filter(function (item) {
      if (service.findIndex(function (elm) {
        return elm.code === item.projectId && elm.status === true;
      }) > -1) {
        return item;
      }
    });

    var serviceCustomize = [];
    if (authUser.isLogged) {
      serviceCustomize = this.handleServiceCustomize(customize, authUser.company._id);
    }
    arrData = [].concat(arrData, filtered, serviceCustomize, extendApp);
    return arrData;
  };

  HeaderCustom.prototype.showMenu = function showMenu(data) {
    if (data) {
      var project = data.filter(function (e) {
        return e && e._id !== localStorage.getItem('id');
      });
      return project.map(function (item) {
        return _react2.default.createElement(
          _antd.Col,
          { className: 'fwk-item', span: data && data.length > 6 ? 12 : 12, key: item._id },
          _react2.default.createElement(
            'a',
            { href: item.url },
            _react2.default.createElement(
              'div',
              { className: 'fwork-menu-dropdown' },
              _react2.default.createElement(_antd.Avatar, { src: item.icon ? item.icon : _iconLgFwork2.default, className: 'fwork-menu-dropdown-avatar', shape: 'square', size: 48 }),
              _react2.default.createElement(
                'div',
                { className: 'fwork-menu-dropdown-div' },
                _react2.default.createElement(
                  'p',
                  { className: 'fwork-menu-dropdown-p' },
                  item.name
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'fwork-menu-dropdown-span' },
                  item.description
                )
              )
            )
          )
        );
      });
    } else {
      return '';
    }
  };

  HeaderCustom.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  // handleClickCreateNew = (url) => {
  //   this.props.history.push(url);
  // }

  // eslint-disable-next-line no-console
  HeaderCustom.prototype.render = function render() {
    var _this3 = this;

    var _state = this.state,
        projects = _state.projects,
        totalUnreadText = _state.totalUnreadText,
        stores = _state.stores,
        services = _state.services,
        action = _state.action,
        showDrw = _state.showDrw,
        customize = _state.customize,
        extendApp = _state.extendApp;
    var _props = this.props,
        authUser = _props.authUser,
        colorService = _props.colorService,
        logo = _props.logo,
        linkCreate = _props.linkCreate,
        linkHelp = _props.linkHelp,
        callbackCreate = _props.callbackCreate;

    var dataPrj = [];
    if (this.state.listDataProject.length === 0 && !this.state.search) {
      dataPrj = this.handleDataProject(projects, stores, services, customize, extendApp);
    } else {
      dataPrj = this.state.listDataProject;
    }

    return _react2.default.createElement(
      'div',
      { style: { position: 'fixed', top: 0, zIndex: 10000, width: '100%' } },
      _react2.default.createElement(
        _antd.Layout,
        null,
        _react2.default.createElement(
          'div',
          { className: 'fwork-header-portal', style: { background: colorService } },
          _react2.default.createElement(
            'div',
            { className: 'fwork-header-logo', onClick: this.handleLinkHome },
            _react2.default.createElement('img', { style: { cursor: 'pointer' }, src: logo ? logo : _logo2.default, alt: 'logo' })
          ),
          _react2.default.createElement(
            'div',
            { style: {
                display: 'flex',
                position: 'absolute',
                right: 24
              } },
            
            _react2.default.createElement(
              'div',
              { className: 'fwork-header-action' },
              _react2.default.createElement(
                _antd.Tooltip,
                { placement: 'bottom', title: _i18next2.default.t('Thông báo'), overlayClassName: 'fwk-tooltip-header' },
                _react2.default.createElement(
                  'div',
                  { className: action === 'Notification' && showDrw ? 'fwork-header-notification fwork-header-notification-active' : 'fwork-header-notification' },
                  _react2.default.createElement(
                    'a',
                    { onClick: this.showDrawerNotification, style: { padding: '0px 0px 0px 10px' } },
                    _react2.default.createElement('img', { src: _icon_notification2.default }),
                    totalUnreadText ? _react2.default.createElement(
                      'mark',
                      null,
                      _react2.default.createElement(
                        'p',
                        null,
                        totalUnreadText
                      )
                    ) : null
                  )
                )
              ),
              _react2.default.createElement(
                _antd.Tooltip,
                { placement: 'bottom', title: _i18next2.default.t('Trợ giúp'), overlayClassName: 'fwk-tooltip-header' },
                _react2.default.createElement(
                  'div',
                  { className: 'fwork-header-help', style: { lineHeight: '45px' } },
                  _react2.default.createElement(
                    'a',
                    { style: { padding: '0px 16px' }, href: linkHelp ? 'https://support.fpt.work/service' + linkHelp : 'https://support.fpt.work/', target: '_blank' },
                    _react2.default.createElement('img', { src: _icon_help2.default })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { id: 'fwork-show-list', className: 'fwork-header-avatar' },
                _react2.default.createElement(
                  'div',
                  { className: action === 'Profile' && showDrw ? 'fwork-profile fwork-profile-active' : 'fwork-profile', onClick: this.showDrawer },
                  _react2.default.createElement(
                    'div',
                    { className: 'fwork-profile-image' },
                    authUser.isLogged && authUser.profile && authUser.profile.avatar ? _react2.default.createElement('img', {
                      src: authUser.profile.avatar,
                      alt: 'Avatar' }) : _react2.default.createElement(
                      _antd.Avatar,
                      null,
                      authUser.isLogged ? authUser.profile.firstName[0].toUpperCase() + authUser.profile.lastName[0].toUpperCase() : 'A'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'ul',
                { className: 'fwork-main-nav' },
                _react2.default.createElement(
                  'li',
                  { className: this.state.showDropdown ? 'fwork-top-level-link fwk-list-drp' : 'fwork-top-level-link', ref: this.myRef, id: 'fwk-menu-show', onClick: this.handleClickInside },
                  _react2.default.createElement(
                    _antd.Tooltip,
                    { placement: 'bottom', title: _i18next2.default.t('Ứng dụng'), overlayClassName: 'fwk-tooltip-header' },
                    _react2.default.createElement(
                      'span',
                      { className: 'fwork-mega-menu' },
                      _react2.default.createElement('img', { className: 'fwk-mega-icon', src: _icon_menu2.default, alt: 'icon' })
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { style: { width: projects && projects.length > 6 ? '500px' : '500px' },
                      className: 'fwork-dropdown-menu-block', id: 'fwk-inside-drp' },
                    _react2.default.createElement(
                      'div',
                      { className: 'row' },
                      _react2.default.createElement(
                        'div',
                        { className: 'fwork-list-prj' },
                        _react2.default.createElement(
                          _antd.Row,
                          { type: 'flex', justify: 'start', gutter: 24 },
                          _react2.default.createElement(
                            _antd.Col,
                            { span: 24 },
                            _react2.default.createElement(
                              'div',
                              { className: 'fwork-search-header' },
                              _react2.default.createElement('img', { src: _iconHomeSearch2.default }),
                              _react2.default.createElement(
                                'p',
                                { className: 'fwork-search-p-header', onClick: this.handleClickHomePage },
                                'Services Portal',
                                _react2.default.createElement(
                                  'span',
                                  { className: 'fwork-search-span-header' },
                                  dataPrj ? dataPrj.length : 0,
                                  ' ',
                                  _i18next2.default.t('Ứng dụng đã cài đặt')
                                )
                              )
                            ),
                            _react2.default.createElement(Search, {
                              className: 'fwork-search-input-header',
                              placeholder: _i18next2.default.t('Tìm kiếm ứng dụng'),
                              onChange: function onChange(e) {
                                _this3.handleSearch(e.target.value);
                              },
                              style: { height: 32, marginBottom: 16 }
                            })
                          ),
                          _react2.default.createElement(
                            'div',
                            { className: 'fwk-item-prj' },
                            this.showMenu(dataPrj)
                          )
                        )
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                _antd.Tooltip,
                { placement: 'bottomRight', title: 'Fwork Portal', overlayClassName: 'fwk-tooltip-header' },
                _react2.default.createElement(
                  'div',
                  { className: 'fwork-header-home', style: { lineHeight: '48px' } },
                  _react2.default.createElement(
                    'div',
                    { className: 'fwk-opacity' },
                    ' '
                  ),
                  _react2.default.createElement(
                    'a',
                    { className: 'fwk-link-home', style: { padding: '0px 10px' }, onClick: this.handleClickHomePage },
                    _react2.default.createElement('img', { src: _iconHome2.default })
                  )
                )
              )
            )
          )
        )
      ),
      this.state.action === 'Profile' ? _react2.default.createElement(_DrawerProfile2.default, {
        onClose: this.onClose,
        visible: this.state.showDrw,
        logout: this.props.logoutUser,
        authUser: this.props.authUser,
        history: this.props.history
      }) : _react2.default.createElement(_DrawerNotification2.default, {
        markAsRead: this._markAsRead,
        markAsReadAll: this._markAsReadAll,
        onClose: this.onClose,
        visible: this.state.showDrw,
        action: this.state.action,
        numberOfNotification: this.state.numberOfNotification,
        numberOfAnnouncement: this.state.numberOfAnnouncement,
        callback: this.callback,
        history: this.props.history,
        notifications: this.state.notifications
      })
    );
  };

  return HeaderCustom;
}(_react2.default.Component);

function mapStateToProps(state) {
  var authUser = state.authUser;

  return {
    authUser: authUser
  };
}

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    logoutUser: function logoutUser() {
      return dispatch((0, _frontendHelper.logout)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(HeaderCustom);
module.exports = exports['default'];