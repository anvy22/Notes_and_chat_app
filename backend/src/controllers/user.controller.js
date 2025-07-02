import User from "../models/User.js";
import { CloudinaryUpload } from "../utils/Cloudinary.js";


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v -clerkId");
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, settings } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(bio && { bio }),
        ...(settings && { settings }),
      },
      { new: true }
    ).select("-__v -clerkId");

    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// GET /api/users/search?q=term&limit=10
export const searchUsers = async (req, res) => {
  try {
    const { q = "", limit = 10 } = req.query;

    const regex = new RegExp(q, "i");
    const users = await User.find({
      $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
    })
      .limit(Number(limit))
      .select("username avatar isOnline");

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


export const uploadAvatar = async (req, res) => {
  try {
    const avatarLocalPath = req.file.avatar.path;

    if (!avatarLocalPath) {
      res.status(400).json({success:false,error:"Aavatar LocalPath Are Require"})
    }
    const Avatar = await CloudinaryUpload(avatarLocalPath)
    const url = Avatar.url
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: url },
      { new: true }
    );

    res.status(200).json({ success: true, url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Avatar upload failed" });
  }
};
