function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return {
    bundleSize: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
    fullSizeInfo:
      parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  };
}

module.exports = class ExamplePlugin {
  constructor(options) {
    this.options = options || {
      sizeLimit: 3
    };
  }
  apply(compiler) {
    compiler.hooks.done.tap("BundleSizePlugin", stats => {});
  }
};
