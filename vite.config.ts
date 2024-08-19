import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/todo-mindbox',
    resolve: {
        alias: [
            {find: '@src', replacement: path.resolve(__dirname, './src')},
            {find: '@lib', replacement: path.resolve(__dirname, './lib')},
        ],
    },
})
