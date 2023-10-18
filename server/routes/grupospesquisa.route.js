const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const grupospesquisaCtrl = require('../controllers/grupospesquisa.controller');
const requireAdmin = require('../middleware/require-admin');
const fileUpload = require('express-fileupload');

const router = express.Router();
module.exports = router;


router.get('/participantes-grupo', asyncHandler(getParticipantesgp));
router.get('/pesquisas', asyncHandler(getPesquisasgp));
router.get('/teses', asyncHandler(getTesesgp));
router.get('/artigos', asyncHandler(getArtigosgp));
router.get('/livro', asyncHandler(getLivrosgp));
router.get('/capitulos', asyncHandler(getCapitulosgp));
router.get('/parceiros', asyncHandler(getParceirosgp));
router.get('/extensao-ensino', asyncHandler(getExtensaoEnsinogp));

router.post('/extensao-ensino', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertExtensaoEnsinogp));

router.put('/extensao-ensino', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateExtensaoEnsinogp));

router.delete('/extensao-ensino/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deletarExtensaoEnsinogp));

router.post('/participantes-grupo', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertParticipantesgp));

router.put('/participantes-grupo', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateParticipantesgp));

router.delete('/participantes-grupo/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteParticipantesgp));

router.post('/pesquisas', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertPesquisasgp));

router.put('/pesquisas', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updatePesquisasgp));

router.delete('/pesquisas/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deletePesquisasgp));

router.post('/artigos', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertArtigosgp));

router.put('/artigos', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateArtigosgp));

router.delete('/artigos/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteArtigosgp));

router.post('/livro', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertLivrosgp));

router.put('/livro', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateLivrosgp));

router.delete('/livro/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteLivrosgp));

router.post('/capitulos', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertCapitulosgp));

router.put('/capitulos', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateCapitulosgp));

router.delete('/capitulos/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteCapitulosgp));

router.post('/teses', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertTesesgp));

router.put('/teses', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateTesesgp));

router.delete('/teses/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteTesesgp));

router.post('/parceiros', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertParceirosgp));

router.put('/parceiros', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateParceirosgp));

router.delete('/parceiros/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteParceirosgp));

async function getArtigosgp(req, res) {
    let response = await grupospesquisaCtrl.getArtigosgp(req);
    res.json(response);
}

async function getParticipantesgp(req, res) {
    let response = await grupospesquisaCtrl.getParticipantesgp(req);
    res.json(response);
}

async function updateParticipantesgp(req, res) {
    let response = await grupospesquisaCtrl.updateParticipantesgp(req, req.user._id);
    res.json(response);
}

async function insertParticipantesgp(req, res) {
    let response = await grupospesquisaCtrl.insertParticipantesgp(req, req.user._id);
    res.json(response);
}

async function deleteParticipantesgp(req, res) {
    let response = await grupospesquisaCtrl.deleteParticipantesgp(req.params.id, req);
    res.json(response);
}



async function getParceirosgp(req, res) {
    let response = await grupospesquisaCtrl.getParceirosgp(req);
    res.json(response);
}

async function updateParceirosgp(req, res) {
    let response = await grupospesquisaCtrl.updateParceirosgp(req, req.user._id);
    res.json(response);
}

async function insertParceirosgp(req, res) {
    let response = await grupospesquisaCtrl.insertParceirosgp(req, req.user._id);
    res.json(response);
}

async function deleteParceirosgp(req, res) {
    let response = await grupospesquisaCtrl.deleteParceirosgp(req.params.id, req);
    res.json(response);
}

async function getExtensaoEnsinogp(req, res) {
    let response = await grupospesquisaCtrl.getExtensaoEnsinogp(req);
    res.json(response);
}

async function updateExtensaoEnsinogp(req, res) {
    let response = await grupospesquisaCtrl.updateExtensaoEnsinogp(req, req.user._id);
    res.json(response);
}

async function insertExtensaoEnsinogp(req, res) {
    let response = await grupospesquisaCtrl.insertExtensaoEnsinogp(req, req.user._id);
    res.json(response);
}

async function deletarExtensaoEnsinogp(req, res) {
    let response = await grupospesquisaCtrl.deleteExtensaoEnsinogp(req.params.id, req);
    res.json(response);
}

async function getArtigogps(req, res) {
    let response = await grupospesquisaCtrl.getArtigosgp(req);
    res.json(response);
}

async function updateArtigosgp(req, res) {
    let response = await grupospesquisaCtrl.updateArtigosgp(req, req.user._id);
    res.json(response);
}

async function insertArtigosgp(req, res) {
    let response = await grupospesquisaCtrl.insertArtigosgp(req, req.user._id);
    res.json(response);
}

async function deleteArtigosgp(req, res) {
    let response = await grupospesquisaCtrl.deleteArtigosgp(req.params.id, req);
    res.json(response);
}



async function getPesquisasgp(req, res) {
    let response = await grupospesquisaCtrl.getPesquisasgp(req);
    res.json(response);
}

async function updatePesquisasgp(req, res) {
    let response = await grupospesquisaCtrl.updatePesquisasgp(req, req.user._id);
    res.json(response);
}

async function insertPesquisasgp(req, res) {
    let response = await grupospesquisaCtrl.insertPesquisasgp(req, req.user._id);
    res.json(response);
}

async function deletePesquisasgp(req, res) {
    let response = await grupospesquisaCtrl.deletePesquisasgp(req.params.id, req);
    res.json(response);
}



async function getTesesgp(req, res) {
    let response = await grupospesquisaCtrl.getTesesgp(req);
    res.json(response);
}

async function updateTesesgp(req, res) {
    let response = await grupospesquisaCtrl.updateTesesgp(req, req.user._id);
    res.json(response);
}

async function insertTesesgp(req, res) {
    let response = await grupospesquisaCtrl.insertTesesgp(req, req.user._id);
    res.json(response);
}

async function deleteTesesgp(req, res) {
    let response = await grupospesquisaCtrl.deleteTesesgp(req.params.id, req);
    res.json(response);
}

async function getCapitulosgp(req, res) {
    let response = await grupospesquisaCtrl.getCapitulosgp(req);
    res.json(response);
}

async function updateCapitulosgp(req, res) {
    let response = await grupospesquisaCtrl.updateCapitulosgp(req, req.user._id);
    res.json(response);
}

async function insertCapitulosgp(req, res) {
    let response = await grupospesquisaCtrl.insertCapitulosgp(req, req.user._id);
    res.json(response);
}

async function deleteCapitulosgp(req, res) {
    let response = await grupospesquisaCtrl.deleteCapitulosgp(req.params.id, req);
    res.json(response);
}

async function getLivrosgp(req, res) {
    let response = await grupospesquisaCtrl.getLivrosgp(req);
    res.json(response);
}

async function updateLivrosgp(req, res) {
    let response = await grupospesquisaCtrl.updateLivrosgp(req, req.user._id);
    res.json(response);
}

async function insertLivrosgp(req, res) {
    let response = await grupospesquisaCtrl.insertLivrosgp(req, req.user._id);
    res.json(response);
}

async function deleteLivrosgp(req, res) {
    let response = await grupospesquisaCtrl.deleteLivrosgp(req.params.id, req);
    res.json(response);
}