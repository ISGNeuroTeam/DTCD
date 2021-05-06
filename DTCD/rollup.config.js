import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import html from '@rollup/plugin-html';
import copy from 'rollup-plugin-copy';
import babel from '@rollup/plugin-babel';

const watch = Boolean(process.env.ROLLUP_WATCH) || Boolean(process.env.LIVERELOAD);

const plugins = [
  //for axios
  nodeResolve({jsnext: true, preferBuiltins: true, browser: true}),
  babel({babelHelpers: 'bundled'}),
  //for require, module.exports syntax
  commonjs(),
  postcss(),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.VUE_ENV': JSON.stringify('browser'),
  }),
  html({
    title: 'DataCAD',
    meta: [
      {
        charset: 'UTF-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
      {
        'http-equiv': 'X-UA-Compatible',
      },
    ],
  }),
  copy({
    targets: [{src: './assets/*', dest: './dist'}],
  }),
  watch &&
    copy({
      targets: [
        {src: './assets/*', dest: './../public'},
        {src: './dist/*', dest: './../public'},
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
