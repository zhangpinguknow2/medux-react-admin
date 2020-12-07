module.exports = {
  root: true,
  extends: ['plugin:@medux/recommended/react'],
  env: {
    browser: true,
    node: false,
  },
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  rules: {
    //'global-require': 'off',
    "sort-imports": ["error", {
      "ignoreCase": true,
      "ignoreDeclarationSort": true,
      "ignoreMemberSort": true,
      "memberSyntaxSortOrder": ["all", "multiple", "single","none",]
    }]
  },
  ignorePatterns: [],
};
