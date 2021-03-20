const webpack = require('webpack');

function SuccessPlugin(callback) {
  this.callback = callback;
}

SuccessPlugin.prototype.apply = function (compiler) {
  const callback = this.callback;
  compiler.plugin('done', function () {
    callback && callback();
  });
};

module.exports = SuccessPlugin;
