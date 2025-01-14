const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @use "sass:map";
          @use "@/styles/_variables.scss" as *;
          @use "@/styles/_mixins.scss" as *;
        `,
      },
    },
  },
});
