'use strict'

var express     =   require('express'),
    mongoose    =   require('mongoose'),
    bodyParser  =   require('body-parser'),
    Book        =   require('./model/book');

var app = express();
var router = express.Router();

mongoose.connect('mongodb://localhost/test');// todo :: Use Habitat for ENV mgmt 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var PORT = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
})

router.get('/',function(req,res){
    res.json({
        message : "API Initialised"
    })
}); 
//MAKE ES6 using Airbnb ESLint && make abtract 
router.route('/book')
    .get(function(req,res){
        Book.find({},function(err,books){
            if (err) {
                console.log(err);
            } else {
                res.json(books)
            }
        })
    })
    .post(function(req,res){
        var book = new Book();
        book.author = req.body.author;
        book.title  = req.body.title;
        book.save(function(err){
            if (err) {
                console.log(err);
            }
        res.json({status:"Success"});
        });
    })
//Remove Con.Logs 
router.route('/book/:id')
    .put(function(req,res){
        console.log(req.body);
        var book = {
            author : req.body.author,
            title : req.body.title
        }
        Book.findByIdAndUpdate(req.params.id,book,function(err,updatedBook){
            if (err) {
                console.log(err);
            }
            res.json({
                message:"Update SuccessFul"
            })
        })
    })
    .delete(function(req,res){
        Book.findByIdAndRemove(req.params.id,function(err){
            if (err) {
                res.send(err)
            }
            res.json({
                message:"Record Removed Successfully"
            })
        });
    })

app.use("/api" , router);


app.listen(PORT,function(){
    console.log("Ready To Rock !");
})