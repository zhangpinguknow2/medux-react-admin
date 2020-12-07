module.exports = {
  extends: ['../.eslintrc-src.js'],
  parserOptions: {
    // @ts-ignore
    project: `${__dirname}/tsconfig.json`,
  },
  rules: {
    'global-require': 'off',
    "sort-imports": ["error", {
      "ignoreCase": true,
      "ignoreDeclarationSort": true,
      "ignoreMemberSort": true,
      "memberSyntaxSortOrder": ["all", "multiple", "single","none",]
    }]
  },
  ignorePatterns: [],
};
