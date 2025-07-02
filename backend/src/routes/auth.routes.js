import express from 'express';

const router = express.Router();

import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/requireRole.js';
import {verify,setRole,getRoles} from '../controllers/auth.controller.js'

router.get('/verify', authMiddleware, verify);
router.post('/set-role', authMiddleware, requireRole('admin'), setRole);
router.get('/roles', authMiddleware, requireRole('admin'), getRoles);

export default router