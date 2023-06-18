const express=require('express');
const mongoose= require('mongoose');
const ShortUrl = require('./models/shortUrl')
const app=express();


//establishing connection with mongoDB database
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.biy3ffy.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//This line configures the Express application to use the EJS (Embedded JavaScript) view engine
// for rendering dynamic content.
app.set('view engine','ejs');
//routes the HTTP Get requests to the path 

//This line adds middleware to the Express application to parse incoming request bodies in URL-encoded format. 
//It allows accessing form data submitted through POST requests using req.body
app.use(express.urlencoded({extended:false}))

//This code defines a route for handling GET requests to the root path ('/'). It uses an async function as the route handler. Inside the handler, it retrieves all the short URLs from the MongoDB database using ShortUrl.find().
// It then renders the 'index' view (using the EJS view engine) and passes the retrieved short URLs as data.
app.get('/',async(req,res) =>{
 const shortUrls = await ShortUrl.find()
 res.render('index',{shortUrls:shortUrls})
})

//This code defines a route for handling POST requests to the '/shortUrls' path. It creates a new short URL in the database based on the fullUrl value provided in the request body (req.body.fullUrl). It uses ShortUrl.create() to create a new document in the MongoDB collection. 
//After that, it redirects the user back to the root path ('/').
app.post('/shortUrls',async(req,res)=>{
 await ShortUrl.create({full:req.body.fullUrl})
 res.redirect('/')
})
// setting port we want server to listen

//This code defines a dynamic route to handle GET requests with a parameter :shortUrl. It searches the MongoDB collection for a short URL matching the short property in the request parameter (req.params.shortUrl). If the short URL is not found, it returns a 404 status. 
//Otherwise, it increments the clicks property of the shortUrl document, saves it to the database, and redirects the user to the corresponding full URL.
app.get('/:shortUrl',async(req,res)=>{
    const shortUrl= await ShortUrl.findOne({short: req.params.shortUrl })
    if(shortUrl==null) return res.sendStatus(404);

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

//This line starts the Express server and listens on either the port specified in the process.env.PORT environment
// variable (commonly used in production environments) or port 5000 if the environment variable is not set.
app.listen(process.env.PORT || 5000);

