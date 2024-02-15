import express from 'express';
import { getUsers } from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getUsers);

export default router;
