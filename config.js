// The file config.js defines your site’s metadata and other general configuration.

const config = {
  siteName: "Flyyta Blog",
  siteHeading: "Website created using Flyyta",
  siteAuthorName: "Flyyta",
  siteAuthorWebsite: "https://flyyta.netlify.app",
  postPath: {
    postsdir: "./content",
    outdir: "./public",
  },
  filePath: {
    postsdir: "./src",
    outdir: "./public",
  },
  mapPostsTo: {
    //todo: add directory then filename ..
    fileName: "index.html",
    filedir: "./src",
  },
  postsLayout: {
    postsdir: "./layout/singleBlog",
    file: "blog.html",
  },
  blogListLayout: {
    postsdir: "./layout/BlogListLayout",
    file: "layout.html",
  },
};

module.exports = config;
