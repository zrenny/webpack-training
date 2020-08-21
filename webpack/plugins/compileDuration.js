const { performance } = require("perf_hooks");

module.exports = class CompileDuration {
  constructor() {
    this.start = null;
    this.finish = null;
  }

  apply(compiler) {
    compiler.hooks.compile.tap("CompileDuration", params => {
      this.start = performance.now();
    });
    compiler.hooks.done.tap("CompileDuration", stats => {
      this.finish = performance.now();
      console.log(`It took ${this.finish - this.start}ms`);
    });
  }
};
