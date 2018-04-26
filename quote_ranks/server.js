// Require the Express Module
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quote_ranks');
// Use native promises
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
var AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    quotes: [{type: Schema.Types.ObjectId, ref: "Quote"}]
});

var QuoteSchema = new mongoose.Schema({
    _author: {type: Schema.Types.ObjectId, ref: "Author"},
    text: {type: String, required: true},
    likes: {type: Number, required: true}
})

mongoose.model('Author', AuthorSchema);
mongoose.model('Quote', QuoteSchema);

var Author = mongoose.model("Author");
var Quote = mongoose.model("Quote");

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());

// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static( __dirname + '/authorAngular/dist'));


app.get('/authors', (req, res) => {
    Author.find({}, (err, author) => {
        if(err){
            console.log("ERROR", err);
            res.json({message: "ERROR", error: err})
        }
        else{
            res.json({message: "HELLO GOODJOB", data: author});
        }
    })
})

app.get('/author_grab/:id', (req, res) => {
    Author.find({_id: req.params.id}, (err, author) => {
        if(err){
            console.log("ERROR", err);
            res.json({message: 'ERROR', error: err});
        }
        else{
            res.json({message: "SUCCESS", data: author});
        }
    });
})

app.post('/authors/new', (req, res) => {
    console.log(req.body)
    var author = new Author({name: req.body.author.name});
    author.save(function(err, author){
        if(err){
            console.log('error');
            res.status(400).json(err);
        }
        else{
            console.log('author added');
            res.json({message: 'success', data: author});
        }
    })
})

app.post('/authors/quotes/:id', (req, res) => {
    console.log(req.body);
    Author.findOne({_id: req.params.id}, (err, author) => {
        var quote = new Quote({text: req.body.quote.text, likes: 0})
        quote._author = author._id;
        quote.save(err => {
            author.quotes.push(quote);
            author.save(err => {
                if(err){
                    res.json({message: 'error', error: err});
                }
                else{
                    res.json({message: 'Success', data: author});
                }
            })
        })
    })
})

app.get('/authors/quotes/:id', (req, res) => {
    Quote.find({_author: req.params.id}, (err, quotes) => {
        if(err){
            res.json({message: 'error', error: err});
        }
        else{
            res.json({message: 'Success', data: quotes})
        }
    })
})

app.delete('/authors/delete/:id', (req, res) => {
    Author.remove({_id: req.params.id}, (err, author) => {
        if(err){
            console.log('Error', err);
            res.json({message: 'Error', error: err});
        }
        else {
            res.json({message: "Success", data: author});
        }
    });
});


app.put('/authors/update/:id', (req, res) => {
    Author.update({_id: req.params.id}, {$set: {name: req.body.name}}, {runValidators: true}, (err) => {
        if(err){
            console.log('Error', err);
            res.status(400).json(err);
        }
        else{
            res.json({message: "Success"});
        }
    })
});

app.get('/authors/quotes/up/:id', (req, res) => {
    console.log(req.params.id);

    Quote.update({_id: req.params.id}, {$inc: {likes: 1} }, (err) => {
        if(err){
            console.log('Error', err);
        }
        else{
            res.json({message: 'Success'})
        }
    });
});

app.get('/authors/quotes/down/:id', (req, res) => {
    console.log(req.params.id);

    Quote.update({_id: req.params.id}, {$inc: {likes: -1} }, (err) => {
        if(err){
            console.log('Error', err);
        }
        else{
            res.json({message: 'Success'})
        }
    });
});

app.delete('/authors/quotes/delete/:id', (req, res) => {
    Quote.remove({_id: req.params.id}, (err) => {
        if(err){
            console.log('Error', err);
            res.json({message: 'Error', error: err});
        }
        else {
            res.json({message: "Success"});
        }
    });
});



app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./authorAngular/dist/index.html"));
})


app.listen(8000, () => {
    console.log("listening on port 8000");
})