"use strict";

module.exports = (app) => {
  app.use("/sms", require("./sms"));
  app.use("/products", require("./products"));
  app.use("/banners", require("./banners"));
};
