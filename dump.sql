create database dindin;

-- Tabela "usuarios"
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Tabela "categorias"
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

-- Tabela "transacoes"
CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor INT NOT NULL,
    data DATE NOT NULL,
    categoria_id INT REFERENCES categorias(id),
    usuario_id INT REFERENCES usuarios(id),
    tipo VARCHAR(255) NOT NULL
);

INSERT INTO categorias (descricao) VALUES
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');
