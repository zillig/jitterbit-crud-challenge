
const { mongo } = require('mongoose') 
const OrderModel = require('../model/order')

// Cria um novo pedido
exports.create = async (req, res) => {
    if (!req.body.numeroPedido && !req.body.valorTotal && !req.body.dataCriacao) {
        res.status(400).send({ message: "Numero do pedido, valor ou data de criação não estão preenchidos." });
    }

    const order = new OrderModel({
        orderId: req.body.numeroPedido,
        value: req.body.valorTotal,
        creationDate: req.body.dataCriacao,
        items: req.body.items.map((item, itemIndex) => ({
            orderId: req.body.numeroPedido, 
            productId: item.idItem, 
            quantity: item.quantidadeItem, 
            price: item.valorItem, 
            _id: new mongo.ObjectId()
        }))
    })

    await order.save().then(data => {
        res.send({
            message:"Pedido criado com sucesso!",
            order:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro durante a criação do pedido."
        });
    });
};


// Busca um pedido via orderId
exports.findOne = async (req, res) => {
    console.log(req.params); 
    try {
        const order = await OrderModel.findOne({orderId: req.params.id});
        res.status(200).json(order);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Busca todos os pedidos
exports.findAll = async (req, res) => {
    try {
        const order = await OrderModel.find({});
        res.status(200).json(order);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Deleta um unico pedido
exports.deleteOne = async (req, res) => {
    await OrderModel.deleteOne({orderId: req.params.id}).then(data => {
        if (data.deletedCount == 0) {
          res.status(404).send({
            message: `Pedido não encontrado.`
          });
        } else {
          res.send({
            message: "Pedido deletado com sucesso."
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};

// Atualiza os dados de um pedido 
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Os dados para atualizar o pedido não podem estar vazios."
        });
    }
    
    const id = req.params.id;
    
    await OrderModel.findOneAndUpdate({orderId: id}, {
        orderId: req.body.numeroPedido,
        value: req.body.valorTotal,
        creationDate: req.body.dataCriacao,
        items: req.body.items.map((item, itemIndex) => ({
            orderId: req.body.numeroPedido, 
            productId: item.idItem, 
            quantity: item.quantidadeItem, 
            price: item.valorItem
        }))
    } ).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Pedido não encontrado`
            });
        }else{
            res.send({ message: "Pedido atualizado com sucesso." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
