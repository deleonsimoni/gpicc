const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const cominduCtrl = require('../controllers/comindu.controller');
const userController = require('../controllers/user.controller');
const requireAdmin = require('../middleware/require-admin');
const fileUpload = require('express-fileupload');

const router = express.Router();
module.exports = router;

router.get('/tags', asyncHandler(getTags));
router.get('/comunidades', passport.authenticate('jwt', {
    session: false
}), asyncHandler(getComunidades));

router.get('/comunidades-free', asyncHandler(getComunidades));

router.get('/comunidadesById/:comunidade', asyncHandler(getComunidadesById));
router.get('/comunidade/:comunidade/chats/:post', asyncHandler(getChats));
router.post('/comunidade/:comunidade/chats/:post/block', asyncHandler(blockPost));
router.post('/comunidade/:comunidade/chats/:post/unblock', asyncHandler(unblockPost));

router.get('/listAdmins', [passport.authenticate('jwt', {
    session: false
}), requireAdmin,], asyncHandler(listAdmins));

router.get('/user/getInscricoes', passport.authenticate('jwt', {
    session: false
}), asyncHandler(getUserInscricoes));

router.get('/minhascomunidades', passport.authenticate('jwt', {
    session: false
}), asyncHandler(minhasComunidades));

router.post('/comunidade/:comunidade/postChat/:post/chat', [passport.authenticate('jwt', {
    session: false
}), fileUpload()], asyncHandler(postChat));

router.delete('/comunidade/:comunidade/postChat/:post/chat/:idChat', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteChat));

router.delete('/comunidade/:comunidade', [passport.authenticate('jwt', {
    session: false
}), requireAdmin,], asyncHandler(deleteComunidade));

router.post('/comunidade', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertComunidade));

router.put('/comunidade', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateComunidade));

router.post('/subscribe/:comunidade', passport.authenticate('jwt', {
    session: false
}), asyncHandler(subscribeComunidade));

router.post('/unsubscribe/:comunidade', passport.authenticate('jwt', {
    session: false
}), asyncHandler(unsubscribeComunidade));

router.post('/postSend/:comunidade', passport.authenticate('jwt', {
    session: false
}), asyncHandler(postSend));

router.post('/inativarComunidade/:comunidade', [passport.authenticate('jwt', {
    session: false
}), requireAdmin], asyncHandler(inativarComunidade));

router.post('/ativarComunidade/:comunidade', [passport.authenticate('jwt', {
    session: false
}), requireAdmin], asyncHandler(ativarComunidade));

router.post('/resetPassword', [passport.authenticate('jwt', {
    session: false
}), requireAdmin], asyncHandler(resetPassword));

router.delete('/comunidade/:comunidade/chats/:post', [passport.authenticate('jwt', {
    session: false
}), requireAdmin], asyncHandler(deletePost));

async function resetPassword(req, res) {
    let response = await userController.resetPassword(req.body._id, req.body.newPassword);
    res.json(response);
}

async function getChats(req, res) {
    let response = await cominduCtrl.getChats(req.params.comunidade, req.params.post);
    res.json(response);
}

async function deletePost(req, res) {
    let response = await cominduCtrl.deletePost(req.params.comunidade, req.params.post);
    res.json(response);
}

async function blockPost(req, res) {
    let response = await cominduCtrl.blockPost(req.params.comunidade, req.params.post);
    res.json(response);
}

async function unblockPost(req, res) {
    let response = await cominduCtrl.unblockPost(req.params.comunidade, req.params.post);
    res.json(response);
}

async function inativarComunidade(req, res) {
    let response = await cominduCtrl.inativarComunidade(req.params.comunidade);
    res.json(response);
}

async function ativarComunidade(req, res) {
    let response = await cominduCtrl.ativarComunidade(req.params.comunidade);
    res.json(response);
}

async function updateComunidade(req, res) {
    let response = await cominduCtrl.updateComunidade(req, req.user._id);
    res.json(response);
}

async function postChat(req, res) {
    let response = await cominduCtrl.postChat(req.params.comunidade, req.params.post, req.user._id, req.body);
    res.json(response);
}

async function deleteChat(req, res) {
    let response = await cominduCtrl.deleteChat(req.params.comunidade, req.params.post, req.params.idChat);
    res.json(response);
}

async function deleteComunidade(req, res) {
    let response = await cominduCtrl.deleteComunidade(req.params.comunidade);
    res.json(response);
}

async function listAdmins(req, res) {
    let response = await cominduCtrl.listAdmins();
    res.json(response);
}


async function postSend(req, res) {
    let response = await cominduCtrl.postSend(req.params.comunidade, req.user._id, req.body);
    res.json(response);
}
async function subscribeComunidade(req, res) {
    let response = await cominduCtrl.subscribeComunidade(req.params.comunidade, req.user._id);
    res.json(response);
}
async function unsubscribeComunidade(req, res) {
    let response = await cominduCtrl.unsubscribeComunidade(req.params.comunidade, req.user._id);
    res.json(response);
}
async function getComunidadesById(req, res) {
    let response = await cominduCtrl.getComunidadesById(req.params.comunidade);
    res.json(response);
}
async function getUserInscricoes(req, res) {
    let response = await cominduCtrl.getUserInscricoes(req.user._id);
    res.json(response);
}

async function getTags(req, res) {
    let response = await cominduCtrl.getTags();
    res.json(response);
}

async function getComunidades(req, res) {
    let response = await cominduCtrl.getComunidades(req.user);
    res.json(response);
}

async function minhasComunidades(req, res) {
    let response = await cominduCtrl.minhasComunidades(req.user._id);
    res.json(response);
}

async function insertComunidade(req, res) {
    let response = await cominduCtrl.insertComunidade(req, req.user._id);
    res.json(response);
}
