'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _frontendHelper = require('@fwork/frontend-helper');

var _antd = require('antd');

require('../../scss/company.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalChooseCompany = function (_React$Component) {
  _inherits(ModalChooseCompany, _React$Component);

  function ModalChooseCompany(props) {
    _classCallCheck(this, ModalChooseCompany);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onCheckBox = function (e) {
      _this.setState({
        defaultCompany: e.target.checked
      });
    };

    _this.handleSubmit = function () {
      if (!_this.state.companyId) return null;
      var params = {
        companyId: _this.state.companyId,
        defaultCompany: _this.state.defaultCompany
      };
      _this.props.submitChooseCompany(params);
    };

    _this.selectCompany = function (id) {
      var companyId = _this.state.companyId;

      if (id !== companyId) {
        _this.setState({
          companyId: id
        });
      }
    };

    _this.state = {
      defaultCompany: false,
      companyId: ''
    };
    return _this;
  }

  ModalChooseCompany.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        visible = _props.visible,
        handleSave = _props.handleSave,
        handleCancel = _props.handleCancel,
        authUser = _props.authUser;
    var _state = this.state,
        defaultCompany = _state.defaultCompany,
        companyId = _state.companyId;

    var owner = authUser.companies.findIndex(function (item) {
      return item.company.represent === authUser._id;
    });
    return _react2.default.createElement(
      _antd.Modal,
      {
        footer: null,
        width: '448px',
        title: '\u0110\u1ED5i c\xF4ng ty',
        visible: visible,
        onOk: handleSave,
        onCancel: handleCancel,
        className: 'fwork-modal'
      },
      _react2.default.createElement(
        'div',
        { className: 'fwork-switch-company fwork-modal-company' },
        _react2.default.createElement(
          _antd.Row,
          { type: 'flex', gutter: 24, style: { height: '100%', margin: 0 } },
          _react2.default.createElement(
            _antd.Col,
            { className: 'fwork-login-form' },
            _react2.default.createElement(
              'div',
              { className: 'fwork-login' },
              _react2.default.createElement(
                'div',
                { className: 'fwork-company' },
                _react2.default.createElement(
                  'div',
                  null,
                  (authUser.companies && authUser.companies.length) > 0 ? authUser.companies.filter(function (item) {
                    return item.status === 'enabled' && item.verifyEmailStatus === 'verified';
                  }).map(function (item, index) {
                    var company = item.company;
                    var classDefault = !companyId ? authUser.company._id === company._id ? 'choose-default' : null : companyId === company._id ? 'choose-default' : null;
                    return _react2.default.createElement(
                      _antd.Row,
                      { key: index, className: 'fwork-company-checked ' + classDefault, onClick: function onClick() {
                          return _this2.selectCompany(company._id);
                        }, gutter: 24, type: 'flex', align: 'middle' },
                      _react2.default.createElement(
                        _antd.Col,
                        { span: 5, style: { width: 80, height: 80, padding: 0 } },
                        _react2.default.createElement('img', { style: { width: 80, height: 80, borderRadius: 4 }, src: 'https://cdn6.aptoide.com/imgs/c/e/7/ce73761775be74362b2884444a535809_icon.png?w=256', className: 'img-fluid', alt: '' })
                      ),
                      _react2.default.createElement(
                        _antd.Col,
                        { span: 18, style: { alignItems: 'center' } },
                        _react2.default.createElement(
                          'p',
                          { className: 'fwork-name-company' },
                          company.name
                        ),
                        authUser.defaultCompany === company._id ? _react2.default.createElement(
                          'div',
                          { style: { display: 'flex', alignItems: 'center', paddingTop: 6 } },
                          _react2.default.createElement('div', { className: 'fwork-dots' }),
                          _react2.default.createElement(
                            'span',
                            { className: 'fwork-default-company' },
                            'C\xF4ng ty m\u1EB7c \u0111\u1ECBnh'
                          )
                        ) : null
                      )
                    );
                  }) : null
                )
              ),
              _react2.default.createElement(
                _antd.Checkbox,
                { onChange: this.onCheckBox, defaultChecked: defaultCompany, className: 'fwork-modal-checkbox' },
                '\u0110\u1EB7t l\xE0m c\xF4ng ty m\u1EB7c \u0111\u1ECBnh'
              ),
              _react2.default.createElement(
                'div',
                { style: { display: 'flex', height: 40, margin: '24px 0px 0px 0px' } },
                owner >= 0 ? _react2.default.createElement(
                  _antd.Tooltip,
                  { title: 'M\u1ED7i t\xE0i kho\u1EA3n ch\u1EC9 c\xF3 th\u1EC3 t\u1EA1o 1 c\xF4ng ty !' },
                  _react2.default.createElement(
                    'span',
                    { className: 'fwork-create-disable' },
                    _react2.default.createElement(_antd.Icon, { type: 'plus-circle', style: { paddingRight: 4 } }),
                    'T\u1EA1o c\xF4ng ty'
                  )
                ) : _react2.default.createElement(
                  'a',
                  { className: 'fwork-create-company', href: window.location.origin + '/register-company' || 'https://dev.fpt.work/register-company' },
                  _react2.default.createElement(_antd.Icon, { type: 'plus-circle', style: { paddingRight: 4 } }),
                  'T\u1EA1o c\xF4ng ty'
                ),
                _react2.default.createElement(
                  _antd.Button,
                  { className: 'fwork-company-button', type: 'primary', onClick: this.handleSubmit, disabled: !!(!companyId || authUser.company._id === companyId) },
                  '\u0110\u1ED5i c\xF4ng ty'
                )
              )
            )
          )
        )
      )
    );
  };

  return ModalChooseCompany;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(_ref) {
  var authUser = _ref.authUser;

  return {
    authUser: authUser
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    submitChooseCompany: function submitChooseCompany(params) {
      return dispatch((0, _frontendHelper.chooseCompany)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ModalChooseCompany);
module.exports = exports['default'];