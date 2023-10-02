const express = require("express");
const { addTransaction, getAllTransaction, getLastTransaction } = require("../controllers/transactionCtrl");

const router = express.Router();

router.post('/add-transactions',addTransaction)

router.get('/get-transactions/:userId',getAllTransaction)

router.get('/last-transactions/:userId',getLastTransaction)


module.exports = router;
