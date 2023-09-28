const pool = require('../connection')

const existingCategory = async (req,res,next) =>{

  const { categoria_id } = req.body;

const category = await pool.query(
  "SELECT * FROM categorias WHERE id = $1",
  [categoria_id]
);

if (category.rows.length === 0) {
  return res.status(400).json({ mensagem: "Categoria não encontrada." });
}
next()
}
module.exports = {
  existingCategory
}
