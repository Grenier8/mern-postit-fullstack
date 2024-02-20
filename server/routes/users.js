import express from 'express';
import { getUsers, getUser, getUserFriends, addRemoveFriend } from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
