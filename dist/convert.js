const fs = require("fs");
const util = require("util");
const config = require("./config");
const readFile = util.promisify(fs.readFile);
const f = (posts) => {
  return `
<div class="posts">
              ${posts
                .map(
                  (post) => `<div class="post">
                  <h3><a href="./${post.path}">${post.attributes.title}</a></h3>
                      <small>${new Date(
                        parseInt(post.attributes.date)
                      ).toDateString()}</small>
                    <p>${post.attributes.description}</p>
                  </div>`
                )
                .join("")}
          </div>
`;
};
const regex = /\{(.*?)\}/g;
const moveFrom = config.dev2.postsdir;
const moveTo = config.dev2.outdir;

const readFileAsync = async (filename) => {
  return readFile(`${moveFrom}/${filename}`);
};

const convertFiles = async (posts) => {
  let markupFromExternalFile;
  const files = await fs.promises.readdir(moveFrom);
  for (const file of files) {
    if (file == "index.html") {
      let a = f(posts);
      config.posts = a;
    }
    readFileAsync(file)
      .then((res) => {
        markupFromExternalFile = res.toString("utf-8");
        let finalMarkup = markupFromExternalFile;
        const changes = finalMarkup.matchAll(regex);
        while (true) {
          const change = changes.next();
          if (change.done) break;
          const [replacement, prop] = change.value;
          finalMarkup = finalMarkup.replace(
            replacement,
            config[prop.split(".").pop()]
          );
        }
        fs.writeFile(`${moveTo}/${file}`, finalMarkup, function (err) {
          if (err) throw err;
          console.log("Saved!");
        });
      })
      .catch((err) => console.log(err));
  }
};
module.exports = convertFiles;
