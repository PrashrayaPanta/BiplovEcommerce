const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");
const Post = require("../model/Post");

const postCtrl = {
  createPost: asyncHandler(async (req, res) => {
    console.log(req.body);

    const { title } = req.body;

    const { category } = req.body;

    const { content } = req.body;

    const tags = [req.body.tags];

    const slug = title.trim().toLowerCase().replace(/\s+/g, "-");

    // console.log(tags);

    await Post.create({
      title,
      postCategory: category,
      tags,
      content,
      slug,
    });

    res.status(201).json({ message: "Post Craeted succesfully" });

    // const postCreated = await Post.create({
    //   const postCraeted =   await Post.crea
    //         title:"HTML1123",
    //         category: "Padhai111",
    //         tags:["FrontEnd, Backend"]

    //     })

    // const { title } = req.body;

    // const { postCategory } = req.body;

    // const { tags } = req.body;

    // const { content } = req.body;

    // console.log(title, postCategory, tags, content);

    // console.log(postCraeted);

    // res.status(201).json({ message: "Brand created successfully", brand });
  }),

  getAllPost: asyncHandler(async (req, res) => {
    const posts = await Post.find().populate("postCategory");

    res.status(201).json({ posts });
  }),

  getPostBySlug: asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const post = await Post.findOne({ slug }).populate("postCategory");

    res.status(200).json({ post });
  }),
};

module.exports = postCtrl;
