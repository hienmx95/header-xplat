'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _More = require('../icon/More');

var _More2 = _interopRequireDefault(_More);

var _ToggleNoti = require('../icon/ToggleNoti');

var _ToggleNoti2 = _interopRequireDefault(_ToggleNoti);

var _OffNoti = require('../icon/OffNoti');

var _OffNoti2 = _interopRequireDefault(_OffNoti);

var _MarkAsRead = require('../icon/MarkAsRead');

var _MarkAsRead2 = _interopRequireDefault(_MarkAsRead);

var _reactRedux = require('react-redux');

var _frontendHelper = require('@fwork/frontend-helper');

var _notification = require('../notification');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MoreOption = function (_React$Component) {
  _inherits(MoreOption, _React$Component);

  function MoreOption(props) {
    _classCallCheck(this, MoreOption);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.showMore = function () {
      _this.setState({
        show: true
      });
    };

    _this.toggleNotification = function (status) {
      _this.setState({
        show: false
      });
      var HEADER_BACKEND = process.env.REACT_APP_FWORK_API_ENDPOINT + '/header' || 'https://dev.fpt.work/api/v1/header';
      var url = 'setting';
      (0, _frontendHelper.fetchAPI)({
        baseURL: HEADER_BACKEND,
        url: url,
        method: 'PUT',
        body: {
          notification: status
        }
      }).then(function (res) {
        var message = 'Bật thông báo thành công.';
        if (!status) {
          message = 'Tắt thông báo thành công.';
        }
        (0, _notification.openNotification)('success', null, message, null, 3);
        _this.props.setCurrentUser();
      }).catch(function (err) {
        console.error('toggleNotification:', err);
      });
    };

    _this.markAsRead = function () {
      _this.props.markAsRead();
      _this.setState({
        show: false
      });
    };

    _this.state = {
      show: false
    };

    _this.setWrapperRef = _this.setWrapperRef.bind(_this);
    _this.handleClickOutside = _this.handleClickOutside.bind(_this);
    return _this;
  }

  MoreOption.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  MoreOption.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  MoreOption.prototype.setWrapperRef = function setWrapperRef(node) {
    this.wrapperRef = node;
  };

  MoreOption.prototype.handleClickOutside = function handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        show: false
      });
    }
  };

  MoreOption.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      { ref: this.setWrapperRef },
      _react2.default.createElement(_More2.default, { onClick: this.showMore }),
      this.state.show ? _react2.default.createElement(
        'div',
        { className: 'more-option-noti' },
        _react2.default.createElement(
          'ul',
          { className: 'ant-list-items' },
          _react2.default.createElement(
            'li',
            { className: 'ant-list-item' },
            _react2.default.createElement(
              'div',
              { className: 'ant-list-item-meta' },
              _react2.default.createElement(_MarkAsRead2.default, null),
              _react2.default.createElement(
                'div',
                { className: 'ant-list-item-meta-content', onClick: this.markAsRead },
                _react2.default.createElement(
                  'h4',
                  { className: 'ant-list-item-meta-title' },
                  '\u0110\xE1nh d\u1EA5u t\u1EA5t c\u1EA3 l\xE0 \u0111\xE3 \u0111\u1ECDc'
                )
              )
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'ant-list-item' },
            this.props.authUser.setting && this.props.authUser.setting.notification ? _react2.default.createElement(
              'div',
              { className: 'ant-list-item-meta' },
              _react2.default.createElement(_OffNoti2.default, null),
              _react2.default.createElement(
                'div',
                { className: 'ant-list-item-meta-content', onClick: function onClick() {
                    return _this2.toggleNotification(false);
                  } },
                _react2.default.createElement(
                  'h4',
                  { className: 'ant-list-item-meta-title' },
                  _react2.default.createElement(
                    'b',
                    null,
                    'T\u1EAFt'
                  ),
                  ' th\xF4ng b\xE1o tr\xEAn desktop'
                )
              )
            ) : _react2.default.createElement(
              'div',
              { className: 'ant-list-item-meta' },
              _react2.default.createElement(_ToggleNoti2.default, null),
              _react2.default.createElement(
                'div',
                { className: 'ant-list-item-meta-content', onClick: function onClick() {
                    return _this2.toggleNotification(true);
                  } },
                _react2.default.createElement(
                  'h4',
                  { className: 'ant-list-item-meta-title' },
                  _react2.default.createElement(
                    'b',
                    null,
                    'B\u1EADt'
                  ),
                  ' th\xF4ng b\xE1o tr\xEAn desktop'
                )
              )
            )
          )
        )
      ) : null
    );
  };

  return MoreOption;
}(_react2.default.Component);

function mapStateToProps(state) {
  var authUser = state.authUser;

  return {
    authUser: authUser
  };
}

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: function setCurrentUser() {
      return dispatch((0, _frontendHelper.setCurrentUser)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MoreOption);
module.exports = exports['default'];