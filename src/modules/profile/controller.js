import ResumeModel from "../../db/models/resume.js";

export const profile = async (req, res) => {
  try {
    const resumes = await ResumeModel.find({ createdBy: req.session.userId });

    res.render("profile", { resumes, session: req.session });
  } catch (err) {
    res.redirect("/login");
  }
};
