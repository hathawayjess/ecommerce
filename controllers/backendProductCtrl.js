var Product = require('../models/Product.js');
var mongoose = require('mongoose');


module.exports = {
  createProduct: function(req, res, next) {
              Product.create(req.body, function(error, response) {
                if (error) {
                  return res.status(500).json(error);
                } else {
                  return res.json(response);
                }
              })
            },

  findProduct: function(req, res, next) {
    Product.find(function(err, products) {
      return res.status(200).send(products);
    })
              // Product.find(req.query, function(err, response) {
              //   if (err) {
              //     res.status(500).json(err);
              //   } else {
              //     res.json(response);
              //   }
              // })
    },

  findProductById: function(req, res, next) {
          Product.findById(req.params.id, function(err, response) {
            if (err) {
              res.status(500).json(err);
            } else {
              res.json(response);
            }
          })
        },

        updateProduct: function(req, res, next) {
          Product.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
            if (err) {
              res.status(500).json(err);
            } else {
              res.json(response);
            }
          })
        },

        deleteProduct: function(req, res, next) {
          Product.findByIdAndRemove(req.params.id, function(err, response) {
            if (err) {
              res.status(500).json(err);
            } else {
              res.json(response);
            }
          })
        }
  }
