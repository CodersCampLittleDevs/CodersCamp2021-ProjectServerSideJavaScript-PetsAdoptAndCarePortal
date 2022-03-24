import { config } from "../config.js";
import { User } from "../db/models/UserSchema.js";
import nodemailer from "nodemailer";
import jsonwebtoken from "jsonwebtoken";
import { validateEmail } from "../db/validators.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  const { email, password, username, city, phone } = req.body;
  const newUser = new User({
    email,
    password,
    username,
    city,
    phone,
  });
  try {
    await newUser.save();
    res.json({ message: "User has been created" });
  } catch (e) {
    res.status(422).json({ errors: e });
  }
};

export const login = async (req, res, next) => {
  let user;
  try {
    if (req.body.email) {
      const isValidMail = validateEmail(req.body.email);
      if (isValidMail) {
        user = await User.findOne({ email: req.body.email });
      } else {
        return res.json({ error: "email is invalid" });
      }
    }
    const isValidPassword = user.comparePassword(req.body.password);
    const { _id, email, username, city, phone } = user;
    if (isValidPassword) {
      const token = jsonwebtoken.sign(
        { id: _id, email, username, city, phone },
        config.jwt,
      );
      return res.header("auth-token", token).send(token);
    }
    return res.json({ error: "Invalid password" });
  } catch (error) {
    res.json(error);
  }
};

export const forgot = async (req, res) => {

  const email = req.body.email;
  User.findOne({email: email}, (err, user) =>{
    if(err || !user){
      return res.status(400).json({error: "Email does not exists."})
    }
    const token = jsonwebtoken.sign({ id: user.id }, config.jwt, {expiresIn: "20m"});

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.email,
        pass: config.password
      }
    });

    let mailOptions = {
      from: config.email,
      to: email,
      subject: "Reset password",
      html: `<h2> To reset your password <a href="http://localhost:${config.port}/auth/reset/${token}">click here</a></h2>`
    }
    transporter.sendMail(mailOptions, (err, data) =>{
      if(err){
        return res.status(400).json({error: "reset password sending link error"})
      }
      User.updateOne({resetLink: token}, (err, success) =>{
        try {
          res.status(201).json({message: "Message sent"})
        } catch (err) {
          res.status(400).json({error: "reset password link error"})
        }
      })
    })
  })
}

export const reset = async (req, res) => {
  const token = req.params.token;
  let newPassword = req.body.password;
  let user;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  let decoded = jsonwebtoken.decode(token);
  user = await User.findById(decoded.id);
  user.password = hash;

try {
  await user.save();
  return res.status(200).json({message: "Password has been changed!"})

} catch (error) {
  res.status(400).json({error: error})
}
}

export const getUserData = async (req, res, next) => {
  const id = req.params.uid;
  let user;
  try {
    user = await User.findById(id);
    res.status(201).json({
      email: user.email,
      username: user.username,
      city: user.city,
      phone: user.phone,
      announcements: user.announcements,
      business: user.business,
      description: user.description,
      NIP: user.NIP,
      openHour: user.openHour,
      closeHour: user.closeHour,
    });
  } catch (error) {
    res.status(422).json({ error: "User not found" });
  }
};

export const updateUser = async (req, res, next) => {
  let user;
  const id = req.params.uid;
  try {
    user = await User.findById(id);
  } catch (error) {
    res.status(400).json({ error: "User not found" });
  }
  if (user.comparePassword(req.body.password)) {
    const {
      city,
      phone,
      business,
      description,
      NIP,
      openHour,
      closeHour,
      password,
    } = req.body;
    if (city) user.city = city;
    if (phone) user.phone = phone;
    if (business) user.business = business;
    if (description) user.description = description;
    if (NIP) user.NIP = NIP;
    if (openHour) user.openHour = openHour;
    if (closeHour) user.closeHour = closeHour;
    if (password) user.password = password;
    try {
      await user.save();
      res.json({ message: "Succesfully data changed!" });
    } catch (error) {
      res.json({ error: error });
    }
  } else {
    return res.status(422).json({ error: "invalid Password" });
  }
};