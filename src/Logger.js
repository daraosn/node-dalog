import Crypto from 'crypto';

export default
class Logger {
  constructor(options) {
    let md5 = Crypto.createHash('md5');
    let hash = md5.update(""+Math.random());
    this._hash = hash.digest('hex').slice(0, 8);
  }

  spawn() {
    return new Logger();
  }

  log(...args) {
    this._print(console.log, args);
  }

  info(...args) {
    this._print(console.info, args);
  }

  error(...args) {
    this._print(console.error, args);
  }

  warn(...args) {
    this._print(console.warn, args);
  }

  _print(consoleMethod, args) {
    let caller = new Error().stack.split('\n')[3];
    caller = (!caller) ? 'Unknown' : caller.replace(/^\s+at\s/, '').replace(/.+\((.*)\)/, '$1');
    caller = caller.split('/').pop();
    args.unshift(`[${this._hash}](${caller})`);
    consoleMethod.apply(console, args);
  }
}
