const express = require('express');
const path = require('path');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.use('/users', require('./users'));
router.use('/inventoryitems', verifyToken, require('./inventoryitem'));
router.use('/peminjaman', verifyToken, require('./peminjaman'));
router.use('/historypeminjaman', verifyToken, require('./history_peminjaman'));
router.use('/notifikasi', verifyToken, require('./notifikasi'));

module.exports = router;
