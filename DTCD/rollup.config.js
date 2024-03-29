import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

const watch = Boolean(process.env.ROLLUP_WATCH) || Boolean(process.env.LIVERELOAD);

const plugins = [
  //for axios
  nodeResolve({ jsnext: true, preferBuiltins: true, browser: true }),
  babel({ babelHelpers: 'bundled' }),
  //for require, module.exports syntax
  commonjs(),
  json(),
  postcss(),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.VUE_ENV': JSON.stringify('browser'),
  }),
  copy({
    targets: [
      { src: './assets/*', dest: './dist' },
      { src: './src/index.html', dest: './dist' },
      { src: './src/main.css', dest: './dist' },
    ],
  }),
  watch &&
    copy({
      targets: [
        { src: './assets/*', dest: './../public' },
        { src: './dist/*', dest: './../public' },
        { src: './src/index.html', dest: './../public' },
        { src: './src/main.css', dest: './../public' },
      ],
    }),
  watch && livereload('./../Mock_server/plugins'),
];

export default {
  input: 'main.js',
  output: {
    file: './dist/build.js',
    format: 'iife',
  },
  watch: {
    include: ['./src/**', './main.js'],
  },
  plugins,
};
