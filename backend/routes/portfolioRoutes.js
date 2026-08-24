import express from 'express';
import {
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
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

/* =========================================================================
   PUBLIC ROUTES (GET)
   ========================================================================= */
router.get('/projects', getProjects);
router.get('/experience', getExperience);
router.get('/education', getEducation);
router.get('/skills', getSkills);
router.get('/achievements', getAchievements);
router.get('/resume', getResume);

/* =========================================================================
   PUBLIC SUBMISSIONS ROUTE
   ========================================================================= */
router.post('/contact', submitContactForm);

/* =========================================================================
   PROTECTED ADMIN ROUTES (POST, PUT, DELETE)
   ========================================================================= */
// Projects
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

// Experience
router.post('/experience', protect, createExperience);
router.put('/experience/:id', protect, updateExperience);
router.delete('/experience/:id', protect, deleteExperience);

// Education
router.post('/education', protect, createEducation);
router.put('/education/:id', protect, updateEducation);
router.delete('/education/:id', protect, deleteEducation);

// Skills
router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

// Achievements
router.post('/achievements', protect, createAchievement);
router.put('/achievements/:id', protect, updateAchievement);
router.delete('/achievements/:id', protect, deleteAchievement);

// Resume
router.post('/resume', protect, upload.single('resume'), uploadResume);

export default router;
