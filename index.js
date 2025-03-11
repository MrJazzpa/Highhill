const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');

const connectDB = require('./server/config/db');


const app = express();
const port = 3000 || process.env.PORT;
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({ 
    secret:"Wizzyjazzpa", 
    saveUninitialized: false, 
    resave: false,
    cookie: { secure: false,expires:680000 }
})); 

app.use(flash())
//middleware  to pass flash
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next()
})

//calling static files 
app.use(express.static('public'));
//template engine 
app.set('view engine','ejs');


app.use('/',require('./server/routes/route_pages'));
app.use('/api',require('./server/routes/api_routes'))



app.get("*",(req,res)=>{
    res.render('404');
})

app.listen(port,()=>{

    console.log(`app listetning to ${port}`);

})