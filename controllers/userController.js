const User = require('../models/User');

// Criar usuário
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'CPF já cadastrado' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Listar todos
const listAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buscar por CPF
const searchCPF = async (req, res) => {
  try {
    const User = await User.findOne({ cpf: req.params.cpf });
    if (!User) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(User);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Atualizar por ID
const UpdateUSer = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'CPF já cadastrado.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Deletar por ID
const removeUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  listAllUsers,
  searchCPF,
  UpdateUSer,
  removeUser
};
