const nodemailer = require('nodemailer')

const sendmail = async ({from,to,subject,text,html})=>{
   let transporter = nodemailer.createTransport({
      host:process.env.SMTP_HOST,
      port:"587",
      secure:false,
      auth:{
          user:process.env.MAIL_USER,
          pass:process.env.MAIL_PASS
      }
   });
   let info = await transporter.sendMail({
       from:`${from} > file share`,
       to,
       subject,
       text,
       html
   })
}

module.exports = sendmail;