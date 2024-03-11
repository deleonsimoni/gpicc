const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const gpiccUserController = require('../controllers/gpicc-user.controller');
const fileUpload = require('express-fileupload');
const requireAdmin = require('../middleware/require-admin');

const router = express.Router();
module.exports = router;


router.get('/home', asyncHandler(getHome));
router.get('/pesquisa', asyncHandler(getPesquisa));
router.get('/livro', asyncHandler(getLivro));
router.get('/artigo', asyncHandler(getArtigo));
router.get('/capitulos', asyncHandler(getCapitulos));
router.get('/teses', asyncHandler(getTeses));
router.get('/monografias', asyncHandler(getMonografias));
router.get('/dissertacoes', asyncHandler(getDissertacoes));
router.get('/extensao-ensino', asyncHandler(getExtensaoEnsino));
router.get('/noticia', asyncHandler(getNoticia));
router.get('/projetos-institucionais', asyncHandler(getProjetosInstitucionais));

router.get('/grupo-pesquisa', [passport.authenticate('jwt', {
    session: false
})], asyncHandler(getGrupoPesquisa));

router.post('/grupo-pesquisa', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(insertGrupoPesquisa));

router.put('/grupo-pesquisa', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(updateGrupoPesquisa));

router.post('/noticia', [passport.authenticate('jwt', {
    session: false
}), fileUpload()], asyncHandler(insertNoticia));

router.delete('/noticia/:id', [passport.authenticate('jwt', {
    session: false
}), requireAdmin, fileUpload()], asyncHandler(deletarNoticia));


async function getProjetosInstitucionais(req, res) {
    let response = await gpiccUserController.getProjetosInstitucionais(req);
    res.json(response);
}

async function insertNoticia(req, res) {
    let response = await gpiccUserController.insertNoticia(req, req.user._id);
    res.json(response);
}


async function getNoticia(req, res) {
    let response = await gpiccUserController.getNoticia(req.query.search);
    res.json(response);
}

async function deletarNoticia(req, res) {
    let response = await gpiccUserController.deletarNoticia(req.params.id, req);
    res.json(response);
}

async function updateGrupoPesquisa(req, res) {
    let response = await gpiccUserController.updateGrupoPesquisa(req, req.user._id);
    res.json(response);
}

async function insertGrupoPesquisa(req, res) {
    let response = await gpiccUserController.insertGrupoPesquisa(req, req.user._id);
    res.json(response);
}

async function getGrupoPesquisa(req, res) {
    let response = await gpiccUserController.getGrupoPesquisa(req.user);
    res.json(response);
}

async function getExtensaoEnsino(req, res) {
    let response = await gpiccUserController.getExtensaoEnsino(req);
    res.json(response);
}

async function getHome(req, res) {
    let response = await gpiccUserController.getHome(req);
    res.json(response);
}

async function getPesquisa(req, res) {
    let response = await gpiccUserController.getPesquisa(req);
    res.json(response);
}

async function getLivro(req, res) {
    let response = await gpiccUserController.getLivro(req);
    res.json(response);
}

async function getArtigo(req, res) {
    let response = await gpiccUserController.getArtigos(req);
    res.json(response);
}

async function getCapitulos(req, res) {
    let response = await gpiccUserController.getCapitulos(req);
    res.json(response);
}

async function getTeses(req, res) {
    let response = await gpiccUserController.getTeses(req);
    res.json(response);
}

async function getMonografias(req, res) {
    let response = await gpiccUserController.getMonografias(req);
    res.json(response);
}

async function getDissertacoes(req, res) {
    let response = await gpiccUserController.getDissertacoes(req);
    res.json(response);
}