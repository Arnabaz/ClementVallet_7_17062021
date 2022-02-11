// --- IMPORTS ---
const express = require("express");
const router = express.Router();
const {auth, role} = require("../middleware/auth");
const {verifyCommentOwner} = require("../middleware/verify-owner")
const commentCtrl = require("../controllers/comment");

// --- COMMMENT ROUTES ---
router.post("/:postId", auth, role("normal"), commentCtrl.createComment);
router.put("/:commentId", auth, role("normal"), verifyCommentOwner, commentCtrl.editComment);
router.delete("/:commentId", auth, role("normal"), verifyCommentOwner, commentCtrl.deleteComment);
router.get("/all/:postId", auth, role("normal"), commentCtrl.getAllComments);

// --- EXPORT ---
module.exports = router;