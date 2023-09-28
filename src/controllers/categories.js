const pool = require("../connection");

const listCategories = async (req, res) => {
    try {
        const queryResult = await pool.query('SELECT * FROM categorias');

        const categories = queryResult.rows;


        if (categories.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(categories);
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};



module.exports = {
    listCategories
};