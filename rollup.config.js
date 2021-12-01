import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [typescript(), livereload()]
}