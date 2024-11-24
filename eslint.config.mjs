import { eslint } from '@siberiacancode/eslint';

export default eslint(
  {
    typescript: true
  },
  {
    ignores: ['routeTree.gen.ts']
  },
  {
    rules: {
      'node/prefer-global/process': ['error', 'always'],
      'siberiacancode-react/prop-types': 'off',
      'plugin-simple-import-sort/imports': 'off',
      'ts/no-redeclare': 'warn'
    }
  }
);
