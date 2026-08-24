import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please add a role/job title'],
      trim: true,
    },
    startDate: {
      type: String,
      required: [true, 'Please add a start date (e.g. June 2023)'],
      trim: true,
    },
    endDate: {
      type: String,
      required: [true, 'Please add an end date or Present'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description of your work'],
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
