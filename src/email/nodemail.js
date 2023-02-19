const nodemailer = require("nodemailer");

const sendEmail = async (portnome, hora, data_dia2, uslmm, fstmm, boamm, empmm) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.outlook.com',
        port: 587,
        secure: false, //SSL/TLS
        auth: {
            user: 'email@email.com.br',
            pass: 'exemplo123'
        }
    })
    
    const mail = {
        from: "Balança <email@email.com.br>",
        to: `email1@email.com.br, email2@email.com.br, email3@email.com.br`,
        subject: `Indicadores de Chuva - Porteiro ${portnome} ${hora} `,
        //text:
        html: `<p>Data: <b>${data_dia2}</b></p>

        <p>USL =.........................<b>${uslmm},0</b> mm</p>
        
        <p>FST =.........................<b>${fstmm},0</b> mm</p>
        
        <p>Boa Vista =...................<b>${boamm},0</b> mm</p>
        
        <p>Empyreo =.....................<b>${empmm},0</b> mm</p>
        
        <p>Gerado pelo sistema <i>Informe de Chuva</i> / Portaria-Ramal: 3912</p>`,
    }
    
    transporter.sendMail(mail);
};

module.exports = sendEmail;