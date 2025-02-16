import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "BASIC_SECRET";

export default {
  async register(userData) {
    // Check is password match rePassword!
    // if (userData.password !== userData.rePassword) {
    //     throw new Error('Password missmatch!');
    // }

    
    // Check if email exist!
    const userCount = await User.countDocuments({email: userData.email});
    if (userCount > 0) {
      throw Error("Email already exist");
    }
    return User.create(userData);
  },
  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: "2h" });

    return token;
  },
};
