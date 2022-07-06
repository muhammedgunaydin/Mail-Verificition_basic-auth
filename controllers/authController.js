const User = require('../models/User')
const bcrypt = require('bcrypt')
const sendMail = require('../mail/generateMail')

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    sendMail(user.email, user.id)
    res.status(201).json({
      message: 'success',
      user,
    })
  } catch (error) {
    res.status(400).json({
      message: 'fail',
      error,
    })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { number, password } = req.body
    User.findOne({ number }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, match) => {
          if (match) {
            res.status(200).json({
              message: 'success',
              user,
            })
          } else {
            res.status(400)
          }
        })
      } else {
        res.status(400)
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params._id })
    user.status = req.body.status
    user.save()

    res.status(200).json({
      message: 'success',
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}
