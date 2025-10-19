export const generateSummary = (resume) => {
  try {
    const skills = (resume.skills || []).map(s => s.name).filter(Boolean);
    const projects = resume.projects || [];
    const courses = (resume.courses || []).map(c => c.name).filter(Boolean);
    const experiences = resume.experience || [];

    // 🔹 Calculate years of experience
    let totalExperienceYears = 0;
    if (experiences.length > 0) {
      const durations = experiences.map(exp => {
        if (!exp.from) return 0;
        const from = new Date(exp.from);
        const to = exp.isWorking ? new Date() : new Date(exp.to || new Date());
        const diffYears = (to - from) / (1000 * 60 * 60 * 24 * 365);
        return diffYears;
      });
      totalExperienceYears = durations.reduce((a, b) => a + b, 0);
    }

    // 🔹 Build summary dynamically
    let summary = "";

    // Case 1: Experienced candidate
    if (totalExperienceYears >= 1) {
      summary += `Experienced professional with around ${totalExperienceYears.toFixed(1)} year${totalExperienceYears >= 2 ? 's' : ''} of hands-on experience. `;
      if (skills.length) summary += `Skilled in ${skills.join(", ")}. `;
      if (projects.length) summary += `Worked on ${projects.length} project${projects.length > 1 ? 's' : ''}, demonstrating practical problem-solving skills. `;
      if (courses.length) summary += `Completed relevant courses including ${courses.join(", ")}. `;
    }

    // Case 2: Fresher
    else {
      summary += `Motivated fresher eager to apply theoretical knowledge to real-world applications. `;
      if (skills.length) summary += `Proficient in ${skills.join(", ")}. `;
      if (projects.length) summary += `Built ${projects.length} project${projects.length > 1 ? 's' : ''} to strengthen practical understanding. `;
      if (courses.length) summary += `Completed courses such as ${courses.join(", ")}. `;
    }

    return summary.trim() || "Enthusiastic individual eager to contribute and learn in a professional environment.";
  } catch (e) {
    return "Passionate learner eager to explore new opportunities.";
  }
};
