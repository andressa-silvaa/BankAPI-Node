module.exports =  validateUserData = (req, res, next) => {
  const {nome, email, senha} = req.body
  if (!nome) {
    return res.status(401).json({ mensagem: "o campo nome é obrigatório" })
  }

  if (!email) {
    return res.status(401).json({ mensagem: "o campo email é obrigatório" })
  }

  if (!senha) {
    return res.status(401).json({ mensagem: "a senha é obrigatória" })
  }

  next()
}