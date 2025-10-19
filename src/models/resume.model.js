import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  place: String,
  role: {
    type: String,
    required: true
  },
  description: String,
  from: {
    type: Date,
    required: true
  },
  to: Date,
  isWorking: {
    type: Boolean, default: false
  }
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  techStack: [String],
});

const courseSchema = new mongoose.Schema({
  name: String,
  platform: String,
  certificate_url: String,
});

const skillSchema = new mongoose.Schema({
  name: String,
});

const achievementSchema = new mongoose.Schema({
  title: String,
  organization: String,
  date: Date,
});


const resumeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: String,
  experience: [experienceSchema],
  projects: [projectSchema],
  courses: [courseSchema],
  skills: [skillSchema],
  achievements: [achievementSchema],
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
