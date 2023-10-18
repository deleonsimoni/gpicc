const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const fileUpload = require('express-fileupload');
const requireAdmin = require('../middleware/require-admin');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(asyncHandler(insert));

router.put('/updateBio', [passport.authenticate('jwt', {
  session: false
}), fileUpload()], asyncHandler(updateBio));

router.get("/usrs?:page", [passport.authenticate("jwt", { session: false, }), requireAdmin], asyncHandler(getUsers));

router.post("/confirmComprovante/:id", [passport.authenticate("jwt", { session: false, }), requireAdmin], asyncHandler(confirmComprovante));
router.post("/negarComprovante/:id", [passport.authenticate("jwt", { session: false, }), requireAdmin], asyncHandler(negarComprovante));


async function confirmComprovante(req, res) {
  console.log('confirmando')
  let users = await userCtrl.confirmComprovante(req.params.id);
  res.json(users);

}

async function negarComprovante(req, res) {
  let users = await userCtrl.negarComprovante(req.params.id);
  res.json(users);

}

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function updateBio(req, res) {
  let response = await userCtrl.updateBio(req);
  res.json(response);
}

async function getUsers(req, res) {
  let users = await userCtrl.getUsers(req);
  res.json(users);
}