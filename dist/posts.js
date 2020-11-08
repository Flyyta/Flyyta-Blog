const config = require("./config");
const fm = require("front-matter");
const fs = require("fs");
const marked = require("./marked");

//Single Blog Post Template
const posthtml = (data) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${data.attributes.description}" />
        <link rel="stylesheet" href="/assets/styles/grotesk.light.css">
        <link rel="stylesheet" href="/assets/styles/highlights.css">
        <link rel="stylesheet" href="/assets/styles/main.css">
        <title>${data.attributes.title}</title>
    </head>
    <body>
        <div class="grotesk">
            <header>
                <a href="/">Go back home</a>
                <p>—</p>
            </header>

            <div class="content">
                <h1>${data.attributes.title}</h1>
                <p>${new Date(
                  parseInt(data.attributes.date)
                ).toDateString()}</p>
                <hr />
                ${data.body}
            </div>

            <footer>
                ${`<p>© ${new Date().getFullYear()} ${
                  config.authorName
                }, Find the code on <a href="github.com/kartiknair/blog">GitHub</a></p>`}
            </footer>
        </div>
    </body>
</html>
`;

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
      posthtml(post),
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
