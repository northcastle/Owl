// vite 的通用配置

import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

// 自定义的开发时插件
import { ElectronDevPlugin } from '../plugins/vite.dev.plugin'

import { defineConfig } from "vite"
console.log('load base-config...')
export default defineConfig({

    plugins: [
        vue(),
        ElectronDevPlugin(),
    ],

    // 指定参数配置的文件目录(比较关键)
    envDir:'environmentconfig',

    resolve: {
        alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url))
        }
    },
   
})
