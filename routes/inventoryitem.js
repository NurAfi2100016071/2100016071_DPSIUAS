const express = require('express');
const router = express.Router();
const { InventoryItem } = require('../models');
const { verifyToken } = require('../middleware/auth');

// Get all inventory items
router.get('/', verifyToken, async (req, res) => {
  try {
    const items = await InventoryItem.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create inventory item 
router.post('/', verifyToken, async (req, res) => {
  try {
    const { nama_barang, ketersediaan, detail } = req.body;
    const newItem = await InventoryItem.create({ nama_barang, ketersediaan, detail });
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get inventory item by id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const item = await InventoryItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Edit inventory item
router.put('/:id', verifyToken, async (req, res) => {
  const itemId = req.params.id;
  const { nama_barang, ketersediaan, detail } = req.body;

  try {
    let item = await InventoryItem.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    // Update inventory item fields
    item.nama_barang = nama_barang;
    item.ketersediaan = ketersediaan;
    item.detail = detail;

    await item.save();

    res.status(200).json({ message: 'Inventory item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete inventory item
router.delete('/:id', verifyToken, async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await InventoryItem.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    await item.destroy();

    res.status(204).json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
