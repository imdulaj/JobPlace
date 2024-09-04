import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

const jobtypeSchema = new mongoose.Schema({
  jobtypeName: { type: String, maxlength:50, required: [true, "Type is required"] },
  user: {type: ObjectId, ref: "User", required: true},
},{timestamps: true});



const jobtypeModel = mongoose.model("JobType", jobtypeSchema)
export { jobtypeModel as JobType }