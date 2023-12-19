
var nodemailer = require('nodemailer');
const dotenv = require('dotenv')
//load env variables
dotenv.config({path:'../config/config.env'})
    var EMAIL = "nikhilchaudharyb08@gmail.com"
    var PASSWORD = "nhxk atow ijck hcrn"
const nodeMailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    // secure: false,
    // requireTLS: true,
    
    auth: {
        user: EMAIL,
        pass: PASSWORD
    },
    // authMethod: 'PLAIN'
})

const venderRegistration = (email,value) => {
    var link=`http://localhost:3001/vendor/registration/form/${value}`
    nodeMailer.sendMail({
        to: email,
        from: EMAIL,
        subject: 'Welcome to my comp',
        text: `Hello,  \n\n Welcome to Asm.\n the organization want to you   plz fill form  \n\n  form fill link are : ${link} \n\n Regards,\nTeam ASm
        
        registation link are `,
    })
}
const venderBuyProductEmail = (email,value,name,descrip,ser_no,id,prName) => {
    var link=`http://localhost:3001/vendor/registration/form/${value}`
    nodeMailer.sendMail({
        to: email,
        from: EMAIL,
        subject: 'product buy requirement',
        html: `
          <p>Hello ${name},</p>
          <p>Our company requires ${prName}materials.</p>
          <p>Quantity: ${value}</p>
          <p>Requirements: ${descrip}</p>
          <p>If you are able to deliver, please click the button below:</p>
          <a href="http://localhost:3001/vendor/product/access/${ser_no}/${id}" style="display: inline-block; font-size: 16px; color: #ffffff; background-color: #007bff; border: none; padding: 10px 20px; text-align: center; text-decoration: none; border-radius: 5px;">Click Here</a>
          <p>Regards,<br>Team ASm</p>
        `,
      });
   
}

module.exports = {
    venderRegistration,venderBuyProductEmail
}