const express = require('express');
const router = express.Router();
const { HistoryPeminjaman } = require('../models');
const { verifyToken } = require('../middleware/auth');

// Get all history peminjaman
router.get('/', verifyToken, async (req, res) => {
  try {
    const history = await HistoryPeminjaman.findAll();
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create history peminjaman
router.post('/', verifyToken, async (req, res) => {
  try {
    const { id_peminjaman, id_user, id_inventory, waktu_peminjaman, waktu_pengembalian, status } = req.body;
    const newHistory = await HistoryPeminjaman.create({ id_peminjaman, id_user, id_inventory, waktu_peminjaman, waktu_pengembalian, status });
    res.status(201).json(newHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get history peminjaman by id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const history = await HistoryPeminjaman.findByPk(req.params.id);
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Edit history peminjaman
router.put('/:id', verifyToken, async (req, res) => {
  const historyId = req.params.id;
  const { id_peminjaman, id_user, id_inventory, waktu_peminjaman, waktu_pengembalian, status } = req.body;

  try {
    let history = await HistoryPeminjaman.findByPk(historyId);

    if (!history) {
      return res.status(404).json({ message: 'History peminjaman not found' });
    }

    // Update history peminjaman fields
    history.id_peminjaman = id_peminjaman;
    history.id_user = id_user;
    history.id_inventory = id_inventory;
    history.waktu_peminjaman = waktu_peminjaman;
    history.waktu_pengembalian = waktu_pengembalian;
    history.status = status;

    await history.save();

    res.status(200).json({ message: 'History peminjaman updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete history peminjaman
router.delete('/:id', verifyToken, async (req, res) => {
  const historyId = req.params.id;

  try {
    const history = await HistoryPeminjaman.findByPk(historyId);

    if (!history) {
      return res.status(404).json({ message: 'History peminjaman not found' });
    }

    await history.destroy();

    res.status(204).json({ message: 'History peminjaman deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
