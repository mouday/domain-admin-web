import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  console.log(config)

  const viteConfig = {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    plugins: [
      vue(),

      // splitVendorChunkPlugin(),

      // Element Plus 按需导入 https://element-plus.gitee.io/zh-CN/guide/quickstart.html
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),

      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],

    build: {
      // 禁用 gzip 压缩大小报告
      reportCompressedSize: false,

      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-vue': ['vue', 'vue-router', 'pinia'],
            'vendor-icon': ['@element-plus/icons-vue'],
            'vendor-lib': ['axios', 'file-saver', 'js-cookie']
          }
        }
      }
    },
    
  }

  if (config.mode == 'visualizer') {
    viteConfig.plugins.push(
      visualizer({
        open: true, //注意这里要设置为true，否则无效
        gzipSize: true,
        brotliSize: true,
      })
    )
  }

  return viteConfig
})
