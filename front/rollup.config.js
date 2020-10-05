// import path from 'path'
//
// import builtins from 'builtin-modules'
import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-node-polyfills';
import resolve from 'rollup-plugin-node-resolve';
export default {
    input: './src/app/index.js',
    output: {
        file: './src/public/bundle.js',
        format: 'iife',
        name: 'MyModule'
    },
    plugins: [
        resolve(),
        commonjs(),
        nodePolyfills()
    ],
    external:["worker_threads"],
};