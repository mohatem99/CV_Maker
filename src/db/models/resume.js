import { Schema, model, Types } from "mongoose";

const resumeSchema = new Schema({
  firstname: String,
  middlename: String,
  lastname: String,
  designation: String,
  address: String,
  email: String,
  phoneno: String,
  summary: String,
  image: {
    public_id: String,
    secure_url: String,
  },
  experiences: [
    {
      exp_title: String,
      exp_organization: String,
      exp_location: String,
      exp_start_date: String,
      exp_end_date: String,
      exp_description: String,
    },
  ],
  achievements: [{ achieve_title: String, achieve_description: String }],
  educations: [
    {
      edu_school: String,
      edu_degree: String,
      edu_city: String,
      edu_start_date: String,
      edu_graduation_date: String,
      edu_description: String,
    },
  ],
  projects: [
    { proj_title: String, proj_link: String, proj_description: String },
  ],
  skills: [{ skill: String }],
  type: {
    type: String,
    enum: ["ats", "brown", "latte"],
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ResumeModel = model("Resume", resumeSchema);

export default ResumeModel;
