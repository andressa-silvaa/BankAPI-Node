const handleServerError = (res, error) => {
  console.error('Erro interno no servidor:', error);
  return res.status(500).json({ mensagem: 'Erro interno no servidor' });
};

module.exports = {
  handleServerError
}