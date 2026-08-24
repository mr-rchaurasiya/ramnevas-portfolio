import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, 'Please add a degree/qualification title'],
      trim: true,
    },
    institution: {
      type: String,
      required: [true, 'Please add the institution name'],
      trim: true,
    },
    startYear: {
      type: String,
      required: [true, 'Please specify the start year'],
      trim: true,
    },
    endYear: {
      type: String,
      required: [true, 'Please specify the graduation year'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model('Education', educationSchema);

export default Education;
