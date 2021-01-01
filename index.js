require('dotenv').config();
const express = require('express')
const dbconnect = require('./config/db')
const cors = require('cors')
const path = require('path')
dbconnect();
const app = express();
app.use(express.json());
app.use(cors());


app.use(express.static('public'))
// app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

const PORT = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.render('index')
})

app.use('/api/files',require('./routes/file'))

app.use('/files',require('./routes/show'))
app.use('/files/download',require('./routes/download'))


app.listen(PORT,()=>{
    console.log(`Port listining at ${PORT}`);
})
