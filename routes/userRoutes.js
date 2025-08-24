const express = require('express');
const router = express.Router();
const {
  createOrUpdateUser,
  getCreditsByCPF,
  listAllUsers
} = require('../controllers/userController');

router.post('/', createOrUpdateUser);
router.get('/:cpf', getCreditsByCPF);
router.get('/', listAllUsers)

module.exports = router;