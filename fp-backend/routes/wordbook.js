import express from 'express';
import Wordbook from '../models/wordbook';
import Word from '../models/word';
import Account from '../models/account';
import Chapter from '../models/chapter';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/:wordbookId', (req, res) => {
  // if (typeof req.session.loginInfo === 'undefined') {
  //   return res.status(403).json({
  //     error: "NOT LOGGED IN",
  //     code: 1
  //   });
  // }
  Wordbook.findById(req.params.wordbookId, async (err, wordbook) => {
    if (err) throw err;

    return res.json({ wbId: wordbook._id,
                      wbName: wordbook.name,
                      imgSrc: wordbook.imgSrc,
                      wbDescription: wordbook.description,
                      totalWords: wordbook.totalWords,
                      totalChapters: wordbook.chapters.length,
                      chapters: wordbook.chapters,
                      wbPercentage: wordbook.percentage });
  });
});

router.get('/', (req, res) => {
  // if (typeof req.session.loginInfo === 'undefined') {
  //   return res.status(403).json({
  //     error: "NOT LOGGED IN",
  //     code: 1
  //   });
  // }
  Account.findById(req.session.loginInfo._id, (err, account) => {
    if (err) throw err;
    console.log(account.wordbooks);
    return res.json({ wordbooks: account.wordbooks });
  });
});

router.get('/chapter/:chapterId', (req, res) => {
  const chapterId = req.params.chapterId;

  Chapter.findById(chapterId, (err, chapter) => {
    return res.json({ chapter });
  });
});

router.get('/word/:wordId', (req, res) => {
  const wordId = req.params.wordId;

  Word.findById(wordId, (err, word) => {
    for (let i=0; i<word.checks.length; i++) {
      if (word.checks[i].user_id === req.session.loginInfo._id) {
        console.log('ㅇㅇ')
        return res.json({ word, check: word.checks[i].state });
      }
    }
    return res.json({ word, check: 'Never' });
  })
});

// CHECK STATE UPDATE
router.put('/check', (req, res) => {
  if (typeof req.session.loginInfo === 'undefined') {
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 1
    });
  }
  Word.findById(req.body.wordId, (err, word) => {
    if (err) throw err;

    // IF MEMO DOES NOT EXIST
    // if(!memo) {
    //     return res.status(404).json({
    //         error: "NO RESOURCE",
    //         code: 4
    //     });
    // }

    // IF EXISTS, CHECK WRITER
    // if (memo.writer != req.session.loginInfo.username) {
    //     return res.status(403).json({
    //         error: "PERMISSION FAILURE",
    //         code: 5
    //     });
    // }

    // MODIFY AND SAVE IN DATABASE
    // memo.contents = req.body.contents;
    // memo.date.edited = new Date();
    // memo.is_edited = true;
    
    // if (req.body.checkState === 'good') {  
    // }
    for (let i=0 ; i<word.checks.length ; i++) {
      if (word.checks[i].user_id === req.session.loginInfo._id) {
        word.checks[i].state = req.body.checkState;
        word.save((error, wrd) => {
          if (error) throw error;
          return res.json({
            success: true,
          });
        });
        return;
      }
    }
    word.checks.push({ user_id: req.session.loginInfo._id, state: req.body.checkState });
    word.save((error, wrd) => {
      if (error) throw error;
      return res.json({
        success: true,
      });
    });
  });
});

export default router;
