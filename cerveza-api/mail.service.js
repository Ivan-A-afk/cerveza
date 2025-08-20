const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // literal "apikey"
    pass: "TU_API_KEY_SENDGRID", // la API Key que creaste en SendGrid
  },
});

async function enviarCorreoBienvenida(destinatario, nombreUsuario) {
  const mailOptions = {
    from: '"Cerveza App" <amaya.ivan333@gmail.com>', // remitente verificado
    to: destinatario,
    subject: "Bienvenido a Cerveza App 🍻",
    html: `<p>Hola <b>${nombreUsuario}</b>, tu cuenta fue creada con éxito. ¡Salud! 🍺</p>`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreoBienvenida };

