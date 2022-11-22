const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//JSON WEB TOKEN MODULE
const jwt = require("jsonwebtoken");

//DB DOCUMENTS SCHEMA
const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  gender: { type: String },
  email: { type: String, required: true, lowercase: true },
  phone: { type: Number, required: true },
  clinic_address: { type: String, required: true, lowercase: true },
  city: { type: String, required: true, lowercase: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  education: { type: Array, required: true },
  specialty: { type: Array, required: true },
  age: { type: Number, required: true },
  role: { type: String },
  isVerified: { type: Boolean },
  SuperExperienced: { type: Boolean },
  img: { type: String, required: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
  availability: [
    {
      week_day1: { type: String },
      week_day1_status: { type: Number },
      week_day2: { type: String },
      week_day2_status: { type: Number },
      week_day3: { type: String },
      week_day3_status: { type: Number },
      week_day4: { type: String },
      week_day4_status: { type: Number },
      week_day5: { type: String },
      week_day5_status: { type: Number },
      week_day6: { type: String },
      week_day6_status: { type: Number },
      week_day7: { type: String },
      week_day7_status: { type: Number },
    },
  ],
  appointments: [
    {
      patients_id: { type: String, required: true },
      patients_name: { type: String, required: true },
      patients_age: { type: String, required: true },
      visiting_reason: { type: String, required: true },
      appointment_date: { type: String, required: true },
      appointment_status: { type: Number },
      patients_phone: { type: String, required: true },
    },
  ],
  img: { type: String },
  date: { type: Date, default: Date.now },
  token: { type: String, required: true },
});

//HASHING PASSWORD USING MIDDLEWARE

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.cpassword, 10);
  }
  next();
});

//GENERATING AUTH TOKEN
UserSchema.methods.generateAuthToken = async function () {
  try {
    // console.log("jwt code");
    const token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.AUTH_KEY
    );

    //SAVING TOKEN IN DOCUMENT FIELD
    this.token = token;
    await this.save();
    // console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

//INITIALIZATION DB MODAL
const Doctor = mongoose.model("Doctors", UserSchema);
module.exports = Doctor;
