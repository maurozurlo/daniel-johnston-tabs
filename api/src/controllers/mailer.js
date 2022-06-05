require('dotenv').config()
const nodemailer = require("nodemailer")

const sendEmail = async (to, html, subject, payload, sender) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const replyTo = sender ? { replyTo: `${payload.name} <${sender}>` } : null
  // Don't send email in debug mode
  if (process.env.DEBUG === 'true') return

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${process.env.RESTAURANT_NAME} <${process.env.EMAIL_SENDER}>`,
      to,
      subject,
      text: "Please view in a browser that supports html", // plain text body
      ...replyTo,
      html
    });
    console.log("Message sent: %s", info.messageId)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  sendEmail
}
