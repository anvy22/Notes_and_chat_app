import express from 'express';

const router = express.Router();

import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerMiddlewear.js';
import { getProfile,updateProfile,searchUsers,uploadAvatar } from '../controllers/user.controller.js';

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/search', authMiddleware, searchUsers);
router.post('/upload-avatar', authMiddleware, upload.single('avatar'), uploadAvatar);

export default router