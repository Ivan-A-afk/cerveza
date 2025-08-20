const nodemailer = require('nodemailer');

// Configuración del transporte (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bellaamayacontreras@gmail.com',
    pass: 'Styles11'
  }
});

// Función para enviar correo
async function enviarCorreoBienvenida(destinatario, nombreUsuario) {
  const mailOptions = {
    from: '"Cerveza App" <tu-email@dominio.com>',
    to: destinatario,
    subject: "Bienvenido a Cerveza App 🍻",
    html: `<p>Hola <b>${nombreUsuario}</b>, tu cuenta fue creada con éxito. ¡Salud! 🍺</p>`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreoBienvenida };