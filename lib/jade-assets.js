module.exports = {
  jade: {
    match: /\.jst$/,
    compileSync: function(sourcePath, source) {
      console.log('SOURCE', sourcePath)
      return require('jade')
        .compileClient(source)
        .toString()
        .replace('template', require('path')
        .basename(sourcePath, '.jade'));
    }
  }
};
