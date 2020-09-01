const express = require("express");
const router = express.Router();
const fs = require("fs");
const { join } = require("path");
const matter = require("gray-matter");

router.get("/posts", (req, res) => {
  const posts = [];
  const postsDirectory = join(__dirname, "..", "posts");
  fs.readdirSync(postsDirectory).forEach(async (file) => {
    const markdownWithMetadata = fs
      .readFileSync(join(__dirname, "..", "posts", file))
      .toString();
    const { data } = matter(markdownWithMetadata);
    posts.push(data);
  });
  res.json({ posts });
});

router.get("/post", (req, res) => {
  const { query } = req;
  const { id } = query;
  const markdownWithMetadata = fs
    .readFileSync(join(__dirname, "..", "posts", `${id}.md`))
    .toString();
  const { content: post, data: metadata } = matter(markdownWithMetadata);
  res.statusCode = 200;
  res.json({ post, metadata });
});

module.exports = router;
