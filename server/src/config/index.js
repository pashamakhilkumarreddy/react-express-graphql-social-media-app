import development from './development.js';
import staging from './staging.js';
import acceptance from './acceptance.js';
import production from './production.js';
import commonConfig from './common.js';

const config = {
  development,
  staging,
  acceptance,
  production,
};

export default {
  ...config[commonConfig.ENV],
};
