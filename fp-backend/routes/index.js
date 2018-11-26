import express from 'express';
import account from './account';
import naver_dict from './naver_dict';

const router = express.Router();
router.use('/account', account);
router.use('/dict', naver_dict);

export default router;