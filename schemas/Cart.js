var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartSchema = new Schema ({
    products: [{
      item: {type: Schema.Types.ObjectId, ref: 'Product', required: true}
    , quantity: {type: Number, min: 1}
    }]
});

module.exports = cartSchema;
