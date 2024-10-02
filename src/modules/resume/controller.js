import ResumeModel from "../../db/models/resume.js";
export const resume = async (req, res, next) => {
  const resume = await ResumeModel.findOne({ createdBy: req.session.userId });

  let fileUrl;
  if (resume?.image) {
    fileUrl = `${req.protocol}://${req.get("host")}${resume.image}`;
  }
  res.render("resume.ejs", { session: req.session, resume, fileUrl });
};

export const handleResume = async (req, res, next) => {
  try {
    const { cv_details } = req.body;

    const resume = await ResumeModel.findOne({
      createdBy: req.session.userId,
    });
    if (resume) {
      if (resume.image) {
        cv_details.image = resume.image;
      }
    }

    const imageUrl = req.file && `/uploads/${req.file.filename}`;

    await ResumeModel.findOneAndUpdate(
      { createdBy: req.session.userId },
      {
        $set: {
          ...JSON.parse(cv_details),
          image: imageUrl,
          createdBy: req.session.userId,
        },
      },
      { upsert: true, new: true }
    );

    return res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
};
