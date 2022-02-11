// --- IMPORTS ---
const express = require("express");
const router = express.Router();
const {auth, role} = require("../middleware/auth");
const upload = require("../middleware/multer-config");
const userCtrl = require("../controllers/user");

// --- USER ROUTES ---
router.put("/:id", auth, role("normal"), upload.single("profile_image"), userCtrl.updateUser);
router.delete("/:id", auth, role("normal"), userCtrl.deleteUser);
router.get("/", auth, role("admin-only"), userCtrl.getAllUsers);
router.get("/:id", auth, role("normal"), userCtrl.getUserInfo);

// --- EXPORT ---
module.exports = router;