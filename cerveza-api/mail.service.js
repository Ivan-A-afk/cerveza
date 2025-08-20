const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY // en vez de poner la clave directamente
  }
});

// Función para enviar correo de bienvenida
async function enviarCorreoBienvenida(destinatario, nombre) {
  const mailOptions = {
    from: '"E-commerce App 🍺" <amaya.ivan333@gmail.com>', // debe ser un remitente verificado
    to: destinatario,
    subject: `¡Bienvenido a E-commerce App, ${nombre}!`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
        <h2 style="color: #D2691E;">¡Hola ${nombre}!</h2>
        <p>Tu cuenta en <b>E-commerce</b> ha sido creada con éxito.</p>
        <p>Estamos emocionados de tenerte con nosotros 🍻</p>
        <a href="https://tu-app.com/login" 
           style="display: inline-block; padding: 10px 20px; margin-top: 15px; background-color: #D2691E; color: white; text-decoration: none; border-radius: 5px;">
           Ir a la App
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">
          Si no creaste esta cuenta, ignora este correo.
        </p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreoBienvenida };

