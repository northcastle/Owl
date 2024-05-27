const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    // 指定app的icon：mac & windows
    // 这个配置的是应用启动后，展示的图标
    // mac  : xxx.icns ; windows : xxx.ico
    // 只需要写名称，不需要写后缀
    icon:'./forgeimages/owl'
  },
  rebuildConfig: {},
  makers: [
     // mac 上的打包
     {
      name: '@electron-forge/maker-dmg',
      config: {
        //background: './assets/dmg-background.png',
        // 设置 安装程序的图标
        // 此处需要写明白图片的后缀名称
        setupIcon: './forgeimages/owl.icns',
        format: 'ULFO'
      }
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // 设置 安装程序的图标
        // 此处需要写明白图片的后缀名称
        setupIcon: './forgeimages/owl.ico'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin','win32'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
