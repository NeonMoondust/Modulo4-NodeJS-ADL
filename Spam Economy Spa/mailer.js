const nodemailer = require('nodemailer');

const own_email = 'testodesafiolatam@gmail.com';

async function send(to, subject, text){
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: own_email,
            pass: 'hola.123'
        }
    });

    let mailOptions = {
        from: own_email,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) return(console.log(err));
        console.log(data);
    });
}
module.exports = send;