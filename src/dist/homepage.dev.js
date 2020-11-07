"use strict";

var config = require("./config");

var fs = require("fs");

var homepage = function homepage(posts) {
  return "\n<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <meta name=\"description\" content=\"".concat(config.blogDescription, "\" />\n        <link rel=\"stylesheet\" href=\"./assets/styles/grotesk.light.css\">\n        <link rel=\"stylesheet\" href=\"./assets/styles/main.css\">\n        <title>").concat(config.blogName, "</title>\n    </head>\n    <body>\n        <div class=\"grotesk\">\n            <header>\n                <h1>").concat(config.blogName, "</h1>\n                <p>\u2014</p>\n                <p>This blog is written by <a href=\"").concat(config.authorWebsite, "\">").concat(config.authorName, "</a>, ").concat(config.authorDescription, ".</p>\n                <hr />\n            </header>\n            \n            <div class=\"posts\">\n                ").concat(posts.map(function (post) {
    return "<div class=\"post\">\n                    <h3><a href=\"./".concat(post.path, "\">").concat(post.attributes.title, "</a></h3>\n                        <small>").concat(new Date(parseInt(post.attributes.date)).toDateString(), "</small>\n                      <p>").concat(post.attributes.description, "</p>\n                    </div>");
  }).join(""), "\n            </div>\n\n            <footer>\n              ", "<p>\xA9 ".concat(new Date().getFullYear(), " ").concat(config.authorName, ", Find the code on <a href=\"https://github.com/kartiknair/blog\">GitHub</a></p>"), "\n            </footer>\n        </div>\n    </body>\n</html>\n");
};

var addHomePage = function addHomePage(posts) {
  fs.writeFile("".concat(config.dev.outdir, "/index.html"), homepage(posts), function (e) {
    if (e) throw e;
    console.log("index.html was created successfully");
  });
};

module.exports = addHomePage;