import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true, 'Please specify technologies used in this project'],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'A project must have at least one technology specified.',
      },
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
