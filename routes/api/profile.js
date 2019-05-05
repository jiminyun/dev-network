const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

// Load Profile Model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile
// @desc   Create or update user profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    console.log(req);
    const errors = validationResult(req);
    //console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Built profile obj
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    //console.log(profileFields.skills);

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    //console.log(profileFields.social.twitter);
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sever Error");
    }
  }
);

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/profile/:user_id
// @desc   Get profile by user ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "email", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // @TODO Remove posts
    await Post.deleteMany({ user: req.user.id });
    // Remove user profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/profile/experience/:exp_id
// @desc   delete experience from profile
// @access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    console.log(removeIndex);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error");
  }
});

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
// router.get("/github/:username", (req, res) => {
//   try {
//     const options = {
//       uri: `https://api.github.com/users/${
//         req.params.username
//       }/repos?per_page=5&sort=created:asc&client_id=${config.get(
//         "githubClientId"
//       )}&client_secret=${config.get("githubSecret")}`,
//       method: "GET",
//       headers: { "user-agent": "node.js" }
//     };

//     request(options, (error, response, body) => {
//       if (error) console.error(error);

//       if (response.statusCode !== 200) {
//         return res.status(404).json({ msg: "No Github profile found" });
//       }

//       res.json(JSON.parse(body));
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route  GET api/profile
// @desc   Get Current users profile
// @access Private
// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const errors = {};

//     Profile.findOne({ user: req.user.id })
//       .populate("user", ["name", "avatar"])
//       .then(profile => {
//         if (!profile) {
//           errors.noprofile = "There is no profile for this user";
//           return res.status(404).json(errors);
//         }
//         res.json(profile);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// // @route  POST api/profile
// // @desc   Create or Edit user profile
// // @access Private
// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateProfileInput(req.body);

//     // Check Validation
//     if (!isValid) {
//       // Return any errors ith 400 status
//       return res.status(400).json(errors);
//     }
//     // Get fields
//     const profileFields = {};
//     profileFields.user = req.user.id;
//     if (req.body.handle) profileFields.handle = req.body.handle;
//     if (req.body.company) profileFields.company = req.body.company;
//     if (req.body.website) profileFields.website = req.body.website;
//     if (req.body.location) profileFields.location = req.body.location;
//     if (req.body.bid) profileFields.bid = req.body.bid;
//     if (req.body.status) profileFields.status = req.body.status;
//     if (req.body.githubusername)
//       profileFields.githubusername = req.body.githubusername;

//     // Skills - split into array
//     if (typeof req.body.skills !== "undefined") {
//       profileFields.skills = req.body.skills.split(",");
//     }

//     // Social
//     profileFields.social = {};
//     if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
//     if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
//     if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
//     if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
//     if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

//     Profile.findOne({ user: req.user.id }).then(profile => {
//       if (profile) {
//         // Update
//         Profile.findOneAndUpdate(
//           {
//             user: req.user.id
//           },
//           { $set: profileFields },
//           { useFindAndModify: false }
//         ).then(profile => res.json(profile));
//       } else {
//         // Create
//         // Check if handle exists
//         Profile.findOne({ handle: profileFields.handle }).then(profile => {
//           if (profile) {
//             errors.handle = "That handle already exists";
//             res.status(400).json(errors);
//           }

//           // Save Profile
//           new Profile(profileFields).save().then(profile => res.json(profile));
//         });
//       }
//     });
//   }
// );

// // @route  GET api/profile/handle/:handle
// // @desc   Get profile by handle
// // @access Public
// router.get("/handle/:handle", (req, res) => {
//   const errors = {};

//   Profile.findOne({ handle: req.params.handle })
//     .populate("user", ["name", "avatar"])
//     .then(profile => {
//       if (!profile) {
//         errors.noprofile = "There is no profile for this use";
//         res.status(404).json(errors);
//       }
//       res.json(profile);
//     })
//     .catch(err => res.status(404).json(err));
// });

// // @route  GET api/profile/all
// // @desc   Get all profile
// // @access Public
// router.get("all", (req, res) => {
//   const errors = {};

//   Profile.find()
//     .populate("user", ["name", "avatar"])
//     .then(profiles => {
//       if (!profiles) {
//         errors.noprofile = "There are no profiles";
//         return res.status(404).json(errors);
//       }

//       res.json(profiles);
//     })
//     .catch(err => res.status(404).json({ profile: "" }));
// });

// // @route  GET api/profile/user/:user_id
// // @desc   Get profile by user ID
// // @access Public
// router.get("/user/:user_id", (req, res) => {
//   const errors = {};

//   Profile.findOne({ user: req.params.user_id })
//     .populate("user", ["name", "avatar"])
//     .then(profile => {
//       if (!profile) {
//         errors.noprofile = "There is no profile for this user";
//         res.status(404).json(error);
//       }
//       res.json(profile);
//     })
//     .catch(err =>
//       res.status(404).json({ profile: "There is no profile for this user" })
//     );
// });

// // @route  POST api/profile/experience
// // @desc   Add experience to profile
// // @access Private
// router.post(
//   "/experience",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     //console.log(req.body);
//     const { errors, isValid } = validateExperienceInput(req.body);

//     // Check Validation
//     if (!isValid) {
//       // Return any errors ith 400 status
//       return res.status(400).json(errors);
//     }

//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newExp = {
//         title: req.body.title,
//         company: req.body.company,
//         location: req.body.location,
//         from: req.body.from,
//         to: req.body.to,
//         current: req.body.current,
//         description: req.body.description
//       };

//       // Add to exp array
//       profile.experience.unshift(newExp);
//       profile.save().then(profile => res.json(profile));
//     });
//   }
// );

// // @route  POST api/profile/education
// // @desc   Add education to profile
// // @access Private
// router.post(
//   "/education",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     console.log("education", req.body);
//     const { errors, isValid } = validateEducationInput(req.body);

//     // Check Validation
//     if (!isValid) {
//       // Return any errors ith 400 status
//       return res.status(400).json(errors);
//     }

//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newEdu = {
//         school: req.body.school,
//         degree: req.body.degree,
//         fieldofstudy: req.body.fieldofstudy,
//         from: req.body.from,
//         to: req.body.to,
//         current: req.body.current,
//         description: req.body.description
//       };

//       // Add to exp array
//       profile.education.unshift(newEdu);
//       profile.save().then(profile => res.json(profile));
//     });
//   }
// );

// // @route  DELETE api/profile/experience/:exp_id
// // @desc   Delete experience from profile
// // @access Private
// router.delete(
//   "/experience/:exp_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         // Get remove index
//         const removeIndex = profile.experience
//           .map(item => item.id)
//           .indexOf(req.params.exp_id);

//         // Splice out of array
//         profile.experience.splice(removeIndex, 1);

//         // Save
//         profile.save().then(profile => res.json(profile));
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// // @route  DELETE api/profile/education/:edu_id
// // @desc   Delete experience from profile
// // @access Private
// router.delete(
//   "/education/:edu_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         // Get remove index
//         const removeIndex = profile.education
//           .map(item => item.id)
//           .indexOf(req.params.edu_id);

//         // Splice out of array
//         profile.education.splice(removeIndex, 1);

//         // Save
//         profile.save().then(profile => res.json(profile));
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// // @route  DELETE api/profile
// // @desc   Delete user and profile
// // @access Private
// router.delete(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOneAndRemove({ user: req.user.id }).then(() => {
//       User.findByIdAndRemove({ _id: req.user.id }).then(() =>
//         res.json({ success: true })
//       );
//     });
//   }
// );
module.exports = router;
