# node-dalog
Simple Logger with spawning, source code and event tracing. ES6 compatible.

## Usage

JS example:
```
var Logger = require('dalog').default;
logger = new Logger();
logger.log('Hello','world');
```

ES6 example:
```
import Logger from 'dalog';

export class MyApp {
  constructor {
    this.logger = new Logger();
    this.logger.log('Hello','world');
  }
}
```

This would log using `console.log()` and output something like:
```
[ead88891](app.js:3:8) Hello world
```

The format is as follows:
```
[$(id)]($(file):$(line):$(character)) $(message)
```

**id:** Random identificator to easily track source of evented log calls. Very useful when having many streams, log messages usually merge and mix, making traceability almost impossible.  
**file:** Source file name that called the logger.  
**line:** Line of source file in which the logger was called.  
**character:** Position in line from which the logger was called.  
**message:** Multiple arguments turned into string message, same as using `console`.  

## Console support

Logger is mounted over `console`, and supports `.log()`, `.info()`, `.warn()`, `.error()` and multiple arguments.

## Spawning child loggers

It's possible to spawn the logger to trace specific events, for example:

```
var Logger = require('dalog').default;
appLogger = new Logger();
appLogger.log('Hello','world');

timerLogger = appLogger.spawn();
failLogger = appLogger.spawn();

setInterval(function() {
  timerLogger.info('Tick!', +new Date);
}, 1000);

setTimeout(function() {
  failLogger.error('Fail!');
  process.exit(1);
}, 5000);
```

It's similar to creating a new instance of the logger, but there are plans to trace back parent/children calls. Also date/time, format and other features on the bucketlist.

Output of example above:
```
[b3d3b328](app.js:3:11) Hello world
[3598caeb](app.js:9:15) Tick! 1661859488022
[3598caeb](app.js:9:15) Tick! 1661859489028
[3598caeb](app.js:9:15) Tick! 1661859490032
[3598caeb](app.js:9:15) Tick! 1661859491037
[4115b85d](app.js:13:14) Fail!
```

## License

MIT