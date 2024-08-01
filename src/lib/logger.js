/* eslint no-console: 'off' */
const logLevel = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('logLevel') || 'warn' : process?.env?.LOG_LEVEL;
const logCategory = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('logCategory') : process?.env?.LOG_CATEGORY;

// Note that logLevel and LogCategory need to be set in .env to affect server-side rendering.

const levels = ['error', 'warn', 'info', 'debug', 'silly'];

const logger = ({ category }) => ({
  category,
  level: logLevel,

  isLogging: (checkLevel) => levels.indexOf(checkLevel) <= levels.indexOf(logLevel),

  solo: (...args) => {
    // Use solo when you are in dev and want to just log a specific line without
    // logging everything else. Or I guess use console.log instead.
    if (logLevel === 'solo') {
      const [message, ...rest] = args;
      console.log(`[solo] ${category}: ${message}`, ...rest);
    }
    return true;
  },

  silly: (...args) => {
    if (logLevel === 'silly' && (logCategory || category) === category) {
      const [message, ...rest] = args;
      console.debug(`[silly] ${category}: ${message}`, ...rest);
    }
    return true;
  },

  debug: (...args) => {
    if (/silly|debug/.test(logLevel) && (logCategory || category) === category) {
      const [message, ...rest] = args;
      console.debug(`[debug] ${category}: ${message}`, ...rest);
    }
    return true;
  },

  info: (...args) => {
    if (/silly|debug|info/.test(logLevel) && (logCategory || category) === category) {
      const [message, ...rest] = args;
      console.log(`[info] ${category}: ${message}`, ...rest);
    }
    return true;
  },

  warn: (...args) => {
    if (logLevel !== 'error' && (logCategory || category) === category) {
      const [message, ...rest] = args;
      console.warn(`[warn] ${category}: ${message}`, ...rest);
    }
    return true;
  },

  error: (...args) => {
    if ((logCategory || category) === category) {
      const [message, ...rest] = args;
      console.error(`[error] ${category}: ${message}`, ...rest);
    }
    return true;
  },
});

module.exports = logger;
