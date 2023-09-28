const pool = require("../connection");
const bcrypt = require("bcrypt");
const jwtPassword = require("../jwtpassword");
const jwt = require("jsonwebtoken");
const utils = require("../utils/file");

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const validateEmail = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (validateEmail.rowCount > 0) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const encryptedPassword = await bcrypt.hash(senha, 10);

    const newUser = `insert into usuarios (
        nome, email, senha) values ($1, $2, $3) returning *`;

    const { rows } = await pool.query(newUser, [
      nome,
      email,
      encryptedPassword,
    ]);
    const { senha: _, ...usuario } = rows[0];

    return res.status(201).json(usuario);
  } catch (error) {
    utils.handleServerError(res, error);
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await pool.query("select * from usuarios where email = $1", [
      email,
    ]);
    if (user.rowCount < 1) {
      return res.status(404).json({ mensagem: "email ou senha invalida" });
    }

    const validatePassword = await bcrypt.compare(senha, user.rows[0].senha);
    if (!validatePassword) {
      return res.status(404).json({ mensagem: "email ou senha invalida" });
    }

    const token = jwt.sign({ id: user.rows[0].id }, jwtPassword, {
      expiresIn: "72h",
    });
    const { senha: _, ...loggedInUser } = user.rows[0];
    return res.json({ user: loggedInUser, token });
  } catch (error) {
    utils.handleServerError(res, error);
  }
};

const listUsers = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const { rows: usuario } = await pool.query(
      "select id,nome,email from usuarios where id = $1",
      [req.usuario.id]
    );

    if (!token) {
      return res.status(401).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }

    return res.json(usuario);
  } catch (error) {
    utils.handleServerError(res, error);
  }
};

const updateUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;
  try {
    const { rowCount } = await pool.query(
      `select * from usuarios where email = $1 and id = $2`,
      [email, req.usuario.id]
    );
    if (rowCount > 0) {
      return res.status(401).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const update = `update usuarios set nome = $1, email = $2, senha = $3 where id = $4`;

    const encryptedPassword = await bcrypt.hash(senha, 10);

    await pool.query(update, [nome, email, encryptedPassword, id]);

    return res.status(201).send();
  } catch (error) {
    utils.handleServerError(res, error);
  }
};

module.exports = {
  registerUser,
  login,
  listUsers,
  updateUser,
};
