'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
  function Logger() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? { debug: false } : arguments[0];

    _classCallCheck(this, Logger);

    var md5 = _crypto2.default.createHash('md5');
    var hash = md5.update("" + Math.random());
    this._hash = hash.digest('hex').slice(0, 8);
    this._options = options;
  }

  _createClass(Logger, [{
    key: 'spawn',
    value: function spawn() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      options = Object.assign(this._options, options);
      return new Logger(options);
    }
  }, {
    key: 'log',
    value: function log() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this._print(console.log, args);
    }
  }, {
    key: 'info',
    value: function info() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this._print(console.info, args);
    }
  }, {
    key: 'error',
    value: function error() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this._print(console.error, args);
    }
  }, {
    key: 'warn',
    value: function warn() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this._print(console.warn, args);
    }
  }, {
    key: 'debug',
    value: function debug() {
      // NOTE: console.debug is deprecated, but we will wrap it for our purposes by enabling a flag on constructor
      // LINK: https://developer.mozilla.org/en-US/docs/Web/API/Console
      if (!this._options.debug) return;

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this._print(console.log, args);
    }
  }, {
    key: '_print',
    value: function _print(consoleMethod, args) {
      var caller = new Error().stack.split('\n')[3];
      caller = !caller ? 'Unknown' : caller.replace(/^\s+at\s/, '').replace(/.+\((.*)\)/, '$1');
      caller = caller.split('/').pop();
      args.unshift('[' + this._hash + '](' + caller + ')');
      consoleMethod.apply(console, args);
    }
  }]);

  return Logger;
}();

exports.default = Logger;