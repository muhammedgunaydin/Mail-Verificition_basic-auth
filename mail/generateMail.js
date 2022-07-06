const nodemailer = require('nodemailer')
const hash = require('../hash/hash')

const sendMail = async (email, id) => {
  let hashToID = hash(id)
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    })
    await transporter.sendMail({
      from: process.env.AUTH_USER,
      to: email,
      subject: 'Mail verification',
      html: `<p>Lütfen mailinizi doğrulamak için buraya <a href=http://localhost:8000/verify/${hashToID}/${id}>Tıklayınız<a/></p>`,
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = sendMail
