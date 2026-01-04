const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    })

    console.log("Sending email to:", email)
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email sending timed out after 15s")), 15000)
    )

    // Race the mail sending against the timeout
    let info = await Promise.race([
      transporter.sendMail({
        from: `"Studynotion | Kartik Sir" <${process.env.MAIL_USER}>`,
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`,
      }),
      timeoutPromise
    ])
    
    console.log("Email sent successfully:", info.response)
    return info
  } catch (error) {
    console.log("Mail sending error:", error.message)
    throw error
  }
}

module.exports = mailSender
