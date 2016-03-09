var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema = require("../models/Product.js")

var orderSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  , products: [{
      item: [productSchema]
    , quantity: {type: Number, required: true, min: 1}
    }]
  , ordered: {type: Date, default: new Date()}
});

module.exports = mongoose.model("Order", orderSchema);
