import { User } from "../db/models/UserSchema.js";
import jsonwebtoken from "jsonwebtoken";
import { validateEmail } from "../db/validators.js";
import { config } from "../config.js";

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
  if(user.comparePassword(req.body.password)){
    const { city, phone, business, description, NIP, openHour, closeHour, password} = req.body;
    if(city) user.city = city;
    if(phone) user.phone = phone;
    if(business) user.business = business;
    if(description) user.description = description;
    if(NIP) user.NIP = NIP;
    if(openHour) user.openHour = openHour;
    if(closeHour) user.closeHour = closeHour;
    if(password) user.password = password;
    try {
      await user.save();
      res.json({message: "Succesfully data changed!"})
    } catch (error) {
      res.json({error: "Couldn't get data"});
    }
  }else{
    return res.status(422).json({error: "invalid Password"})
  }
};