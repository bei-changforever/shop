module.exports = {
    plugins: {
      'postcss-pxtorem': {
        //以iphone屏幕作为标准
        rootValue: 37.5,
        propList: ['*'],
      },
    },
  };