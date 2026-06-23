import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Disable rules that conflict with standard React data fetching in useEffect
      'react-hooks/set-state-in-effect': 'off',
      // Allow exporting hooks and providers from the same context file
      'react-refresh/only-export-components': 'off',
      // Demote unused variables to warnings to avoid breaking builds
      'no-unused-vars': 'warn',
    },
  },
])
