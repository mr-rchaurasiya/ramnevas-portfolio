import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: [true, 'Please specify the secure Cloudinary file URL'],
      trim: true,
    },
    publicId: {
      type: String,
      required: [true, 'Please specify the Cloudinary public asset ID'],
      trim: true,
    },
    fileName: {
      type: String,
      required: [true, 'Please specify the original resume file name'],
      trim: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
