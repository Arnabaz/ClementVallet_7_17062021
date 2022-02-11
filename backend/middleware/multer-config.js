// --- IMPORTS ---
const multer = require("multer");

/// --- MULTER CONFIGURATION ---
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif"
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname === "post_image") {
            callback(null, "./images/posts/");
        } else if (file.fieldname === "profile_image") {
            callback(null, "./images/profiles/")
        } else {
            callback(null, "./images")
        }
    },
    filename: (req, file, callback) => {
        let name = file.originalname.split(".")[0].split(" ").join("_");
        let extension = MIME_TYPES[file.mimetype];
        callback(null, name + "_" + Date.now() + "." + extension);
    }
});

const upload = multer({storage: storage});

module.exports = upload;