const nodemailer = require("nodemailer");

// Configuración del transporte con SendGrid
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // esto va literal, siempre "apikey"
    pass: process.env.SENDGRID_API_KEY, // tu API Key de SendGrid
  },
});

// Función para enviar correo
async function enviarCorreoBienvenida(destinatario, nombreUsuario) {
  const mailOptions = {
    from: '"Cerveza App 🍺" <no-reply@cervezaapp.com>', // el remitente debe estar verificado en SendGrid
    to: destinatario,
    subject: "Bienvenido a Cerveza App 🍻",
    html: `<p>Hola <b>${nombreUsuario}</b>, tu cuenta fue creada con éxito. ¡Salud! 🍺</p>`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
    throw error;
  }
}

module.exports = { enviarCorreoBienvenida };
