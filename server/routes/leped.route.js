const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const lepedCtrl = require('../controllers/leped.controller');
const requireAdmin = require('../middleware/require-admin');
const fileUpload = require('express-fileupload');

const router = express.Router();
module.exports = router;

router.get('/quemSomos', asyncHandler(getQuemSomos));
router.get('/coordenadoras', asyncHandler(getCoordenadoras));
router.get('/eventos', asyncHandler(getEventos));
router.get('/galeria', asyncHandler(getGaleria));
router.get('/montarHomeLeped', asyncHandler(montarHomeLeped));
router.get('/grupo-pesquisa', [passport.authenticate('jwt', {
    session: false
})], asyncHandler(getGrupoPesquisa));
router.get('/noticia', asyncHandler(getNoticia));
router.get('/noticiaCarrossel', asyncHandler(getNoticiaCarrossel));


router.post('/quemSomos', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertQuemSomos));

router.put('/quemSomos', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateQuemSomos));

router.delete('/quemSomos/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteQuemSomos));

router.post('/coordenadoras', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertCoordenadoras));

router.put('/coordenadoras', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateCoordenadoras));

router.delete('/coordenadoras/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteCoordenadoras));

router.post('/eventos', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertEventos));

router.put('/eventos', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateEventos));

router.delete('/eventos/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteEventos));

router.post('/galeria', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertGaleria));

router.put('/galeria', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateGaleria));

router.delete('/galeria/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteGaleria));

router.post('/grupo-pesquisa', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertGrupoPesquisa));

router.put('/grupo-pesquisa', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateGrupoPesquisa));

router.delete('/grupo-pesquisa/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteGrupoPesquisa));

router.post('/noticia', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertNoticia));

router.put('/noticia', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateNoticia));

router.delete('/noticia/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteNoticia));


async function getQuemSomos(req, res) {
    let response = await lepedCtrl.getQuemSomos(req.headers.locale);
    res.json(response);
}

async function updateQuemSomos(req, res) {
    let response = await lepedCtrl.updateQuemSomos(req, req.user._id);
    res.json(response);
}

async function insertQuemSomos(req, res) {
    let response = await lepedCtrl.insertQuemSomos(req, req.user._id);
    res.json(response);
}

async function deleteQuemSomos(req, res) {
    let response = await lepedCtrl.deleteQuemSomos(req.params.id);
    res.json(response);
}

async function getCoordenadoras(req, res) {
    let response = await lepedCtrl.getCoordenadoras();
    res.json(response);
}

async function updateCoordenadoras(req, res) {
    let response = await lepedCtrl.updateCoordenadoras(req, req.user._id);
    res.json(response);
}

async function insertCoordenadoras(req, res) {
    let response = await lepedCtrl.insertCoordenadoras(req, req.user._id);
    res.json(response);
}

async function deleteCoordenadoras(req, res) {
    let response = await lepedCtrl.deleteCoordenadoras(req.params.id);
    res.json(response);
}


async function getEventos(req, res) {
    let response = await lepedCtrl.getEventos(req.headers.locale);
    res.json(response);
}

async function updateEventos(req, res) {
    let response = await lepedCtrl.updateEventos(req, req.user._id);
    res.json(response);
}

async function insertEventos(req, res) {
    let response = await lepedCtrl.insertEventos(req, req.user._id);
    res.json(response);
}

async function deleteEventos(req, res) {
    let response = await lepedCtrl.deleteEventos(req.params.id);
    res.json(response);
}

async function montarHomeLeped(req, res) {
    let response = await lepedCtrl.montarHomeLeped();
    res.json(response);
}

async function getGaleria(req, res) {
    let response = await lepedCtrl.getGaleria();
    res.json(response);
}

async function updateGaleria(req, res) {
    let response = await lepedCtrl.updateGaleria(req.body, req.user._id);
    res.json(response);
}

async function insertGaleria(req, res) {
    let response = await lepedCtrl.insertGaleria(req, req.user._id);
    res.json(response);
}

async function deleteGaleria(req, res) {
    let response = await lepedCtrl.deleteGaleria(req.params.id);
    res.json(response);
}



async function getGrupoPesquisa(req, res) {
    let response = await lepedCtrl.getGrupoPesquisa(req.user);
    res.json(response);
}

async function updateGrupoPesquisa(req, res) {
    let response = await lepedCtrl.updateGrupoPesquisa(req, req.user._id);
    res.json(response);
}

async function insertGrupoPesquisa(req, res) {
    let response = await lepedCtrl.insertGrupoPesquisa(req, req.user._id);
    res.json(response);
}

async function deleteGrupoPesquisa(req, res) {
    let response = await lepedCtrl.deleteGrupoPesquisa(req.params.id);
    res.json(response);
}


async function getNoticiaCarrossel(req, res) {
    let response = await lepedCtrl.getNoticiaCarrossel();
    res.json(response);
}

async function getNoticia(req, res) {
    let response = await lepedCtrl.getNoticia();
    res.json(response);
}

async function updateNoticia(req, res) {
    let response = await lepedCtrl.updateNoticia(req, req.user._id);
    res.json(response);
}

async function insertNoticia(req, res) {
    let response = await lepedCtrl.insertNoticia(req, req.user._id);
    res.json(response);
}

async function deleteNoticia(req, res) {
    let response = await lepedCtrl.deleteNoticia(req.params.id);
    res.json(response);
}
