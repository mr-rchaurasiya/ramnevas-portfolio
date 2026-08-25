import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Skill from '../models/Skill.js';
import Achievement from '../models/Achievement.js';
import Resume from '../models/Resume.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import sendEmail from '../utils/sendEmail.js';

/* =========================================================================
   PUBLIC VIEW ENDPOINTS (GET)
   ========================================================================= */

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// @desc    Get all experience history
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res) => {
  try {
    const experiences = await Experience.find({});
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experience history', error: error.message });
  }
};

// @desc    Get all education history
// @route   GET /api/education
// @access  Public
const getEducation = async (req, res) => {
  try {
    const educations = await Education.find({});
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education history', error: error.message });
  }
};

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({});
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
};

// @desc    Get the latest uploaded resume
// @route   GET /api/resume
// @access  Public
const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({}).sort({ uploadedAt: -1 });
    if (!resume) {
      return res.status(404).json({ message: 'Resume document not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume', error: error.message });
  }
};

/* =========================================================================
   PROTECTED ADMIN ENDPOINTS (POST, PUT, DELETE)
   ========================================================================= */

// --- PROJECTS ---
// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl, image } = req.body;
    const project = await Project.create({ title, description, technologies, githubUrl, liveUrl, image });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl, image } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.title = title || project.title;
    project.description = description || project.description;
    project.technologies = technologies || project.technologies;
    project.githubUrl = githubUrl !== undefined ? githubUrl : project.githubUrl;
    project.liveUrl = liveUrl !== undefined ? liveUrl : project.liveUrl;
    project.image = image !== undefined ? image : project.image;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error updating project', error: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.deleteOne();
    res.status(200).json({ message: 'Project removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

// --- EXPERIENCE ---
// @desc    Create a new experience record
// @route   POST /api/experience
// @access  Private (Admin)
const createExperience = async (req, res) => {
  try {
    const { company, role, startDate, endDate, description, technologies } = req.body;
    const experience = await Experience.create({ company, role, startDate, endDate, description, technologies });
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ message: 'Error creating experience record', error: error.message });
  }
};

// @desc    Update an experience record
// @route   PUT /api/experience/:id
// @access  Private (Admin)
const updateExperience = async (req, res) => {
  try {
    const { company, role, startDate, endDate, description, technologies } = req.body;
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience record not found' });
    }
    experience.company = company || experience.company;
    experience.role = role || experience.role;
    experience.startDate = startDate || experience.startDate;
    experience.endDate = endDate || experience.endDate;
    experience.description = description || experience.description;
    experience.technologies = technologies || experience.technologies;

    const updatedExperience = await experience.save();
    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(400).json({ message: 'Error updating experience record', error: error.message });
  }
};

// @desc    Delete an experience record
// @route   DELETE /api/experience/:id
// @access  Private (Admin)
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience record not found' });
    }
    await experience.deleteOne();
    res.status(200).json({ message: 'Experience record removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting experience record', error: error.message });
  }
};

// --- EDUCATION ---
// @desc    Create a new education record
// @route   POST /api/education
// @access  Private (Admin)
const createEducation = async (req, res) => {
  try {
    const { degree, institution, startYear, endYear, description } = req.body;
    const education = await Education.create({ degree, institution, startYear, endYear, description });
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ message: 'Error creating education record', error: error.message });
  }
};

// @desc    Update an education record
// @route   PUT /api/education/:id
// @access  Private (Admin)
const updateEducation = async (req, res) => {
  try {
    const { degree, institution, startYear, endYear, description } = req.body;
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    education.degree = degree || education.degree;
    education.institution = institution || education.institution;
    education.startYear = startYear || education.startYear;
    education.endYear = endYear || education.endYear;
    education.description = description !== undefined ? description : education.description;

    const updatedEducation = await education.save();
    res.status(200).json(updatedEducation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating education record', error: error.message });
  }
};

// @desc    Delete an education record
// @route   DELETE /api/education/:id
// @access  Private (Admin)
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    await education.deleteOne();
    res.status(200).json({ message: 'Education record removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting education record', error: error.message });
  }
};

// --- SKILLS ---
// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private (Admin)
const createSkill = async (req, res) => {
  try {
    const { category, name } = req.body;
    const skill = await Skill.create({ category, name });
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: 'Error creating skill', error: error.message });
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
const updateSkill = async (req, res) => {
  try {
    const { category, name } = req.body;
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    skill.category = category || skill.category;
    skill.name = name || skill.name;

    const updatedSkill = await skill.save();
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(400).json({ message: 'Error updating skill', error: error.message });
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    await skill.deleteOne();
    res.status(200).json({ message: 'Skill removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill', error: error.message });
  }
};

// --- ACHIEVEMENTS ---
// @desc    Create a new achievement
// @route   POST /api/achievements
// @access  Private (Admin)
const createAchievement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const achievement = await Achievement.create({ title, description });
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ message: 'Error creating achievement', error: error.message });
  }
};

// @desc    Update an achievement
// @route   PUT /api/achievements/:id
// @access  Private (Admin)
const updateAchievement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    achievement.title = title || achievement.title;
    achievement.description = description || achievement.description;

    const updatedAchievement = await achievement.save();
    res.status(200).json(updatedAchievement);
  } catch (error) {
    res.status(400).json({ message: 'Error updating achievement', error: error.message });
  }
};

// @desc    Delete an achievement
// @route   DELETE /api/achievements/:id
// @access  Private (Admin)
const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    await achievement.deleteOne();
    res.status(200).json({ message: 'Achievement removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting achievement', error: error.message });
  }
};

// --- RESUME ---
// @desc    Upload or replace the resume
// @route   POST /api/resume
// @access  Private (Admin)
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please select a PDF file to upload' });
    }

    // Upload local file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/resumes',
      resource_type: 'raw',
    });

    // Delete the local file after uploading to Cloudinary
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Search for existing resume to destroy from Cloudinary
    const existingResume = await Resume.findOne({});
    if (existingResume) {
      try {
        await cloudinary.uploader.destroy(existingResume.publicId, { resource_type: 'raw' });
      } catch (err) {
        console.error('Failed to destroy previous resume on Cloudinary:', err.message);
      }
      await existingResume.deleteOne();
    }

    // Save the new resume document in MongoDB
    const resume = await Resume.create({
      fileUrl: result.secure_url,
      publicId: result.public_id,
      fileName: req.file.originalname,
    });

    res.status(201).json(resume);
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ message: 'Error replacing resume document', error: error.message });
  }
};

// --- CONTACT FORM ---
// @desc    Submit contact messages (Validation only)
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill out all fields: Name, Email, Subject, and Message.' });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    console.log(`\n--- NEW CONTACT MESSAGE ---`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message:\n${message}`);
    console.log(`---------------------------\n`);

    // Prepare email contents
    const textContent = `You have received a new message from your portfolio contact form.
    
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eaeaea; border-radius: 5px;">
        <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #7c3aed; border-radius: 4px;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `;

    // Send email alert asynchronously in the background to avoid blocking the response
    sendEmail({
      from: { name, email },
      subject,
      text: textContent,
      html: htmlContent,
    }).catch((err) => {
      console.error(`[Background Email Error]: ${err.message}`);
    });

    res.status(200).json({ success: true, message: 'Message validated and received successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing contact request', error: error.message });
  }
};

export {
  getProjects,
  getExperience,
  getEducation,
  getSkills,
  getAchievements,
  getResume,
  createProject,
  updateProject,
  deleteProject,
  createExperience,
  updateExperience,
  deleteExperience,
  createEducation,
  updateEducation,
  deleteEducation,
  createSkill,
  updateSkill,
  deleteSkill,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  uploadResume,
  submitContactForm,
};
