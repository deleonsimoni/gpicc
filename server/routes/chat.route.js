const express = require('express');
const passport = require('passport');
const chatCtrl = require('../controllers/chat.controller');
const asyncHandler = require("express-async-handler");
const router = express.Router();
const requireAdmin = require('../middleware/require-admin');
module.exports = router;


router.get('/chat', passport.authenticate('jwt', {
    session: false
}), asyncHandler(getChat));

router.get('/chat/getUser', [passport.authenticate('jwt', {
    session: false
}), requireAdmin], asyncHandler(getUserChat));

router.post('/chat', passport.authenticate('jwt', {
    session: false
}), asyncHandler(insertChat));

router.post('/chat/postChatUserPrivate', [passport.authenticate('jwt', {
    session: false
}), requireAdmin], asyncHandler(postChatUserPrivate));

router.put('/chat', passport.authenticate('jwt', {
    session: false
}), asyncHandler(updateChat));



async function getChat(req, res) {
    let rep;
    if (req.query.id && req.user.roles.includes('admin')) {
        rep = await chatCtrl.getChatByID(req.query.id);
    } else if (req.user.roles.includes('admin')) {
        rep = await chatCtrl.getChatAdmin(req);
    } else {
        rep = await chatCtrl.getChatUser(req.user._id);
    }
    res.json(rep);
}

async function getUserChat(req, res) {

    if (req.query.email) {
        let rep = await chatCtrl.getUserChat(req.query.email);
        res.json(rep);
    } else {
        res.json();
    }
}

async function postChatUserPrivate(req, res) {
    let rep = await chatCtrl.postChatUserPrivate(req.body.msg.mensagem, req.body.user._id, req.user);
    res.json(rep);
}

async function insertChat(req, res) {
    let rep = await chatCtrl.insertChat(req.body.mensagem, req.user);
    res.json(rep);
}

async function updateChat(req, res) {
    let rep = await chatCtrl.updateChat(req.query.id, req.body.mensagem, req.user);
    res.json(rep);
}
