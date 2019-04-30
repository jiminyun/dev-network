const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

// Post model
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route  POST api/posts
// @desc   Create post route
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route  GET api/posts
// @desc   Get all posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/posts/:id
// @desc   Get post by ID
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/posts/:id
// @desc   Delete a post by post_id
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/posts/like/:id
// @desc   Like a post by post id
// @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/posts/unlike/:id
// @desc   unLike a post
// @access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.user.id);

    // if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/posts/comment/:id
// @desc   Comment on a post
// @access Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(rea.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Delete comment
// @access Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.message);
  } catch (err) {
    console.error(err.comments);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/posts/test
// @desc   Tests post route
// @access Public
// router.get("/test", (req, res) => res.json({ msg: "Posts Work" }));

// // @route  POST api/posts
// // @desc   GET post
// // @access Public
// router.get("/", (req, res) => {
//   Post.find()
//     .sort({ date: -1 })
//     .then(posts => res.json(posts))
//     .catch(err =>
//       res.status(404).json({ nopostsfound: "no posts found with that id" })
//     );
// });

// // @route  GET api/posts/:id
// // @desc   GET post by id
// // @access Public
// router.get("/:id", (req, res) => {
//   Post.findById(req.params.id)
//     .then(post => res.json(post))
//     .catch(err =>
//       res.status(404).json({ nopostfound: "no post found with that id" })
//     );
// });

// // @route  POST api/posts
// // @desc   Create post
// // @access Private
// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validatePostInput(req.body);
//     console.log(req.body);
//     // Check Validation
//     if (!isValid) {
//       // If any errors, send 400 with errors object
//       return res.status(400).json(errors);
//     }
//     const newPost = new Post({
//       text: req.body.text,
//       name: req.body.name,
//       avatar: req.body.avatar,
//       user: req.user.id
//     });

//     newPost.save().then(post => res.json(post));
//   }
// );

// // @route  DELETE api/posts/:id
// // @desc   DELETE post
// // @access Private
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile =>
//       Post.findById(req.params.id)
//         .then(post => {
//           // Check for post owner
//           if (post.user.toString() !== req.user.id) {
//             return res
//               .status(401)
//               .json({ notauthorized: "User not authorized" });
//           }

//           //Delete
//           post.remove().then(() => res.json({ success: true }));
//         })
//         .catch(err => res.status(404).json({ postnotfound: "No post found" }))
//     );
//   }
// );

// // @route  POST api/posts/like/:id
// // @desc   Like post
// // @access Private
// router.delete(
//   "/like/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile =>
//       Post.findById(req.params.id)
//         .then(post => {
//           if (
//             post.likes.filter(like => like.user.toString() === req.user.id)
//               .length > 0
//           ) {
//             return res
//               .status(400)
//               .json({ alreadyliked: "User already like this post" });
//           }
//           // Add user id to likes array
//           post.likes.unshift({ user: req.user.id });
//           post.save().then(post => res.json(post));
//         })
//         .catch(err => res.status(404).json({ postnotfound: "No post found" }))
//     );
//   }
// );

// // @route  POST api/posts/unlike/:id
// // @desc   unLike post
// // @access Private
// router.delete(
//   "/unlike/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile =>
//       Post.findById(req.params.id)
//         .then(post => {
//           if (
//             post.likes.filter(like => like.user.toString() === req.user.id)
//               .length == 0
//           ) {
//             return res
//               .status(400)
//               .json({ notliked: "You have not yet liked this post" });
//           }
//           // Get remove index
//           const removeIndex = post.likes
//             .map(item => item.use.toString())
//             .indexOf(req.user.id);

//           // Splice out of array
//           post.likes.splice(removeIndex, 1);

//           // Save
//           post.save().then(post => res.json(post));
//         })
//         .catch(err => res.status(404).json({ postnotfound: "No post found" }))
//     );
//   }
// );

// // @route  POST api/posts/comment/:id (post_id)
// // @desc   Add comment to post
// // @access Private
// router.post(
//   "/comment/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validatePostInput(req.body);
//     console.log(req.body);
//     // Check Validation
//     if (!isValid) {
//       // If any errors, send 400 with errors object
//       return res.status(400).json(errors);
//     }
//     Post.findById(req.params.id)
//       .then(post => {
//         const newComment = {
//           text: req.body.text,
//           name: req.body.name,
//           avatar: req.body.avatar,
//           user: req.user.id
//         };

//         // Add to comment array
//         post.comments.unshift(newComment);

//         // Save
//         post.save().then(post => res.json(post));
//       })
//       .catch(err => res.status(404).json({ postotfount: "No post found" }));
//   }
// );

// // @route  DELETE api/posts/comment/:id/:comment_id (post_id)
// // @desc   Remove comment from post
// // @access Private
// router.delete(
//   "/comment/:id/:comment_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Post.findById(req.params.id)
//       .then(post => {
//         // Check to see if comment exists
//         if (
//           post.comments.filter(
//             comment => comment._id.toString() === req.params.id
//           ).length === 0
//         ) {
//           return res
//             .status(404)
//             .json({ commentnotexists: "Commment does not exist" });
//         }

//         // Get remove index
//         const removeIndex = post.comments
//           .map(item => item._id.toString())
//           .indexOf(req.params.comment_id);

//         // Splice comment out of array
//         post.comments.splice(removeIndex, 1);
//         post.save().then(post => res.json(post));
//       })
//       .catch(err => res.status(404).json({ postotfount: "No post found" }));
//   }
// );
module.exports = router;
