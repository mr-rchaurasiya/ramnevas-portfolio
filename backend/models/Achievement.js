import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an achievement title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add an achievement description'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
