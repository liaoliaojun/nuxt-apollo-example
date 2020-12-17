const isProd = process.env.NODE_ENV === 'production'
const warnInDev = isProd ? 'error' : 'warn'

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
  ],
  rules: {
    'vue/max-attributes-per-line': [warnInDev, {
      singleline: 9,
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'quote-props': 'off',
    'no-console': isProd ? 'error' : 'off',
    'no-debugger': isProd ? 'error' : 'off',
    'no-var': 'error',
    'indent': 'off', // eslint的缩进禁用，使用vue/script-indent缩进
    'comma-dangle': [warnInDev, 'always-multiline'],
    'key-spacing': [warnInDev, {'afterColon': true}], // 冒号后必须有空格
    'eqeqeq': [warnInDev, 'always'], // 使用全等 ===
    'quotes': [warnInDev, 'single'], // 必须单引号
    'semi': [warnInDev, 'never'], // 不能有分号
    'object-curly-spacing': [warnInDev, 'never'], // 对象内前后不许有空格
    'vue/script-indent': [warnInDev, 2, {baseIndent: 1, switchCase: 1}], // script缩进俩个空格
    'comma-spacing': [warnInDev, {after: true}], // 逗号之后必须有空格
    'curly': 'off',
    'arrow-parens': 'off',
    'camelcase': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // 'no-unused-vars': [warnInDev, {'vars': 'local', 'args': 'after-used', 'ignoreRestSiblings': false, 'argsIgnorePattern': '^_'}],
  },
}
