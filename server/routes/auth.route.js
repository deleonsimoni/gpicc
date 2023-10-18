const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const fileUpload = require('express-fileupload');

const router = express.Router();
module.exports = router;

router.post('/register', [fileUpload()], asyncHandler(register), login);
router.post('/changePassword', [passport.authenticate('jwt', {
  session: false
})], asyncHandler(changePassword));


router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);
router.get('/me', passport.authenticate('jwt', { session: false }), login);

async function changePassword(req, res) {
  let response = await userCtrl.changePassword(req.user._id, req.body.senha);
  res.json(response);
}

async function register(req, res, next) {
  let user = await userCtrl.insert(req);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next();
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
