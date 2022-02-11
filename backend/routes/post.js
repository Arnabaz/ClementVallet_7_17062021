// --- IMPORTS ---
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const {auth, role} = require("../middleware/auth");
const {verifyPostOwner} = require("../middleware/verify-owner")
const upload = require("../middleware/multer-config");

// --- POST ROUTES ---
router.post("/", auth, role("normal"), upload.single("post_image"), postCtrl.createPost);
router.put("/:postId", auth, role("normal"), verifyPostOwner, upload.single("post_image"), postCtrl.editPost);
router.delete("/:postId", auth, role("normal"), verifyPostOwner, postCtrl.deletePost);
router.post("/like/:postId", auth, role("normal"), postCtrl.addFeeling);
router.get("/", auth, role("normal"), postCtrl.getAllPosts);
router.get("/:postId", auth, role("normal"), postCtrl.getOnePost);
router.get("/isliked/:postId", auth, role("normal"), postCtrl.getIsPostLiked)

// --- EXPORT ---
module.exports = router;

