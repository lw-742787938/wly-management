/*
 * @Author: lw
 * @Date: 2022-10-28 11:41:26
 * @LastEditTime: 2022-11-25 15:31:31
 * @LastEditors: lw
 * @Description:
 * @FilePath: \wly-management\vite.config.js
 */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import postcsspxtoviewport from "postcss-px-to-viewport"
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  server: {
    host: true,
    // https: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px',
          viewportWidth: 1920,
          unitPrecision: 6,
          propList: ['*',"!border"],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['el-'],
          minPixelValue: 1,
          mediaQuery: true,
          replace: true,
          exclude: [/\/node_modules\//],
          landscape: false
        })
      ]
    }
  },
  resolve: {
    alias: {
      "@/scr": path.resolve(__dirname, "src/"),
      "@/server": path.resolve(__dirname, "src/server"),
      "@/views": path.resolve(__dirname, "src/views"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/store": path.resolve(__dirname, "src/store"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@/utils": path.resolve(__dirname, "src/utils"),
    },
  },
})
