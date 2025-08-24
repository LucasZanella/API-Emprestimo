const User = require('../models/User');

// Criar ou atualizar usuário
const createOrUpdateUser = async (req, res) => {
  try {
    const { cpf } = req.body;

    // Verifica se já existe usuário com esse CPF
    let user = await User.findOne({ cpf });

    if (user) {
      // Se já existir, faz update
      user = await User.findOneAndUpdate(
        { cpf },
        req.body,
        { new: true, runValidators: true } // retorna o objeto atualizado
      );
      return res.status(200).json({
        message: 'Usuário atualizado com sucesso.',
        user
      });
    } else {
      // Se não existir, cria normalmente
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      return res.status(201).json({
        message: 'Usuário criado com sucesso.',
        user: savedUser
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lista os créditos disponíveis de um CPF
const getCreditsByCPF = async (req, res) => {
  try {
    const { cpf } = req.params;

    // Buscar cliente no banco pelo CPF
    const customer = await User.findOne({ cpf });
    if (!customer) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    // Inicia a lista de créditos
    const loans = [];

    // Verificação de localização (se contém "Porto Alegre" e "RS")
    const isFromPortoAlegreRS = customer.location.toLowerCase().includes("porto alegre");

    // === Regras de Crédito ===
    if (customer.income <= 3000) {
      loans.push({ type: "PERSONAL", interest_rate: 4 });
      loans.push({ type: "GUARANTEED", interest_rate: 3 });
    } else if (
      customer.income > 3000 &&
      customer.income <= 5000 &&
      customer.age < 30 &&
      isFromPortoAlegreRS
    ) {
      loans.push({ type: "PERSONAL", interest_rate: 4 });
      loans.push({ type: "GUARANTEED", interest_rate: 3 });
    }

    if (customer.income >= 5000) {
      loans.push({ type: "CONSIGNMENT", interest_rate: 2 });
    }

    return res.json({
      customer: customer.name,
      loans
    });

  } catch (error) {
    console.error("Erro ao buscar créditos:", error);
    res.status(500).json({ message: "Erro no servidor" });
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

module.exports = {
  createOrUpdateUser,
  getCreditsByCPF,
  listAllUsers
};
