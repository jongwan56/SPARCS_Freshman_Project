import express from 'express';
import Account from '../models/account';

const router = express.Router();

/*
  ACCOUNT SIGNUP: POST /api/account/signup
  BODY SAMPLE: { "id": "test", "password": "test" }
  ERROR CODES:
      1: BAD ID
      2: BAD PASSWORD
      3: ID EXISTS
*/
router.post('/signup', (req, res) => {
  // CHECK ID FORMAT
  const idRegex = /^[a-z0-9]+$/;
  console.log(req.body)

  if(!idRegex.test(req.body.id)) {
    return res.status(400).json({
      error: "BAD ID",
      code: 1
    });
  }

  // CHECK PASS LENGTH
  if (req.body.password.length < 8 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }

  // CHECK USER EXISTANCE
  Account.findOne({ id: req.body.id }, (err, exists) => {
    if (err) throw err;
    if (exists){
      return res.status(409).json({
        error: "ID EXISTS",
        code: 3
      });
    }

    // CREATE ACCOUNT
    let account = new Account({
      name: req.body.name,
      id: req.body.id,
      password: req.body.password,
    });

    account.password = account.generateHash(account.password);

    // SAVE IN THE DATABASE
    account.save( err => {
      if(err) throw err;
      return res.json({ success: true });
    });
  });
});

/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: SIGNIN FAILED
        2: ID NOT FOUND
        3: PASSWORD MISMATCH
*/
router.post('/signin', (req, res) => {
  // console.log(req.body);

  if (typeof req.body.password !== "string") {
    return res.status(401).json({
      error: "SIGNIN FAILED",
      code: 1,
    });
  }

  // FIND THE USER BY USERNAME
  Account.findOne({ id: req.body.id }, (err, account) => {
    if(err) throw err;

    // console.log(account);

    // CHECK ACCOUNT EXISTANCY
    if(!account) {
      return res.status(401).json({
        error: "ID NOT FOUND",
        code: 2,
      });
    }

    // CHECK WHETHER THE PASSWORD IS VALID
    if(!account.validateHash(req.body.password)) {
      return res.status(401).json({
        error: "PASSWORD MISMATCH",
        code: 3,
      });
    }

    // ALTER SESSION
    // console.log(req.session);
    req.session.loginInfo = {
      _id: account._id,
      id: account.id,
    };

    // RETURN SUCCESS
    return res.json({
      success: true,
    });
  });
});

/*
    GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('/getinfo', (req, res) => {
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: 1
    });
  }

  res.json({ info: req.session.loginInfo });
});

/*
    LOGOUT: POST /api/account/logout
*/
router.post('/signout', (req, res) => {
  req.session.destroy(err => { if (err) throw err; });
  return res.json({ sucess: true });
});

export default router;