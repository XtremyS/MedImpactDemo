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
  age: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: Number, required: true },
  role: { type: String },
  booked_doctors: [
    {
      doctor_id: { type: String, required: true },
      doctor_full_name: { type: String },
      doctor_education: { type: Array },
      doctor_img: { type: String },
      doctor_specialty: { type: Array },
      doctor_age: { type: Number },
      doctor_isVerified: { type: String },
      doctor_appointment_date: { type: String },
      doctor_SuperExperienced: { type: Boolean },
      doctor_clinic_address: { type: String, lowercase: true },
      doctor_city: { type: String },
      doctor_state: { type: String },
      doctor_country: { type: String },
      booked_doctor_appointment_status: { type: Number },
    },
  ],
  address: { type: String },
  password: { type: String, required: true },
  img: { type: String },
  cpassword: { type: String, required: true },
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
    const token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.AUTH_KEY
    );

    //SAVING TOKEN IN DOCUMENT FIELD
    this.token = token;
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

//INITIALIZATION DB MODAL
const Patient = mongoose.model("Patients", UserSchema);
module.exports = Patient;
