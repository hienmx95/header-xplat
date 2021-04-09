'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _Logout = require('../icon/Logout');

var _Logout2 = _interopRequireDefault(_Logout);

var _padlock = require('../../assets/icons/padlock.svg');

var _padlock2 = _interopRequireDefault(_padlock);

var _World = require('../../assets/icons/World.svg');

var _World2 = _interopRequireDefault(_World);

var _swap = require('../../assets/icons/swap.svg');

var _swap2 = _interopRequireDefault(_swap);

var _ModalChooseCompany = require('../Modal/ModalChooseCompany');

var _ModalChooseCompany2 = _interopRequireDefault(_ModalChooseCompany);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _frontendHelper = require('@fwork/frontend-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable linebreak-style */


var Option = _antd.Select.Option;

var DrawerProfile = function (_React$Component) {
  _inherits(DrawerProfile, _React$Component);

  function DrawerProfile(props) {
    _classCallCheck(this, DrawerProfile);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.showModal = function () {
      _this.setState({
        visibleModal: true
      });
    };

    _this.handleSave = function () {
      _this.setState({
        visibleModal: false
      });
    };

    _this.handleCancel = function () {
      _this.setState({
        visibleModal: false
      });
    };

    _this.saveFormRef = function (formRef) {
      _this.formRef = formRef;
    };

    _this.handleChangeLang = function (value) {
      var FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
      var HEADER_BACKEND = FWORK_API_ENDPOINT + '/header';
      var url = 'setting';
      (0, _frontendHelper.fetchAPI)({
        baseURL: HEADER_BACKEND,
        url: url,
        method: 'PUT',
        body: {
          lng: value
        }
      }).then(function () {
        localStorage.setItem('lng', value);
        window.location.reload();
      }).catch(function (err) {
        console.error('handleChangeLang:', err);
      });
    };

    _this.gotoSetting = function () {
      var firstPath = window.location.pathname.split('/')[1];
      if (firstPath && firstPath === 'app-menu') {
        _this.props.history.push('/profile');
      } else {
        window.location.href = '/profile' || 'http://fpt.work/profile';
      }
    };

    _this.onChangeDarkMode = function (value) {
      var url = 'setting';
      var FWORK_API_ENDPOINT = process.env.FWORK_API_ENDPOINT || process.env.REACT_APP_FWORK_API_ENDPOINT;
      (0, _frontendHelper.fetchAPI)({
        baseURL: FWORK_API_ENDPOINT + '/header',
        url: url,
        method: 'PUT',
        body: {
          darkMode: value
        }
      }).then(function () {
        // eslint-disable-next-line no-console
      }).catch(function (err) {
        console.error('handleChangeLang:', err);
      });
    };

    _this.handleHover = function () {
      _this.setState(function (prevState) {
        return {
          isHovered: !prevState.isHovered
        };
      });
    };

    _this.state = {
      lang: localStorage.getItem('lng') || 'en',
      darkMode: false,
      visibleModal: false
    };
    return _this;
  }

  DrawerProfile.prototype.componentDidMount = function componentDidMount() {
    var authUser = this.props.authUser;

    if (authUser.setting) {
      this.setState({
        lang: authUser.setting.lng,
        darkMode: authUser.setting.darkMode
      });
      // if (authUser.setting.lng && authUser.setting.lng !== this.state.lang) {
      //   localStorage.setItem('lng', authUser.setting.lng);
      //   window.location.reload();
      // }
    }
  };

  DrawerProfile.prototype.render = function render() {
    var _props = this.props,
        visible = _props.visible,
        onClose = _props.onClose,
        logout = _props.logout,
        authUser = _props.authUser;

    var btnClass = this.state.isHovered ? 'fwork-header-active ' : '';
    var company = !authUser.loading && authUser.isLogged ? authUser.company : null;
    var profile = !authUser.loading && authUser.isLogged ? authUser.profile : null;
    return _react2.default.createElement(
      _antd.Drawer,
      {
        className: 'drawer-profile',
        placement: 'right',
        closable: true,
        width: 384,
        onClose: onClose,
        visible: visible
      },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: btnClass + 'fwork-title-profile' },
          _react2.default.createElement(
            'div',
            { className: 'icon-logout', onClick: logout, onMouseEnter: this.handleHover, onMouseLeave: this.handleHover },
            _react2.default.createElement(_Logout2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'text-logout', onClick: logout, onMouseEnter: this.handleHover, onMouseLeave: this.handleHover },
            _i18next2.default.t('Đăng xuất')
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'fwork-profile-drawer' },
          _react2.default.createElement(
            'div',
            { className: 'fwork-profile-image-drawer' },
            !authUser.loading && authUser.isLogged && profile.avatar ? _react2.default.createElement('img', {
              src: profile.avatar,
              style: { margin: '0 auto' },
              alt: 'Avatar' }) : _react2.default.createElement(
              _antd.Avatar,
              { className: 'fwk-no-avatar', size: 40 },
              authUser.isLogged ? authUser.profile.firstName[0].toUpperCase() + authUser.profile.lastName[0].toUpperCase() : 'F'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'fwork-profile-info' },
            _react2.default.createElement(
              'p',
              { className: 'fwork-profile-name' },
              !authUser.loading && authUser.isLogged ? profile.lastName + ' ' + profile.firstName : null
            ),
            _react2.default.createElement(
              'p',
              { className: 'fwork-profile-email' },
              !authUser.loading && authUser.isLogged ? authUser.email : null
            ),
            _react2.default.createElement(
              'p',
              { className: 'fwork-profile-job' },
              !authUser.loading && authUser.isLogged ? profile.title ? company.name + ' - ' + profile.title : company.name : null
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'fwork-profile-account' },
          _react2.default.createElement(
            'div',
            { className: 'fwork-profile-account-list' },
            _react2.default.createElement('img', { src: _padlock2.default, alt: 'user-setting' }),
            _react2.default.createElement(
              'p',
              { onClick: this.gotoSetting, className: 'cursor-pointer' },
              _i18next2.default.t('Thiết lập thông tin')
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'fwork-profile-account-list' },
            _react2.default.createElement('img', { src: _swap2.default, alt: 'switch-company' }),
            _react2.default.createElement(
              'p',
              { onClick: this.showModal, className: 'cursor-pointer' },
              _i18next2.default.t('Chuyển công ty')
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'fwork-profile-account-list' },
            _react2.default.createElement('img', { src: _World2.default, alt: 'language' }),
            _react2.default.createElement(
              'div',
              { className: 'select-lang' },
              _react2.default.createElement(
                'span',
                null,
                _i18next2.default.t('Ngôn ngữ'),
                ' :'
              ),
              _react2.default.createElement(
                _antd.Select,
                { className: 'select-language', defaultValue: this.state.lang, onChange: this.handleChangeLang },
                _react2.default.createElement(
                  Option,
                  { value: 'vi', className: 'language' },
                  'Tiếng Việt'
                ),
                _react2.default.createElement(
                  Option,
                  { value: 'en', className: 'language' },
                  'English'
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'fwork-profile-footer' },
          _react2.default.createElement(
            'p',
            { className: 'fwork-profile-footer-p' },
            _i18next2.default.t('Trợ giúp')
          ),
          _react2.default.createElement(
            'p',
            { className: 'fwork-profile-footer-content' },
            _i18next2.default.t('Cung cấp thông tin cơ bản hay chuyên sâu về hệ thống. Bạn có thể tìm hiểu thông qua hướng dẫn sử dụng, câu hỏi Q&A, video...')
          ),
          _react2.default.createElement(
            _antd.Button,
            { className: 'fwork-profile-footer-btn', type: 'danger', ghost: true },
            _i18next2.default.t('Tìm hiểu ngay')
          )
        )
      ),
      _react2.default.createElement(_ModalChooseCompany2.default, {
        wrappedComponentRef: this.saveFormRef,
        visible: this.state.visibleModal,
        handleSave: this.handleSave,
        handleCancel: this.handleCancel
      })
    );
  };

  return DrawerProfile;
}(_react2.default.Component);

var _DrawerProfile = _antd.Form.create({ name: 'form_drawer_profile' })(DrawerProfile);
exports.default = _DrawerProfile;
module.exports = exports['default'];