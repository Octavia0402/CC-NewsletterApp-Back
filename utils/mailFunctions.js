const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
dotenv.config();

const sendMail = (receivers, sender, msg, subject) => {
    const msgToSend = {
        to: receivers,
        from: sender,
        subject,
        text: msg,
    };

    sgMail
        .send(msgToSend)
        .then((response) => {
            console.log(response);
            return 200;
        })
        .catch((error)=> {
            console.log(error);
            return 500;
        });
}

module.exports={
    sendMail
}