import express from 'express';
import { test, update, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken, update);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
