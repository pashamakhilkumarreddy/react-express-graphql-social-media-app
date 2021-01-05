module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info']
      }
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id', '_doc']
      }
    ]
  },
};
