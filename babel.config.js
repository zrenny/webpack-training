module.exports = function(api) {
  // Will cache configuration evaluation, otherwise will evaluate config per file
  api.cache(true);

  return {
    presets: ["@babel/preset-env"]
  };
};
