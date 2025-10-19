import fs from "fs";
import User from "../models/user.model.js";
import Resume from "../models/resume.model.js";
import { generateResumePDF } from "../utils/pdfGenerator.js";
import { generateSummary } from "../utils/summaryGenerator.js";

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user_id: req.user.id });
    if (!resume) return res.status(404).json({ message: "You have not created any resume" });
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const {title, projects, skills, courses, achievements, experience } = req.body;

    let resume = await Resume.findOne({ user_id: req.user.id });
    if (!resume) {
      resume = new Resume({ user_id: req.user.id, title, projects, skills, courses, achievements, experience });
    } else {
      resume.projects = projects || resume.projects;
      resume.skills = skills || resume.skills;
      resume.courses = courses || resume.courses;
      resume.achievements = achievements || resume.achievements;
      resume.experience = experience || resume.experience;
    }

    resume.summary = generateSummary(resume);
    await resume.save();

    res.status(201).json({ message: "Resume updated successfully", resume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadResumePDF = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const resume = await Resume.findOne({ user_id: user._id });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    if (!resume.summary) {
      resume.summary = generateSummary(resume);
      await resume.save();
    }

    const filePath = await generateResumePDF(resume, user);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${user.name}_Resume.pdf`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on("end", () => {
      try { fs.unlinkSync(filePath); } catch (e) { }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
