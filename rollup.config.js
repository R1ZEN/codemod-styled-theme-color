import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const extensions = ['.ts'];

export default {
    input: 'transform/styled-theme-color.ts',
    output: {
        file: 'build/transform.js',
        format: 'cjs',
        exports: 'default'
    },
    external: ['path'],
    plugins: [
        nodeResolve({ extensions }),
        babel({ babelHelpers: 'bundled', extensions })
    ]
};
