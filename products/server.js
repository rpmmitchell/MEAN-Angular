// Require the Express Module
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/product');
// Use native promises
mongoose.Promise = global.Promise;


var ProductSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    price: {type: Number, required: true},
    image: {type: String, required: true}
});
mongoose.model('Product', ProductSchema);

var Product = mongoose.model("Product");

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());

// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static( __dirname + '/client/dist'));


app.get('/products', (req, res) => {
    Product.find({}, (err, product) => {
        if(err){
            console.log("ERROR", err);
            res.json({message: "ERROR", error: err})
        }
        else{
            res.json({message: "Success", data: product});
        }
    })
})

app.get('/products/grab/:id', (req, res) => {
    console.log(req.params.id);
    Product.find({_id: req.params.id}, (err, product) => {
        if(err){
            console.log("ERROR", err);
            res.json({message: 'ERROR', error: err});
        }
        else{
            res.json({message: "SUCCESS", data: product});
        }
    });
})

app.post('/products/new', (req, res) => {
    var product = new Product({name: req.body.name, price: Number(req.body.price), image: req.body.image});
    product.save(function(err, product){
        if(err){
            console.log('error');
            res.status(400).json(err);
        }
        else{
            console.log('author added');
            res.json({message: 'success', data: product});
        }
    })
})

app.delete('/products/delete/:id', (req, res) => {
    console.log(req.params.id)
    Product.remove({_id: req.params.id}, (err, product) => {
        if(err){
            console.log('Error', err);
            res.json({message: 'Error', error: err});
        }
        else {
            res.json({message: "Success", data: product});
        }
    });
})

app.put('/products/update/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    Product.update({_id: req.params.id}, {$set: {name: req.body.name, price: req.body.price, image: req.body.image}}, {runValidators: true}, (err) => {
        if(err){
            console.log('Error');
            res.status(400).json(err);
        }
        else{
            res.json({message: "Success"});
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"));
})


app.listen(8000, () => {
    console.log("listening on port 8000");
})