import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',

      // Prefer arrow functions for React components (all must be arrow functions)
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
          function: 'arrow-function',
          functions: 'arrow-function',
        },
      ],

      // Only ban: {' '}
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXExpressionContainer > Literal[value=' ']",
          message:
            "Unnecessary {' '} detected in JSX. Use natural spacing or Tailwind classes instead.",
        },
      ],
      'react/no-unescaped-entities': 'off',
      'react/jsx-curly-spacing': 'off',
    },
  },
];

export default eslintConfig;
