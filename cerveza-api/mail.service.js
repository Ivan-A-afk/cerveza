const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY // en vez de poner la clave directamente
  }
});
// Función para enviar correo de bienvenida con contraseña
async function enviarCorreoBienvenida(destinatario, nombre, contraseña) {
  const mailOptions = {
    from: '"E-commerce App 🍺" <amaya.ivan333@gmail.com>', // remitente verificado
    to: destinatario,
    subject: `¡Bienvenido a E-commerce App, ${nombre}!`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background-color: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
          
          <h2 style="color: #D2691E; margin-bottom: 10px;">¡Hola ${nombre}!</h2>
          <p style="color: #555; font-size: 16px;">Tu cuenta en <b>E-commerce App</b> ha sido creada con éxito.</p>

          <p style="color: #555; font-size: 16px; margin-top: 20px;">
            Tu contraseña es: <strong style="color: #D2691E;">${contraseña}</strong>
          </p>
          <p style="color: #999; font-size: 14px;">Guárdala en un lugar seguro y no la compartas con nadie.</p>

          <a href="https://tesis-8c265.web.app/#/products" 
             style="display: inline-block; margin-top: 25px; padding: 12px 25px; background-color: #D2691E; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Ir a la App
          </a>

          <p style="margin-top: 25px; font-size: 12px; color: #aaa;">
            Si no creaste esta cuenta, simplemente ignora este correo.
          </p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreoBienvenida };

