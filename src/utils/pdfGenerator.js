import PDFDocument from "pdfkit";
import fs from "fs";

export const generateResumePDF = async (resume, user) => {
  const doc = new PDFDocument({ margin: 50 });
  const filePath = `./resume_${user._id}.pdf`;
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);


  doc.fontSize(20).text(user.name, { align: "center" });

  doc.moveDown(0.15);
  doc.fontSize(13).text(resume.title, { align: "center" });

  doc.moveDown(0.25);
  doc.fontSize(10).fillColor("#555").text(user.email, { align: "center" });
  doc.moveDown(1);


  if (resume.summary) {
    doc.fontSize(14).fillColor("#000").text("Professional Summary");
    doc.moveDown(0.25);
    doc.fontSize(11).fillColor("#333").text(resume.summary);
    doc.moveDown(0.8);
  }


  if (resume.skills?.length) {
    doc.fontSize(14).fillColor("#000").text("Skills");
    doc.moveDown(0.25);
    doc.fontSize(11).fillColor("#333");
    resume.skills.forEach(s => doc.text(`• ${s.name}`));
    doc.moveDown(0.8);
  }

  if (resume.experience?.length) {
    doc.fontSize(14).fillColor("#000").text("Experience");
    doc.moveDown(0.25);
    resume.experience.forEach(exp => {
      const from = exp.from ? new Date(exp.from).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";
      const to = exp.isWorking
        ? "Present"
        : exp.to
          ? new Date(exp.to).toLocaleDateString("en-US", { month: "short", year: "numeric" })
          : "";

      doc.fontSize(12).fillColor("#000").text(`${exp.company}${exp.place ? `, ${exp.place}` : ""}`);
      doc.fontSize(10).fillColor("#777").text(`${from} - ${to}`);
      if (exp.role) doc.fontSize(11).fillColor("#333").text(exp.role);
      if (exp.description) doc.fontSize(11).fillColor("#333").text(exp.description);
      doc.moveDown(0.6);
    });
    doc.moveDown(0.5);
  }


  if (resume.projects?.length) {
    doc.fontSize(14).fillColor("#000").text("Projects");
    doc.moveDown(0.25);
    resume.projects.forEach(p => {
      doc.fontSize(12).fillColor("#000").text(p.title);
      if (p.techStack && p.techStack.length) {
        doc.fontSize(10).fillColor("#777").text(`Tech: ${p.techStack.join(", ")}`);
      }
      doc.fontSize(11).fillColor("#333").text(p.description || '');
      doc.moveDown(0.5);
    });
    doc.moveDown(0.5);
  }


  if (resume.courses?.length) {
    doc.fontSize(14).fillColor("#000").text("Courses");
    doc.moveDown(0.25);
    resume.courses.forEach(c => doc.fontSize(11).fillColor("#333").text(`• ${c.name} - ${c.platform || ''}`));
    doc.moveDown(0.5);
  }


  if (resume.achievements?.length) {
    doc.fontSize(14).fillColor("#000").text("Achievements");
    doc.moveDown(0.25);
    resume.achievements.forEach(a => {
      const d = a.date ? new Date(a.date).toDateString() : '';
      doc.fontSize(11).fillColor("#333").text(`• ${a.title} - ${a.organization || ''} ${d}`);
    });
  }

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};
