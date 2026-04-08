import bcrypt from "bcrypt";
import User from "../models/user.js";

/**
 * @method POST
 * @path /user/signup
 */
const signup = async (req, res) => {
  const { email, password } = req.body;

  // check if the user exists in database
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists)
    return res.status(409).json({ msg: "User already exists!" });

  //create a new user
  const user = new User({ email, password });
  await user.save();

  const authToken = user.generateJWT();

  // optional (session cookie)
  req.session = {
    authToken,
  };

  res.status(201).json(user);
};

/**
 * @method POST
 * @path /user/login
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = user.generateJWT();

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { signup, login };
