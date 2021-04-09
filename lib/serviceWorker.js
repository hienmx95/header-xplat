"use strict";

exports.__esModule = true;
exports.register = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var register = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _register, subscription, token;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("navigator: ", navigator);

            if (!("serviceWorker" in navigator)) {
              _context.next = 13;
              break;
            }

            _context.next = 4;
            return navigator.serviceWorker.register("/sw.js", {
              scope: "/"
            });

          case 4:
            _register = _context.sent;
            _context.next = 7;
            return _register.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });

          case 7:
            subscription = _context.sent;
            token = localStorage.getItem("token");
            _context.next = 11;
            return fetch(process.env.REACT_APP_FWORK_API_ENDPOINT + "/notification/subscribe", {
              method: "POST",
              body: JSON.stringify(subscription),
              headers: {
                "Content-Type": "application/json",
                access_token: token
              }
            });

          case 11:
            _context.next = 14;
            break;

          case 13:
            console.error("Service workers are not supported in this browser");

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function register() {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

var publicVapidKey = "BNvAjcpe8aD1M9IksIM_9nK5xfFRzUsSMCol31c2kTAfkFP1dGbIPPcYYi-Co3dqyCq7lVs53RdRi2SEwtu0iQ8";

exports.register = register;