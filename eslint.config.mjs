import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  formatters: true,
  rules: {
    'n/prefer-global/process': 0,
    'no-console': 1,
  },
  ignores: ['./pnpm-lock.yaml'],
})
