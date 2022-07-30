const prodPlugins=[]
if(process.env.NOOE_ENV === 'production')
prodPlugins.push('transform-remove-console')
module.exports = {
  presets: [
    "@vue/app"
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ],
    // 发布产品时候的插件数组
    ...prodPlugins,
    '@babel/plugin-syntax-dynamic-import'
  ]
}