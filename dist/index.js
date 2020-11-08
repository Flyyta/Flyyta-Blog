const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const postMethods = require("./posts");
const convertFiles = require("./convert");
const config = require("./config");
const addHomePage = require("./homepage");
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
const posts = fs
  .readdirSync(config.dev.postsdir)
  .map((post) => post.slice(0, -3))
  .map((post) => postMethods.createPost(post))
  .sort(function (a, b) {
    return b.attributes.date - a.attributes.date;
  });

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

postMethods.createPosts(posts);
addHomePage(posts);
convertFiles();
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
