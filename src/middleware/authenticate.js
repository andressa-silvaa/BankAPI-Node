const jwt = require("jsonwebtoken");
const jwtPassword = require('../jwtpassword')
const pool = require('../connection')


const validateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ mensagem: "não autorizado o campo token é obrigatório" });
  }
  
  try {
    const { id } = jwt.verify(token, jwtPassword);

    const { rows, rowCount } = await pool.query(
      `select * from usuarios where id = $1`,
      [id]
    );

    if (rowCount === 0) {
      return res.status(400).json({ mensagem: "usuario não autorizado" });
    }
    
    const {...usuario } = rows[0];
  
    req.usuario = usuario;
   
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ mensagem: "não autorizado" });
  }
};

module.exports = validateUser;
