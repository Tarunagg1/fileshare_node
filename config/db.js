const mongoose = require('mongoose')

const connectdb = ()=>{
    let url = null
    if(process.env.WEB_STATUS == 'dev'){
        url = process.env.MONGO_CON_DEV;
    }else{
        url = process.env.MONGO_CON_PROD;
    }
    mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:true,useUnifiedTopology:true});
    const connection = mongoose.connection;
    connection.once('open',()=>{
        console.log('db connection establish');
    }).catch((err)=>{
        console.log('connection failed');
    })
}

module.exports = connectdb;