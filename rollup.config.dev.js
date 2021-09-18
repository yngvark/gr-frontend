import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

import serve from 'rollup-plugin-serve'

export default {

    //  Our games entry point (edit as required)
    input: [
        './src/index.ts'
    ],

    //  Where the build file is to be generated.
    //  Most games being built for distribution can use iife as the module type.
    //  You can also use 'umd' if you need to ingest your game into another system.
    //  The 'intro' property can be removed if using Phaser 3.21 or above. Keep it for earlier versions.
    output: {
        file: './dist/game.js',
        name: 'MyGame',
        format: 'iife',
        sourcemap: true,
        intro: 'var global = window;'
    },

    plugins: [

        //  Toggle the booleans here to enable / disable Phaser 3 features:
        replace({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            'typeof EXPERIMENTAL': JSON.stringify(true),
            'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
            'typeof PLUGIN_FBINSTANT': JSON.stringify(false),
            'typeof FEATURE_SOUND': JSON.stringify(true)
        }),

        //  Parse our .ts source files
        resolve({
            extensions: [ '.ts', '.tsx' ]
        }),

        //  We need to convert the Phaser 3 CJS modules into a format Rollup can use:
        commonjs({
            include: [
                'node_modules/eventemitter3/**',
                'node_modules/phaser/**'
            ],
            exclude: [ 
                'node_modules/phaser/src/polyfills/requestAnimationFrame.js'
            ],
            sourceMap: true,
            ignoreGlobal: true
        }),

        //  See https://github.com/rollup/plugins/tree/master/packages/typescript for config options
        typescript({
            tsconfig: 'tsconfig-frontend.json'
        }),

        // Host a server (only used for dev, see Dockerfile for prod)
        // https://www.npmjs.com/package/rollup-plugin-serve
        serve({
            contentBase: 'dist',
            host: 'localhost',
            port: 3000,
            onListening: function (server) {
                const address = server.address()
                const host = address.address === '::' ? 'localhost' : address.address
                // by using a bound function, we can access options as `this`
                const protocol = this.https ? 'https' : 'http'
                console.log(`Server listening at ${protocol}://${host}:${address.port}/`)
            }
        })
    ]
};