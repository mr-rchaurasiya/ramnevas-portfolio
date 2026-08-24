import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Please add a skill category (e.g. Programming Languages, Frontend)'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a skill name (e.g. React.js)'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate skills inside the same category
skillSchema.index({ category: 1, name: 1 }, { unique: true });

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
