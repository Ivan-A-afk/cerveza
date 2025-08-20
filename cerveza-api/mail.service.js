import nodemailer from 'nodemailer';

// Configuración del transporte (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bellaamayacontreras@gmail.com',
    pass: 'Styles11'
  }
});

// Función para enviar correo
async function enviarCorreoBienvenida(destinatario, nombre) {
  try {
    const info = await transporter.sendMail({
      from: '"Mi App" <bellaamayacontreras@gmail.com>',
      to: destinatario,
      subject: "🎉 Bienvenido a E-commerce",
      html: `<h2>Hola ${nombre},</h2>
             <p>¡Gracias por registrarte!</p>
             <p>Estamos felices de tenerte a bordo 🚀</p>`,
    });
    console.log("Correo enviado:", info.messageId);
  } catch (err) {
    console.error("Error enviando correo:", err);
  }
}

module.exports = { enviarCorreoBienvenida };