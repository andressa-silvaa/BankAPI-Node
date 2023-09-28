const express = require('express');
const { registerUser, login, listUsers, updateUser } = require('../controllers/users');
const validateUser = require('../middleware/authenticate');
const validateUserData = require('../middleware/validateUserData');
const { validateTransactions, validateType } = require('../middleware/validateTransactions');
const { listCategories } = require('../controllers/categories');
const { listTransactions, registerTransaction, detailTransaction, updateTransaction, deleteTransaction, getTransactionSummary, listTransactionsByCategories } = require('../controllers/transactions');
const { existingCategory } = require('../middleware/validateCategories');


const router = express();

router.post('/usuarios', validateUserData, registerUser)
router.post('/login', login);

router.use(validateUser)
router.get('/usuario', listUsers)
router.put('/usuarios', validateUserData, updateUser)
router.get('/categoria', listCategories)
router.get('/transacao', listTransactions);
router.get('/transacao/categoria', listTransactionsByCategories);
router.post('/transacao', validateTransactions,existingCategory, validateType, registerTransaction);
router.get('/transacao/extrato', getTransactionSummary);
router.get('/transacao/:id', detailTransaction);
router.put('/transacao/:id', validateTransactions,existingCategory, validateType, updateTransaction);
router.delete('/transacao/:id', deleteTransaction);





module.exports = router;