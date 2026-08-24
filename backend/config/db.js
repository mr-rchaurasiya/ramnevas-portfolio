import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb+srv://ramnevas8188_db_user:uQPccSjSyNZnTWKa@cluster0.rreasvw.mongodb.net/ramnevas-portfolio?appName=Cluster0';
    const conn = await mongoose.connect(dbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
  }
};

export default connectDB;
