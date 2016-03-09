//DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var Product = require('./models/Product.js');
var productCtrl = require('./controllers/backendProductCtrl.js');
var Order = require('./schemas/Order.js');
var Cart = require('./schemas/Cart.js');


var app = express();
var corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/e-commerce");
mongoose.connection.once("open", function () {
  console.log("Connected to MongoDB");
})




//ENDPOINTS
app.post('/products', productCtrl.createProduct);

app.get('/products', productCtrl.findProduct);

app.get('/products/:id', productCtrl.findProductById);

app.put('/products/:id', productCtrl.updateProduct);

app.delete('/products/:id', productCtrl.deleteProduct);

//CART, ORDER, USER ENDPOINTS

app.post('/api/order/:user_id', function(req, res, next) {
  var userId = req.params.userId;
  User.findById(userId, function(err, result) {
    if(err) {
      res.sendStatus(500);
    }
    var userObj = result;
    var userOrder = {};
    userOrder.products = userObj.cart;
    userOrder.userId = userId;
    var newOrder = new Order(userOrder);
    newOrder.save(function(err, result) {
      if (err) {
        res.sendStatus(500);
      }
      userObj.cart = [];
      userObj.orders.push(mongoose.Types.ObjectId(result._id));
      //userObj.update({$push: {orders: mongoose.Types.ObjectId(result._id)}})
      userObj.save(function(err, result) {
        if (err) {
          res.sendStatus(500);
        }
        res.send(result);
      })
    })
  })
})

app.get('/api/order/', function(req, res, next) {
  Order.find(req.query, function(err, result) {
    if (err) {
      res.sendStatus(500);
    }
    res.send(result);
  })
})

app.post('/api/cart/:user_id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.user_id, {$push: {cart: req.body}}, function(err, res) {
    if (error) {
      return res.status(500).json(error);
    } else {
      return res.json(response);
    }
  })
})

app.put('/api/cart/:user_id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.user_id, function(err, res) {
    if(err) {
      res.status(500).send(err)
    }
    var myUser = res;
    var qty = req.query.qty/1;
    var foundItem = -1;
    myUser.cart.forEach(function(cartItem, index) {
      if (cartItem._id === req.query.itmId) {
        foundItem = index;
      }
    })
    if(index >=0) {
      if(qty === 0) {
        myUser.cart.splice(index, 1);
      } else {
        myUser.cart[myIndex].qty = qty;
      }
    }
    saveUser(myUser, req, res)
  })

  function saveUser(userToSave, req, res) {
    userToSave.save(function(err, result) {
      if(err) {
        res.status(500).send(err)
      } else {
        res.send(result)
      }
    })
  }
})

app.get('/api/user/:id', function(req, res, next) {
  User
    .findById(req.params.user_id)
    .populate('cart/product')
    .exec()
    .then(function(results) {
      return res.json(results);
    }, function(err) {
      return res.status(500).json(error);
    })
})


app.listen(3000, function(){
  console.log('listening on port ' + 3000);
});
