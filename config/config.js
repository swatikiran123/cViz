var convict       = require('convict');
var constants     = require('../scripts/constants');

var config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'env'
  },
  db: {
    main: {
      doc: 'Main database',
      format: String,
      default: 'mongodb://127.0.0.1/cViz-Test',
      env: 'MONGO_MAIN'
    },
    sessions: {
      doc: 'Sessions database',
      format: String,
      default: 'mongodb://127.0.0.1/mStackSession',
      env: 'MONGO_SESSIONS'
    }
  },
  express: {
    ip: {
      doc: 'The IP address to bind.',
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'IP_ADDRESS',
    },
    http: {
      port: {
        doc: 'HTTP port to bind.',
        format: 'port',
        default: 3080,
        env: 'HTTP_PORT'
      }
    },
    https: {
      port: {
        doc: 'HTTPs port to bind.',
        format: 'port',
        default: 3443,
        env: 'HTTPS_PORT'
      }
    }
  }
});

// load environment dependent configuration
config.loadFile(constants.paths.config + '/' + config.get('env') + '.json');

// validate
config.validate();

module.exports = config;
