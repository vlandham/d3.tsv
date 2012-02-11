document = require("jsdom").jsdom("<html><head></head><body></body></html>");
window = document.createWindow();
navigator = window.navigator;
CSSStyleDeclaration = window.CSSStyleDeclaration;

require("../lib/sizzle/sizzle");
require("../lib/d3/d3.js");
Sizzle = window.Sizzle;

process.env.TZ = "America/Los_Angeles";

require("./env-assert");
require("./env-xhr");
require("./env-fragment");
