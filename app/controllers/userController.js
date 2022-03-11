import { config } from "../config.js";
import { User } from "../db/models/UserSchema.js";
import nodemailer from "nodemailer";
import jsonwebtoken from "jsonwebtoken";


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
    if (isValidPassword) {
      const token = jsonwebtoken.sign({ id: user.id }, config.jwt);
      return res.header("auth-token", token).send(token);
    }
    return res.json({ error: "Invalid password" });
  } catch (error) {
    res.json(error);
  }
};

export const reset = async (req, res) => {

  const email = req.body.email;
  User.findOne({email: email}, (err, user) =>{
    if(err || !user){
      return res.status(400).json({error: "Email does not exists."})
    }
    const token = jsonwebtoken.sign({ id: user.id }, config.jwt, {expiresIn: "20m"});

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.email,
        pass: config.password
      }
    });

    let mailOptions = {
      from: config.email,
      to: email,
      subject: "Reset password",
      html: `<h2> To reset your password <a href="https://coderscamplittledevs.github.io/CodersCamp2021-ProjectSinglePageApplication-PetsAdoptAndCarePortal/#/CodersCamp2021-ProjectSinglePageApplication-PetsAdoptAndCarePortal/auth/reset/${token}">click here</a></h2>`
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