import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const {ObjectId} = mongoose.Schema;

const jobHistorySchema = new mongoose.Schema({
  title: { type: String, maxlength:50 },
  description: { type: String },
  salary: { type: String },
  location: {type: String},
  interviewDate: {type: Date},
  applicationStatus: {type: String, enum:['pending','accepted','rejected'], default:'pending'},
  user: {type: ObjectId, ref: "User", required: true},
},{timestamps: true});


const userSchema = new mongoose.Schema({

  firstName: { type: String, maxlength:10, required: [true, "first name is required"] },
  lastName: { type: String, maxlength:10, required: [true, "last name is required"] },
  email: { type: String, maxlength:15,unique:true, required: [true, "email is required"] },
  password: { type: String, minlength:[6,'password must have at least 6 characters'], required: [true, "password is required"] },
  jobsHistory: [jobHistorySchema],
  role:{ type: Number, default:0}
},{timestamps: true});

//encrypt password before saving
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

//return a JWT token
userSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this.id}, process.env.JWT_SECRET,{
    expiresIn: 3600
  })
}

const userModel = mongoose.model("User", userSchema)
export { userModel as User }
