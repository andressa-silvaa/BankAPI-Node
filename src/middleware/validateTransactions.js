const validateTransactions = (req, res, next) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  if (!descricao) {
    return res
      .status(401)
      .json({ mensagem: "o campo descrição e obrigatório" });
  }

  if (!valor) {
    return res.status(401).json({ mensagem: "o campo valor e obrigatório" });
  }

  if (!data) {
    return res.status(401).json({ mensagem: "o campo data e obrigatório" });
  }

  if (!categoria_id) {
    return res
      .status(401)
      .json({ mensagem: "o campo categoria_id e obrigatório" });
  }

  if (!tipo) {
    return res.status(401).json({ mensagem: "o campo tipo e obrigatório" });
  }
  next();
};

const validateType = (req, res, next) => {
  const { tipo } = req.body;

  if (tipo !== "entrada" && tipo !== "saida") {
    return res
      .status(400)
      .json({ mensagem: 'O campo "tipo" deve ser "entrada" ou "saída".' });
  }

  next();
};

module.exports = {
  validateTransactions,
  validateType,
};
