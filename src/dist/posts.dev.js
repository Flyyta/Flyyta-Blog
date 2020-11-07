"use strict";

var config = require("./config");

var fm = require("front-matter");

var fs = require("fs");

var marked = require("./marked");

var posthtml = function posthtml(data) {
  return "\n<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <meta name=\"description\" content=\"".concat(data.attributes.description, "\" />\n        <link rel=\"stylesheet\" href=\"/assets/styles/grotesk.light.css\">\n        <link rel=\"stylesheet\" href=\"/assets/styles/highlights.css\">\n        <link rel=\"stylesheet\" href=\"/assets/styles/main.css\">\n        <title>").concat(data.attributes.title, "</title>\n    </head>\n    <body>\n        <div class=\"grotesk\">\n            <header>\n                <a href=\"/\">Go back home</a>\n                <p>\u2014</p>\n            </header>\n\n            <div class=\"content\">\n                <h1>").concat(data.attributes.title, "</h1>\n                <p>").concat(new Date(parseInt(data.attributes.date)).toDateString(), "</p>\n                <hr />\n                ").concat(data.body, "\n            </div>\n\n            <footer>\n                ", "<p>\xA9 ".concat(new Date().getFullYear(), " ").concat(config.authorName, ", Find the code on <a href=\"github.com/kartiknair/blog\">GitHub</a></p>"), "\n            </footer>\n        </div>\n    </body>\n</html>\n");
};

var createPost = function createPost(postPath) {
  var data = fs.readFileSync("".concat(config.dev.postsdir, "/").concat(postPath, ".md"), "utf8");
  var content = fm(data);
  content.body = marked(content.body);
  content.path = postPath;
  return content;
};

var createPosts = function createPosts(posts) {
  posts.forEach(function (post) {
    if (!fs.existsSync("".concat(config.dev.outdir, "/").concat(post.path))) fs.mkdirSync("".concat(config.dev.outdir, "/").concat(post.path));
    fs.writeFile("".concat(config.dev.outdir, "/").concat(post.path, "/index.html"), posthtml(post), function (e) {
      if (e) throw e;
      console.log("".concat(post.path, "/index.html was created successfully"));
    });
  });
};

module.exports = {
  createPost: createPost,
  createPosts: createPosts
};