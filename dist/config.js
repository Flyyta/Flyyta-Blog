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
};

module.exports = config;
