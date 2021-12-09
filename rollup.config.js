import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

export default {
  // input: 'src/browserify.js',
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'wordCloud',
    sourcemap: true,
    indent: false,
    extend: true
  },
  plugins: [
    typescript(),
    serve({contentBase: '', port: 7777}),
    livereload()
    ]
}