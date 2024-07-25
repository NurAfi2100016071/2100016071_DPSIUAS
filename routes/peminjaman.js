const express = require('express');
const router = express.Router();
const { Peminjaman } = require('../models');
const { verifyToken } = require('../middleware/auth');

// Get all peminjaman
router.get('/', verifyToken, async (req, res) => {
  try {
    const peminjaman = await Peminjaman.findAll();
    res.status(200).json(peminjaman);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create peminjaman
router.post('/', verifyToken, async (req, res) => {
  try {
    const { id_user, id_inventory, waktu_peminjaman, waktu_pengembalian } = req.body;
    const newPeminjaman = await Peminjaman.create({ id_user, id_inventory, waktu_peminjaman, waktu_pengembalian });
    res.status(201).json(newPeminjaman);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get peminjaman by id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const peminjaman = await Peminjaman.findByPk(req.params.id);
    res.status(200).json(peminjaman);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Edit peminjaman
router.put('/:id', verifyToken, async (req, res) => {
  const peminjamanId = req.params.id;
  const { id_user, id_inventory, waktu_peminjaman, waktu_pengembalian } = req.body;

  try {
    let peminjaman = await Peminjaman.findByPk(peminjamanId);

    if (!peminjaman) {
      return res.status(404).json({ message: 'Peminjaman not found' });
    }

    // Update peminjaman fields
    peminjaman.id_user = id_user;
    peminjaman.id_inventory = id_inventory;
    peminjaman.waktu_peminjaman = waktu_peminjaman;
    peminjaman.waktu_pengembalian = waktu_pengembalian;

    await peminjaman.save();

    res.status(200).json({ message: 'Peminjaman updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete peminjaman
router.delete('/:id', verifyToken, async (req, res) => {
  const peminjamanId = req.params.id;

  try {
    const peminjaman = await Peminjaman.findByPk(peminjamanId);

    if (!peminjaman) {
      return res.status(404).json({ message: 'Peminjaman not found' });
    }

    await peminjaman.destroy();

    res.status(204).json({ message: 'Peminjaman deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
