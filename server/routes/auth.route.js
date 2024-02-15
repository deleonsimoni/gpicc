const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const fileUpload = require('express-fileupload');

const router = express.Router();
module.exports = router;

router.get("/usrs", passport.authenticate("jwt", { session: false, }), getUsers);
router.post("/setadmin/:id", passport.authenticate("jwt", { session: false, }), setAdmin);
router.post("/unsetadmin/:id", passport.authenticate("jwt", { session: false, }), unsetAdmin);

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

async function setAdmin(req, res) {

  if (req.user.roles.indexOf('admin') >= 0) {
    let users = await userCtrl.setAdmin(req.params.id);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function unsetAdmin(req, res) {
  if (req.user.roles.indexOf('admin') >= 0) {
    let users = await userCtrl.unsetAdmin(req.params.id);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function getUsers(req, res) {

  if (req.user.roles.indexOf('admin') >= 0) {
    let users = await userCtrl.getUsersAdmin();
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

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
