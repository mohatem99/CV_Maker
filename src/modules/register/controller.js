import User from "../../db/models/user.model.js";

export const register = (req, res, next) => {
  res.render("register.ejs");
};
export const handleRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await User.create({ name, email, password });
    res.redirect("/login");
  } catch (err) {
    res.redirect("/register");
  }
};
