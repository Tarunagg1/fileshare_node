const router = require('express').Router();
const multer = require('multer');
const path = require('path')
const File = require('../models/filemodel')
const {v4:uuid4} = require('uuid');
const emailtemplate = require('../services/emailtemplate')

let storage = multer.diskStorage({
    destination:(req,file,cb)=> cb(null,'uploads/'),
    filename:(req,file,cb)=>{
        const uniquename = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniquename);
    }
})

let upload = multer({
    storage,
    limits:{fileSize:1000000 * 100},
}).single('myfile')

router.post('/',(req,res)=>{
    upload(req,res,async(err)=>{
        /// validate req
        if(!req.file){
            res.json({error:"All filed is require"});
        }
        if(err){
            console.log('err');
            return res.status(500).send({error:err.message})
        }
        // store into db
        const file = new File({
            filename:req.file.filename,
            uuid:uuid4(),
            path:req.file.path,
            size:req.file.size
        })
         const response = await file.save();
         return res.json({url:`${process.env.APP_BASE_URL}/files/${response.uuid}`});
    });
})

router.post('/send',async(req,res)=>{
    /// validate req
    const {email_to,email_from,uuid} = req.body;

    if(uuid=='' || email_to=='' || email_from==''){
        return res.status(422).send({error:"All field required"})
    }
    //// get data form db
    const file = await File.findOne({uuid:uuid});

    if(file.sender){
        return res.status(422).send({error:"Email allready sent"})
    }
    file.sender = email_from;
    file.reciver = email_to;
    const response = await file.save();
    console.log(response);

    ///// sent email
    const sendmail = require('../services/emailservice');
    sendmail({
        from:email_from,
        to:email_to,
        sub:"File share download link",
        text:`${email_from} shared file with you`,
        html:emailtemplate({
            emailFrom:email_from,
            downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size:parseInt(file.size/1000)+'KB',
            expires:'24 hours'
        }),
    })
    return res.status(200).send({success:true})
})

module.exports = router;
