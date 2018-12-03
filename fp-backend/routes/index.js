import express from 'express';
import account from './account';
import naverDict from './naverDict';
import wordbook from './wordbook';

const router = express.Router();
router.use('/account', account);
router.use('/dict', naverDict);
router.use('/wordbook', wordbook);

export default router;
