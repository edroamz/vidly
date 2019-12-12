import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({
    dsn: 'https://d65acfdc65984ea29f243eb8a30d6dee@sentry.io/1854594'
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
