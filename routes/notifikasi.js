const express = require('express');
const router = express.Router();
const { Notifikasi } = require('../models');
const { verifyToken } = require('../middleware/auth');

// Get all notifications
router.get('/', verifyToken, async (req, res) => {
  try {
    const notifikasi = await Notifikasi.findAll();
    res.status(200).json(notifikasi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create notification
router.post('/', verifyToken, async (req, res) => {
  try {
    const { id_user, id_peminjaman, pesan, status } = req.body;
    const newNotifikasi = await Notifikasi.create({ id_user, id_peminjaman, pesan, status });
    res.status(201).json(newNotifikasi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get notification by id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const notifikasi = await Notifikasi.findByPk(req.params.id);
    res.status(200).json(notifikasi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Edit notification
router.put('/:id', verifyToken, async (req, res) => {
  const notifikasiId = req.params.id;
  const { id_user, id_peminjaman, pesan, status } = req.body;

  try {
    let notifikasi = await Notifikasi.findByPk(notifikasiId);

    if (!notifikasi) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Update notification fields
    notifikasi.id_user = id_user;
    notifikasi.id_peminjaman = id_peminjaman;
    notifikasi.pesan = pesan;
    notifikasi.status = status;

    await notifikasi.save();

    res.status(200).json({ message: 'Notification updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete notification
router.delete('/:id', verifyToken, async (req, res) => {
  const notifikasiId = req.params.id;

  try {
    const notifikasi = await Notifikasi.findByPk(notifikasiId);

    if (!notifikasi) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await notifikasi.destroy();

    res.status(204).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
