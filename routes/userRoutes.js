const express = require('express');
const router = express.Router();
const {
  createUser,
  listAllUsers,
  searchCPF,
  UpdateUSer,
  removeUser
} = require('../controllers/userController');

router.post('/', createUser);
router.get('/', listAllUsers);
router.get('/:cpf', searchCPF);
router.put('/:id', UpdateUSer);
router.delete('/:id', removeUser);

module.exports = router;