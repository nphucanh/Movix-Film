import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import multer from "multer";

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only JPEG, PNG, and GIF files are allowed."), false);
    } else {
      cb(null, true);
    }
  },
});

// Middleware for image upload
export const uploadImage = upload.single("image");

// Update profile function
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the token
    const { username, email, password } = req.body; // Extract data from request

    if (!username && !password && !email && !req.file) {
      return res.status(400).json({ error: "At least one field must be provided." });
    }

    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      updates.password = await bcryptjs.hash(password, salt);
    }

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`; // Save image path
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
