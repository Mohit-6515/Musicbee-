const express = require("express");
const playlistController=require('./controllers/playlistController');
const songSelectionController=require('./controllers/songSelectionController');
const mongoose= require('mongoose');
const authRoutes=require('./routes/authRoutes');
const songsRoute=require('./routes/songs');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const bodyParser=require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//set up template engine
const ejs = require("ejs");
app.set('view engine', 'ejs');

// cookies
const cookieParser = require('cookie-parser');

//middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(cookieParser());


//database connection
const dbURI='mongodb+srv://devsoc:Musicplayer123@cluster0.vw0nx.mongodb.net/songs?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

//fire controllers
playlistController(app);


//routes
app.get('*',checkUser);
app.get('/',(req,res)=>res.render('home'));
app.use(authRoutes);
app.use(songsRoute);







