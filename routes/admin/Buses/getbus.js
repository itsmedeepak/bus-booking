const express = require('express');
const jwt = require('jsonwebtoken');
const { getUserBuses } = require('../../../models/busUserRelation'); // Assuming this function exists
const fetchUser = require('../../../middleware/fetchUser');
const checkAdminRole = require('../../../middleware/checkAdmin');

const router = express.Router();

// Endpoint for getting all buses or a specific bus by an admin
router.get('/', fetchUser, checkAdminRole, async (req, res) => {
  try {
    // Get all buses for the admin
    const adminBuses = await getUserBuses(req.userId);
    res.json(adminBuses);
  } catch (error) {
    console.error('Error getting buses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
