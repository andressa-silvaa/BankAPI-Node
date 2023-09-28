const pool = require("../connection");
const { existingCategory } = require("../middleware/validateCategories");
const utils = require('../utils/file')

const listTransactions = async (req, res) => {
  try {
    const user_id = req.usuario.id;


    const sql =
      `SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao AS categoria_nome
      FROM transacoes AS t
      JOIN categorias AS c ON t.categoria_id = c.id
      WHERE t.usuario_id = $1;`
    const values = [user_id];

    const queryResult = await pool.query(sql, values);

    const transactions = queryResult.rows;
    if (transactions.length === 0) {
      return res.status(200).json([]);
    }


    return res.status(200).json(transactions);
  } catch (error) {
    utils.handleServerError(res, error);
  }
};

const listTransactionsByCategories = async (req, res) => {
  try {
    const user_id = req.usuario.id;
    const { filtro } = req.query;

    const filterList = filtro.split(",");


    const sql = `SELECT t.id, t.tipo, t.descricao, t.valor,
       t.data, t.usuario_id, t.categoria_id,
        c.descricao AS categoria_nome
        FROM transacoes AS t
        JOIN categorias AS c ON t.categoria_id = c.id
       WHERE t.usuario_id = $1`

    const values = [user_id];

    const queryResult = await pool.query(sql, values);

    const filteredList = queryResult.rows.filter((transacao) =>
      filterList.includes(transacao.categoria_nome)
    );
    const transactions = queryResult.rows;

    if (transactions.length === 0) {
      return res.status(200).json([]);
    }
    if (filteredList.length === 0) {
      return res.status(200).json(transactions);
    }

    return res.status(200).json(filteredList);
  } catch (error) {
    utils.handleServerError(res, error);
  }
};

const registerTransaction = async (req, res) => {
  try {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const user_id = req.usuario.id;

    const sql = `INSERT INTO transacoes (
  descricao, valor, data, categoria_id, tipo, usuario_id)
   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [descricao, valor, data, categoria_id, tipo, user_id];

    const queryResult = await pool.query(sql, values);
    const transaction = queryResult.rows[0];
    const output = {
      id: transaction.id,
      tipo: transaction.tipo,
      descricao: transaction.descricao,
      valor: transaction.valor,
      data: transaction.data,
      usuario_id: user_id,
      categoria_id: transaction.categoria_id,
      categoria_nome: existingCategory.descricao
    }

    return res.status(201).json(output);
  } catch (error) {
    utils.handleServerError(res, error);
  }
};

const detailTransaction = async (req, res) => {
  try {
    const { id: id_transaction } = req.params;
    const user_id = req.usuario.id;

    const sql = `SELECT t.id, t.tipo, t.descricao, t.valor,
   t.data, t.usuario_id, t.categoria_id, c.descricao AS categoria_nome
    FROM transacoes AS t
    JOIN categorias AS c ON t.categoria_id = c.id
    WHERE t.usuario_id = $1 AND t.id = $2`

    const queryResult1 = await pool.query(sql, [user_id, id_transaction]);
    const transaction = queryResult1.rows[0];

    if (!transaction) {
      return res.status(404).json({ mensagem: 'Transação não encontrada' });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    utils.handleServerError(res, error);
  }
};


const updateTransaction = async (req, res) => {
  const { id: id_transaction } = req.params;
  const user_id = req.usuario.id;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const query = await pool.query(
      "SELECT * FROM transacoes WHERE usuario_id = $1 AND id = $2",
      [user_id, id_transaction]
    );

    const transaction = query.rows[0];
    if (!transaction) {
      return res.status(404).json({ mensagem: "Transação não encontrada" });
    }

    const sql = `update transacoes set descricao = $1, valor = $2,
     data = $3, categoria_id = $4, tipo = $5 where id = $6 RETURNING *`;
    const values = [descricao, valor, data, categoria_id, tipo, id_transaction];

    await pool.query(sql, values);

    return res.status(200).send();
  } catch (error) {
    utils.handleServerError(res, error);
  }
};
const deleteTransaction = async (req, res) => {
  const { id: id_transaction } = req.params;
  const user_id = req.usuario.id;

  try {
    const query = await pool.query(
      "SELECT * FROM transacoes WHERE usuario_id = $1 AND id = $2",
      [user_id, id_transaction]
    );

    const transaction = query.rows[0];
    if (!transaction) {
      return res.status(404).json({ mensagem: "Transação não encontrada" });
    }

    await pool.query("delete from transacoes where id = $1", [id_transaction]);

    return res.status(200).send();
  } catch (error) {
    utils.handleServerError(res, error);
  }
};

const getTransactionSummary = async (req, res) => {
  const user_id = req.usuario.id;

  try {
    const entryQuery = await pool.query(
      "SELECT COALESCE(SUM(valor), 0) AS full_entry FROM transacoes WHERE usuario_id = $1 AND tipo = 'entrada'",
      [user_id]
    );
    const fullEntry = entryQuery.rows[0].full_entry;

    const outputQuery = await pool.query(
      "SELECT COALESCE(SUM(valor), 0) AS full_output FROM transacoes WHERE usuario_id = $1 AND tipo = 'saida'",
      [user_id]
    );
    const fullOutput = outputQuery.rows[0].full_output;

    return res.status(200).json({ entrada: fullEntry, saida: fullOutput });
  } catch (error) {
    utils.handleServerError(res, error);
  }
};

module.exports = {
  listTransactions,
  detailTransaction,
  registerTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary,
  listTransactionsByCategories,
};
