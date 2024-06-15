const express = require('express')
const OrderController = require('../controllers/Order')
const router = express.Router();


//Rota de criação de pedido
router.post('/', OrderController.create);

//Rota para buscar um pedido
router.get('/:id', OrderController.findOne);

//Rota para buscar todos os pedidos
router.get('/', OrderController.findAll);

//Rota para deletar um pedido
router.delete('/:id', OrderController.deleteOne);

//Rota para atualizar um pedido
router.patch('/:id', OrderController.update);

module.exports = router