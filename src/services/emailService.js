import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

export async function enviarCorreoListado(destinatario, eventos) {
  const contenido = eventos.map(e => `- ${e.titulo} (${e.fecha}) en ${e.lugar}`).join('<br>')

  await transporter.sendMail({
    from: `"Sistema de Eventos" <${process.env.MAIL_USER}>`,
    to: destinatario,
    subject: 'Listado de eventos consultados',
    html: `<p>Estos son los eventos disponibles:</p><p>${contenido}</p>`
  })
}
