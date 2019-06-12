module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 6,
  },

  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    '@vue/standard',
    'plugin:prettier/recommended',
  ],

  // required to lint *.vue files
  plugins: ['vue'],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
  },

  // add your custom rules here
  rules: {
    'max-len': [0, 80],
    quotes: [2, 'single'],
    semi: [2, 'always'],
    'comma-dangle': [1, 'only-multiline'], // 댕글링 콤마 설정
    // allow async-await
    'generator-star-spacing': 'off',
    // 대입없는 표현식 금지 (비활성).
    'no-unused-expressions': 'off',
    // linebraek 설정 (lf 사용.)
    'linebreak-style': ['error', 'unix'],
    // 연산자 줄바꿈 (연산식앞 설정.)
    'operator-linebreak': [
      2,
      'before',
      { overrides: { '+=': 'none', '-=': 'none', '=': 'ignore' } },
    ],
    indent: [2, 2],
    // allow debugger during development
    'no-tabs': 1,
    // allow debugger during development

    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': [2, 'always'],
    'one-var': 'off',
    'space-before-function-paren': 1,
    'no-return-await': 0,

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': 'off',
    '@vue/html-self-closing': 'on',
    'no-unused-vars': [1, { 'vars': 'all', 'args': 'none', 'caughtErros': 'none' }],
    'standard/computed-property-even-spacing': 0,
    // allow console.log during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'off',
      {},
      {
        fileInfoOptions: {
          withNodeModules: 'off',
        },
      },
    ],
  },
  globals: {
    R: true,
    _: true,
    $g: true,
    $vue: true,
    $store: true,
    $router: true,
    $q: true,
  },
};
