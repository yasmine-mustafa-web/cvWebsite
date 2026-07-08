const express = require('express');
const app =express();
const mongoose=require('mongoose');
const path = require('path');
const ejs=require('ejs');
const ejsMate = require('ejs-mate');
const { MongoStore } = require('connect-mongo');
app.use(express.urlencoded({ extended: true }));
const User=require('./models/user');
const dbUrl = 'mongodb://yasminealyy:yasmina12@ac-slz8z22-shard-00-00.nuxgayy.mongodb.net:27017,ac-slz8z22-shard-00-01.nuxgayy.mongodb.net:27017,ac-slz8z22-shard-00-02.nuxgayy.mongodb.net:27017/cvwebsite?ssl=true&replicaSet=atlas-11c28c-shard-0&authSource=admin&appName=Cluster0';
mongoose.connect(dbUrl, { family: 4 });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected')
})

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});
store.on('error', function (e) {
    console.error('Session store error:', e);
});



app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/' , (req,res)=>{
    res.render('index');
})
app.post('/contact' , async(req,res) =>{
    try{
        const newUser = new User({
        email:req.body.email,
        message:req.body.message
    });
    await newUser.save();
    res.redirect('/');
    }catch(e){
        console.log(e)
    }
 
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})