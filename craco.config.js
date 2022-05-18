// This is the configuration file for the @craco/craco package

module.exports = {
  plugins: [
    {
      plugin: require('craco-antd'), // this plugin is used to load 'antd.customize.less' to customize ant design's themes
    },
  ],
};
