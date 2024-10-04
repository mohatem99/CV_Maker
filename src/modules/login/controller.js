import User from "../../db/models/user.model.js";
import bcrypt from "bcrypt";
export const login = (req, res, next) => {
  res.render("login.ejs");
};

export const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.render("login", {
        errorMessage: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render("login", {
        errorMessage: "Invalid email or password",
      });
    }

    req.session.isLoggedIn = true;
    req.session.userId = user._id;
    req.session.name = user.name;
    req.session.email = user.email;
    res.redirect("/");
  } catch (err) {
    redirect("login");
  }
};
