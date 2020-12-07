module.exports = {
  root: true,
  extends: ['plugin:@medux/recommended/common'],
  env: {
    browser: false,
    node: true,
  },
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  rules: {
    'global-require': 'off',
    "sort-imports": ["error", {
      "ignoreCase": true,
      "ignoreDeclarationSort": false,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["all", "multiple", "single","none",]
  }],
  },
  ignorePatterns: ['/src','/dist','/mock'],
};
