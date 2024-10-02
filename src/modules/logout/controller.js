import User from "../../db/models/user.model.js";

export const logout = (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/login");
  });
};
