import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

const jobSchema = new mongoose.Schema({
  title: { type: String, maxlength:50, required: [true, "Title is required"] },
  description: { type: String, required: [true, "Description is required"] },
  salary: { type: String, required: [true, "Salary is required"] },
  location: {type: String},
  available: {type: Boolean, default: true},
  jobtype: {type: ObjectId, ref: "JobType", required: true},
  user: {type: ObjectId, ref: "User", required: true},
},{timestamps: true});



const jobModel = mongoose.model("Job", jobSchema)
export { jobModel as Job }