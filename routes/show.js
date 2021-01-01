const router = require('express').Router();
const File = require('../models/filemodel')

router.get('/:id',async(req,res)=>{
    try {
        const file = await File.findOne({uuid:req.params.id});
        if(!file){
            return res.render('download',{error:"Link has been expired"});
        }
        return res.render('download',{
            uuid:file.uuid,
            fileName:file.filename,
            fileSize:file.size,
            downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    } catch (error) {
        console.log(error);
        return res.render('download',{error:"Some thin went wrong"});
    }
      
})




module.exports = router;