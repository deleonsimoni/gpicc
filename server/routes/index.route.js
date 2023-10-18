const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const lepedRoutes = require('./leped.route');
const gruposPesquisaRoute = require('./grupospesquisa.route');
const gepedUserRoute = require('./geped-user.route');
const cominduRoute = require('./comindu.route');
const chatRoute = require('./chat.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/leped', lepedRoutes);
router.use('/grupos-pesquisa', gruposPesquisaRoute);
router.use('/geped-user', gepedUserRoute);
router.use('/comindu', cominduRoute);
router.use('/chat', chatRoute);

module.exports = router;
