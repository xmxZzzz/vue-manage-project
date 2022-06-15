module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //添加
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
