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
      // Strict unused variables - this will show red squiggles in VS Code
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      // Turn off the base rule to avoid conflicts
      'no-unused-vars': 'off',

      // Additional strict rules that will show as errors in editor
      'react-hooks/exhaustive-deps': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // These rules help catch common issues
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
];

export default eslintConfig;
