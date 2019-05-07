const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const upload = require("../../middleware/multer");

router.post("/", auth, upload, async (req, res, next) => {
  //console.log(req.user.id);
  try {
    let user = await User.findOne({ _id: req.user.id });

    // Update
    if (user) {
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { avatar: req.file.location } },
        { new: true }
      );
    }

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error");
  }
});

module.exports = router;
