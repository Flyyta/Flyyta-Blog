const config = require("./config");
const fm = require("front-matter");
const fs = require("fs");
const marked = require("./marked");
const singleBlogTemplate = require("./layout/blog-post-layout");

//Read and process markdown file
const createPost = (postPath) => {
  const data = fs.readFileSync(
    `${config.postPath.postsdir}/${postPath}.md`,
    "utf8"
  );
  const content = fm(data);
  content.body = marked(content.body);
  content.path = postPath;
  return content;
};

//Build blog posts
const createPosts = (posts) => {
  posts.forEach((post) => {
    if (!fs.existsSync(`${config.postPath.outdir}/${post.path}`))
      fs.mkdirSync(`${config.postPath.outdir}/${post.path}`);

    fs.writeFile(
      `${config.postPath.outdir}/${post.path}/index.html`,
      singleBlogTemplate(post),
      (e) => {
        if (e) throw e;
        console.log(`${post.path}/index.html was created successfully`);
      }
    );
  });
};

module.exports = {
  createPost: createPost,
  createPosts: createPosts,
};
