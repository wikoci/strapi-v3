if (typeof window == "undefined") {
  require = require("esm")(module /*, options*/);
  module.exports = require("./utils.js").default;
} else {
  require("./utils").default;
}
