module.exports = function(eleventyConfig) {
    // Copy the static assets to the output folder
    eleventyConfig.addPassthroughCopy("src/CSS");
    eleventyConfig.addPassthroughCopy("src/JS");
    eleventyConfig.addPassthroughCopy("src/IMG");
    eleventyConfig.addPassthroughCopy("src/manifest.json");
    eleventyConfig.addPassthroughCopy("src/sw.js");

    return {
        dir: {
            input: "src",
            output: "docs",
            includes: "_includes"
        }
    }
};
