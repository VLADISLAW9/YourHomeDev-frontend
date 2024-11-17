import { eslint } from '@siberiacancode/eslint';

export default eslint(
  {
    typescript: true,
    jsx: true,
    jsxA11y: true,
    react: true,
    stylistic: true
  },
  {
    rules: {
      'perfectionist/sort-imports': 'off',
      'ts/no-redeclare': 'warn'
    }
  }
);
