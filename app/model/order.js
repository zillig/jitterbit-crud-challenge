var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    orderId: String, 
    value: Number, 
    creationDate: Date, 
    items: [{
        orderId: String, 
        productId: String, 
        quantity: Number,
        price: Number, 
        _id: mongoose.Types.ObjectId
    }]
});
var order = new mongoose.model('Order', schema);
module.exports = order;