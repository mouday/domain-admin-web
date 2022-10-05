import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
// import viteCompression from 'vite-plugin-compression'

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
      // gzip
      // viteCompression(),
    ],

    build: {
      // 禁用 gzip 压缩大小报告
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',
          assetFileNames: '[ext]/[name].[hash].[ext]',
          manualChunks: {
            'vendor-vue': ['vue', 'vue-router', 'pinia'],
            'element-icon': ['@element-plus/icons-vue'],
            'element-plus': ['element-plus'],
            'vendor-lib': ['axios', 'file-saver', 'js-cookie'],
          },
        },
      },
    },
  }

  // 打包产物体积分析
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
