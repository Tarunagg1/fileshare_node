const router = require('express').Router();
const File = require('../models/filemodel')

router.get('/:id',async(req,res)=>{  
      const file = await File.findOne({uuid:req.params.id})
      if(!file){
        return res.render('download',{error:"Link has been expires"});
      }
      const filepath = `${__dirname}/../${file.path}`;      
      res.download(filepath);
})



module.exports = router;