import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const router = express.Router();

/* GET users listing. */
router.get('/search', async (req, res, next) => {
  const { word } = req.query;
  
  const result = await axios.get(`https://dict.naver.com/search.nhn?query=${word}`);

  const $ = cheerio.load(result.data);

  let pronunciation = [];
  $(`.en_dic_section > dl > dt > span.fnt_e25`).each(function() {
    pronunciation.push($(this).text().replace(/(^\s+|\s+$)/g, ""));
  });

  pronunciation = pronunciation[0] || '';

  let meaning_raw = [];
  $(`.en_dic_section > dl > dd`).each(function() {
    meaning_raw.push($(this).text().replace(/(^\s+|\s+$)/g, ""));
  });

  meaning_raw = meaning_raw[0] || '';

  let meanings = [];
  let line_num = 2;
  let index1 = 0;
  let index2 = -1;

  if (meaning_raw.charAt(0) === '1') {
    while ((index2 = meaning_raw.indexOf(line_num)) !== -1) {
      meanings.push(meaning_raw.substring(index1, index2));
      index1 = index2;
      line_num ++;
    }
  }

  meanings.push(meaning_raw.substring(index1, meaning_raw.length));

  let mp3 = [];
  $(`.en_dic_section > dl > dt > a.play`).each(function() {
    mp3.push($(this).attr('playlist').replace(/(^\s+|\s+$)/g, ""));
  });

  mp3 = mp3[0] || '';

  res.json({ mp3, meanings, pronunciation })
});

export default router;