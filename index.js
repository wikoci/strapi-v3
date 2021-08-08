if (typeof window == "undefined") {
  
    try {
    require = require("esm")(module /*, options*/);
  module.exports = require("./utils.js").default;
} catch()

} else {
  require("./utils").default;
}
