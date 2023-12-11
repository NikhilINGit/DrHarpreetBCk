
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
    console.log("2------------------->>>>>>>>",EMAIL,"-----------",PASSWORD)
}
const venderBuyProductEmail = (email,value,name) => {
    // var link=`http://localhost:3001/vendor/registration/form/${value}`
    nodeMailer.sendMail({
        to: email,
        from: EMAIL,
        subject: 'product buy requirenment',
        text: `Hello ${name},  \n\n our company required these material.\n \n Quantity :${value}   \n\n Regards,\nTeam ASm`,
    })
    console.log("-------5------------------>>>>>",EMAIL,"-----------)))))))",PASSWORD)
}

module.exports = {
    venderRegistration,venderBuyProductEmail
}