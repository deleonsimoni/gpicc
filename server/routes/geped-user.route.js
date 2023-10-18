const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const gepedUserController = require('../controllers/geped-user.controller');

const router = express.Router();
module.exports = router;


router.get('/home', asyncHandler(getHome));
router.get('/pesquisa', asyncHandler(getPesquisa));
router.get('/livro', asyncHandler(getLivro));
router.get('/artigo', asyncHandler(getArtigo));
router.get('/capitulos', asyncHandler(getCapitulos));
router.get('/teses', asyncHandler(getTeses));
router.get('/extensao-ensino', asyncHandler(getExtensaoEnsino));

async function getExtensaoEnsino(req, res) {
    let response = await gepedUserController.getExtensaoEnsino(req);
    res.json(response);
}

async function getHome(req, res) {
    let response = await gepedUserController.getHome(req);
    res.json(response);
}

async function getPesquisa(req, res) {
    let response = await gepedUserController.getPesquisa(req);
    res.json(response);
}

async function getLivro(req, res) {
    let response = await gepedUserController.getLivro(req);
    res.json(response);
}

async function getArtigo(req, res) {
    let response = await gepedUserController.getArtigos(req);
    res.json(response);
}

async function getCapitulos(req, res) {
    let response = await gepedUserController.getCapitulos(req);
    res.json(response);
}

async function getTeses(req, res) {
    let response = await gepedUserController.getTeses(req);
    res.json(response);
}