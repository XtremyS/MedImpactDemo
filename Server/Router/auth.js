//* EXPRESS MODULE
const express = require("express");

//* EXPRESS ROUTER
const router = express.Router();

//* COOKIE PARSER MODULE
const cookieParser = require("cookie-parser");

//* CLOUDINARY MIDDLEWARE
const CloudinaryFileUpload = require("../Middleware/fileupload");

//* FILE UPLOAD PACKAGE
const fileUpload = require("express-fileupload");

//* PASSWORD HASHING MODULE
const bcrypt = require("bcrypt");

//* DB INSTANCE SCHEMA
const Admin = require("../DBSchema/admin_schema");

const Doctor = require("../DBSchema/doc_schema");
const Patient = require("../DBSchema/patient_schema");
const Lab = require("../DBSchema/lab_schema");
const Pharmacy = require("../DBSchema/pharmacy_schema");

//* MIDDLEWARE MODULE
const Middleware = require("../Middleware/middleware");

router.use(cookieParser());

router.get("/", async (req, res) => {
  res.status(200).json("Server Started!");
});

//! *********************************************** REGISTRATION APIS STARTS HERE ************************************************* !//

//*   Doctors Registration
router.post("/api/v1/doctors-registration", async (req, res) => {
  try {
    //* DESTRUCTURED USER FILLED DATA
    const {
      full_name,
      gender,
      email,
      age,
      phone,
      password,
      cpassword,
      clinic_address,
      city,
      state,
      country,
      education,
      specialty,
    } = req.body;

    //* CHECKING IF THE SAME EMAIL IS REGISTERED IN OTHER COLLECTION IN DATABASE
    const PatientsEmailExists = await Patient.findOne({ email: email });
    const LabEmailExists = await Lab.findOne({ email: email });

    if (PatientsEmailExists || LabEmailExists) {
      return res.status(422).json({ error: "Email Already In Use!" });
    }

    //* CHECKING IF THE FIELDS ARE EMPTY OR NOT
    if (
      !full_name ||
      !gender ||
      !email ||
      !age ||
      !phone ||
      !password ||
      !cpassword ||
      !clinic_address ||
      !education ||
      !specialty ||
      !state ||
      !country ||
      !city
    ) {
      return res.status(422).json({ error: "Fields Cannot Be Empty!" });
    }
    try {
      //* USER DETAILS WHICH EMAILS MATCH IN DB
      const userExist = await Doctor.findOne({ email: email });
      //* CHECKING PASS AND C PASS
      if (password !== cpassword) {
        return res
          .status(400)
          .json({ error: "Password & Confirm Password Mismatch!" });
      } else if (userExist) {
        //*  CHECKING EMAIL ALREADY EXIST IN DB
        return res.status(422).json({ error: "Email Already Exist!" });
      } else {
        //* IF USER NOT EXIST CREATING NEW USER IN DB
        const Doctors = new Doctor({
          full_name,
          gender,
          email,
          phone,
          age,
          role: "Doctor",
          clinic_address,
          city,
          state,
          country,
          education,
          specialty,
          isVerified: false,
          SuperExperienced: false,
          availability: {
            week_day1: "Sun",
            week_day1_status: 0,
            week_day2: "Mon",
            week_day2_status: 1,
            week_day3: "Tue",
            week_day3_status: 1,
            week_day4: "Wed",
            week_day4_status: 1,
            week_day5: "Thu",
            week_day5_status: 1,
            week_day6: "Fri",
            week_day6_status: 1,
            week_day7: "Sat",
            week_day7_status: 1,
          },
          password,
          cpassword,
        });

        //* HASHING PASSWORD HERE FROM SCHEMA.JS THROUGH MIDDLEWARE

        //* Setting Token In Document When Creating New User
        const token = await Doctors.generateAuthToken();

        //* SAVING DATA IN DB
        await Doctors.save();

        //* SENDING RESPONSE
        res.status(201).json({ response: "User Registered!" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.log(error, "API Function Error");
  }
});

//* POST PATIENTS REGISTRATIONS
router.post("/api/v1/patients-registration", async (req, res) => {
  //* DESTRUCTURED USER FILLED DATA
  const { full_name, gender, email, age, phone, password, cpassword } =
    req.body;

  //* CHECKING IF THE SAME EMAIL IS REGISTERED IN OTHER COLLECTION IN DATABASE
  const DoctorEmailExists = await Doctor.findOne({ email: email });
  const LabEmailExists = await Lab.findOne({ email: email });

  if (DoctorEmailExists || LabEmailExists) {
    return res.status(422).json({ error: "Email Already In Use!" });
  }

  //* CHECKING IF THE FIELDS ARE EMPTY OR NOT
  if (
    !age ||
    !full_name ||
    !gender ||
    !email ||
    !phone ||
    !password ||
    !cpassword
  ) {
    return res.status(422).json({ error: "Fields Cannot Be Empty!" });
  }
  try {
    //* USER DETAILS WHICH EMAILS MATCH IN DB
    const userExist = await Patient.findOne({ email: email });
    //* CHECKING PASS AND C PASS
    if (password !== cpassword) {
      return res
        .status(400)
        .json({ error: "Password & Confirm Password Mismatch!" });
    } else if (userExist) {
      //*  CHECKING EMAIL ALREADY EXIST IN DB
      return res.status(422).json({ error: "Email Already Exist!" });
    } else {
      //* IF USER NOT EXIST CREATING NEW USER IN DB
      const Patients = new Patient({
        full_name,
        gender,
        email,
        phone,
        age,
        password,
        cpassword,
      });

      //*  HASHING PASSWORD HERE FROM SCHEMA.JS THROUGH MIDDLEWARE

      //* Setting Token In Document When Creating New User
      const token = await Patients.generateAuthToken();

      //* SAVING DATA IN DB
      await Patients.save();

      //* SENDING RESPONSE
      res.status(201).json({ response: "User Registered!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//* POST LABS REGISTRATIONS
router.post("/api/v1/labs-registration", async (req, res) => {
  //* DESTRUCTURED USER FILLED DATA
  const {
    lab_name,
    lab_type,
    country,
    email,
    phone,
    city,
    state,
    address,
    password,
    cpassword,
  } = req.body;

  //* CHECKING IF THE SAME EMAIL IS REGISTERED IN OTHER COLLECTION IN DATABASE
  const DoctorEmailExists = await Doctor.findOne({ email: email });
  const PatientEmailExists = await Patient.findOne({ email: email });

  if (DoctorEmailExists || PatientEmailExists) {
    return res.status(422).json({ error: "Email Already In Use!" });
  }

  //* CHECKING IF THE FIELDS ARE EMPTY OR NOT
  if (
    (!lab_name ||
      !lab_type ||
      !country ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !address,
    !password || !cpassword)
  ) {
    return res.status(422).json({ error: "Fields Cannot Be Empty!" });
  }
  try {
    //* USER DETAILS WHICH EMAILS MATCH IN DB
    const userExist = await Lab.findOne({ email: email });
    //* CHECKING PASS AND C PASS
    if (password !== cpassword) {
      return res
        .status(400)
        .json({ error: "Password & Confirm Password Mismatch!" });
    } else if (userExist) {
      //*  CHECKING EMAIL ALREADY EXIST IN DB
      return res.status(422).json({ error: "Email Already Exist!" });
    } else {
      //* IF USER NOT EXIST CREATING NEW USER IN DB
      const Labs = new Lab({
        lab_name,
        lab_type,
        country,
        email,
        phone,
        city,
        state,
        address,
        password,
        cpassword,
      });

      //*  HASHING PASSWORD HERE FROM SCHEMA.JS THROUGH MIDDLEWARE

      //* SAVING DATA IN DB
      await Labs.save();

      //* SENDING RESPONSE
      res.status(201).json({ response: "Lab Registered!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//* POST PHARMACY REGISTRATIONS
router.post("/api/v1/pharmacy-registration", async (req, res) => {
  //* DESTRUCTURED USER FILLED DATA
  const {
    pharmacy_name,
    country,
    email,
    phone,
    city,
    state,
    address,
    password,
    cpassword,
  } = req.body;

  //* CHECKING IF THE SAME EMAIL IS REGISTERED IN OTHER COLLECTION IN DATABASE
  const DoctorEmailExists = await Doctor.findOne({ email: email });
  const PatientEmailExists = await Patient.findOne({ email: email });

  if (DoctorEmailExists || PatientEmailExists) {
    return res.status(422).json({ error: "Email Already In Use!" });
  }

  //* CHECKING IF THE FIELDS ARE EMPTY OR NOT
  if (
    (!pharmacy_name ||
      !country ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !address,
    !password || !cpassword)
  ) {
    return res.status(422).json({ error: "Fields Cannot Be Empty!" });
  }
  try {
    //* USER DETAILS WHICH EMAILS MATCH IN DB
    const userExist = await Pharmacy.findOne({ email: email });
    //* CHECKING PASS AND C PASS
    if (password !== cpassword) {
      return res
        .status(400)
        .json({ error: "Password & Confirm Password Mismatch!" });
    } else if (userExist) {
      //*  CHECKING EMAIL ALREADY EXIST IN DB
      return res.status(422).json({ error: "Email Already Exist!" });
    } else {
      //* IF USER NOT EXIST CREATING NEW USER IN DB
      const Pharmacies = new Pharmacy({
        pharmacy_name,
        country,
        email,
        phone,
        city,
        state,
        address,
        password,
        cpassword,
      });

      //*  HASHING PASSWORD HERE FROM SCHEMA.JS THROUGH MIDDLEWARE

      //* SAVING DATA IN DB
      await Pharmacies.save();

      //* SENDING RESPONSE
      res.status(201).json({ response: "Pharmacy Registered!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//! *********************************************** LOGIN APIS STARTS HERE ************************************************* !//

//* POST DOCTOR LOGIN
router.post("/api/v1/login-doctor", async (req, res) => {
  try {
    //* DATA WHICH USER TYPED FOR LOGIN
    const Email = req.body.login_email;
    const Password = req.body.login_password;
    console.log(Email, Password);
    //* CHECKING IF EMAIL FIELD IS EMPTY OR NOT
    if (!Email || !Password) {
      return res.status(400).json({ message: "Please Fill The Data" });
    }

    //* GETTING THE SPECIFIC DATA OF SAME EMAIL
    const UserLogin = await Doctor.findOne({ email: Email });

    if (!UserLogin || UserLogin == null) {
      return res.status(404).json({ message: "No User Found" });
    } else {
      //* DECRYPTING DB USER PASSWORD AND COMPARING IT FOR LOGIN
      const HashPassword = await bcrypt.compare(Password, UserLogin.password);

      //* CHECKING IF THE USER EXIST IN DB OR NOT WHILE LOGIN
      if (UserLogin && HashPassword) {
        //* GENERATING AUTH TOKEN WHILE LOGIN (USING MIDDLEWARE)
        const token = await UserLogin.generateAuthToken();
        //*  console.log(token);

        //* SAVING AUTH TOKEN IN COOKIE
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 7000000),
          httpOnly: true,
        });

        return res
          .status(200)
          .json({ response: UserLogin, message: "Singed in Successfully!" });
      } else {
        return res
          .status(400)
          .json({ error: "Sign in Failure,No Such Id Exist!!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

//* POST PATIENTS LOGIN
router.post("/api/v1/login-patient", async (req, res) => {
  try {
    //* DATA WHICH USER TYPED FOR LOGIN
    const Email = req.body.login_email;
    const Password = req.body.login_password;
    console.log(Email, Password);
    //* CHECKING IF EMAIL FIELD IS EMPTY OR NOT
    if (!Email || !Password) {
      return res.status(400).json({ message: "Please Fill The Data" });
    }

    //* GETTING THE SPECIFIC DATA OF SAME EMAIL

    const UserLogin = await Patient.findOne({ email: Email });
    if (!UserLogin || UserLogin == null) {
      res.status(404).json({ message: "No User Found" });
    } else {
      const UserLoginSpecificDetails = await Patient.findOne(
        { email: Email },
        {
          full_name: 1,
          gender: 1,
          date: 1,
          tokens: 1,
          age: 1,
          address: 1,
          phone: 1,
          appointment_status: 1,
        }
      );

      //* DECRYPTING DB USER PASSWORD AND COMPARING IT FOR LOGIN
      const HashPassword = await bcrypt.compare(Password, UserLogin.password);

      //* CHECKING IF THE USER EXIST IN DB OR NOT WHILE LOGIN
      if (UserLogin && HashPassword) {
        //* GENERATING AUTH TOKEN WHILE LOGIN (USING MIDDLEWEARE)
        const token = await UserLogin.generateAuthToken();

        //* SAVING AUTH TOKEN IN COOKIE
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 7000000),
          httpOnly: true,
        });

        return res.status(200).json({
          response: UserLoginSpecificDetails,
          message: "Singed in Successfully!",
        });
      } else {
        return res
          .status(400)
          .json({ error: "Sign in Failure,No Such Id Exist!!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

//* POST LAB LOGIN
router.post("/api/v1/login-lab", async (req, res) => {
  try {
    //* DATA WHICH USER TYPED FOR LOGIN
    const Email = req.body.login_email;
    const Password = req.body.login_password;
    console.log(Email, Password);
    //* CHECKING IF EMAIL FIELD IS EMPTY OR NOT
    if (!Email || !Password) {
      return res.status(400).json({ message: "Please Fill The Data" });
    }

    //* GETTING THE SPECIFIC DATA OF SAME EMAIL
    const UserLogin = await Lab.findOne({ email: Email });
    if (!UserLogin || UserLogin == null) {
      res.status(404).json({ message: "No User Found" });
    } else {
      //* DECRYPTING DB USER PASSWORD AND COMPARING IT FOR LOGIN
      const HashPassword = await bcrypt.compare(Password, UserLogin.password);

      //* CHECKING IF THE USER EXIST IN DB OR NOT WHILE LOGIN
      if (UserLogin && HashPassword) {
        //* GENERATING AUTH TOKEN WHILE LOGIN (USING MIDDLEWEARE)
        const token = await UserLogin.generateAuthToken();
        //*  console.log(token);

        //* SAVING AUTH TOKEN IN COOKIE
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 700000),
          httpOnly: true,
        });

        return res
          .status(200)
          .json({ response: UserLogin, message: "Singed in Successfully!" });
      } else {
        return res
          .status(400)
          .json({ error: "Sign in Failure,No Such Id Exist!!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

//* POST PHARMACY LOGIN
router.post("/api/v1/login-pharmacy", async (req, res) => {
  try {
    //* DATA WHICH USER TYPED FOR LOGIN
    const Email = req.body.login_email;
    const Password = req.body.login_password;
    console.log(Email, Password);
    //* CHECKING IF EMAIL FIELD IS EMPTY OR NOT
    if (!Email || !Password) {
      return res.status(400).json({ message: "Please Fill The Data" });
    }

    //* GETTING THE SPECIFIC DATA OF SAME EMAIL
    const UserLogin = await Pharmacy.findOne({ email: Email });
    if (!UserLogin || UserLogin == null) {
      res.status(404).json({ message: "No User Found" });
    } else {
      //* DECRYPTING DB USER PASSWORD AND COMPARING IT FOR LOGIN
      const HashPassword = await bcrypt.compare(Password, UserLogin.password);

      //* CHECKING IF THE USER EXIST IN DB OR NOT WHILE LOGIN
      if (UserLogin && HashPassword) {
        //* GENERATING AUTH TOKEN WHILE LOGIN (USING MIDDLEWEARE)
        const token = await UserLogin.generateAuthToken();
        //*  console.log(token);

        //* SAVING AUTH TOKEN IN COOKIE
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 300000),
          httpOnly: true,
        });

        return res
          .status(200)
          .json({ response: UserLogin, message: "Singed in Successfully!" });
      } else {
        return res
          .status(400)
          .json({ error: "Sign in Failure,No Such Id Exist!!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

//! *********************************************** OTHER APIS STARTS HERE ************************************************* !//

//*  Doctor Availability
router.patch("/api/v1/update_availability", Middleware, async (req, res) => {
  try {
    const DoctorObjId = req.rootUser._id;

    const WeekDaysObjId = req.body._id;

    const WeekDaySunday = req.body.week_day1;
    const WeekDaySundayStatus = req.body.week_day1_status;

    const WeekDayMonday = req.body.week_day2;
    const WeekDayMondayStatus = req.body.week_day2_status;

    const WeekDayTuesday = req.body.week_day3;
    const WeekDayTuesdayStatus = req.body.week_day3_status;

    const WeekDayWednesday = req.body.week_day4;
    const WeekDayWednesdayStatus = req.body.week_day4_status;

    const WeekDayThursday = req.body.week_day5;
    const WeekDayThursdayStatus = req.body.week_day5_status;

    const WeekDayFriday = req.body.week_day6;
    const WeekDayFridayStatus = req.body.week_day6_status;

    const WeekDaySaturday = req.body.week_day7;
    const WeekDaySaturdayStatus = req.body.week_day7_status;

    if (
      WeekDaySundayStatus == null ||
      WeekDayMondayStatus == null ||
      WeekDayTuesdayStatus == null ||
      WeekDayWednesdayStatus == null ||
      WeekDayThursdayStatus == null ||
      WeekDayFridayStatus == null ||
      WeekDaySaturdayStatus == null
    ) {
      return res
        .status(400)
        .json({ response: "Please Select All Days Availability!" });
    } else {
      try {
        const UpdateDoctor = await Doctor.updateOne(
          {
            _id: DoctorObjId, //* Doctor ID
            availability: {
              $elemMatch: { _id: WeekDaysObjId }, //* Availability Array Object ID
            },
          },

          {
            $set: {
              "availability.$.week_day1_status": WeekDaySundayStatus,
              "availability.$.week_day2_status": WeekDayMondayStatus,
              "availability.$.week_day3_status": WeekDayTuesdayStatus,
              "availability.$.week_day4_status": WeekDayWednesdayStatus,
              "availability.$.week_day5_status": WeekDayThursdayStatus,
              "availability.$.week_day6_status": WeekDayFridayStatus,
              "availability.$.week_day7_status": WeekDaySaturdayStatus,
            },
          }
        );

        //* Sending Response
        if (UpdateDoctor.modifiedCount == 1) {
          return res
            .status(201)
            .json({ response: "Availability updated successfully!" });
        } else {
          return res
            .status(400)
            .json({ error: "Failed to update availability!" });
        }
      } catch (error) {
        console.log(error, "Something Went Wrong!");
      }
    }
  } catch (error) {
    console.log(error, "Something Went Wrong!");
  }
});

//* Get Doctors Data
router.get("/api/v1/doc-list", async (req, res) => {
  try {
    //* GETTING ALL LABS FROM DB
    const Doctors = await Doctor.find(
      {},
      {
        full_name: 1,
        gender: 1,
        age: 1,
        img: 1,
        clinic_address: 1,
        city: 1,
        state: 1,
        country: 1,
        education: 1,
        specialty: 1,
        isVerified: 1,
        SuperExperienced: 1,
        availability: 1,
      }
    );

    if (Doctors) {
      return res.status(200).json({ data: Doctors });
    } else {
      return res.status(404).json({ error: "No doctors found!" });
    }
  } catch (error) {
    console.log(error);
  }
});

//*  Booking Appointments
router.patch("/api/v1/book_appointment", async (req, res) => {
  try {
    //*  GETTING USER UPDATING INPUT
    const DocId = req.body._id;

    const PatientId = req.body.patients_id;
    const PatientName = req.body.patients_name;
    const PatientAge = req.body.patients_age;
    const PatientAppointmentDate = req.body.appointment_date;
    const PatientVisitingReason = req.body.visiting_reason;
    const PatientPhone = req.body.patients_phone;

    const DoctorName = req.body.doctor_full_name;
    const DoctorAge = req.body.doctor_age;
    const DoctorEducation = req.body.doctor_education;
    const DoctorImg = req.body.doctor_img;
    const DoctorSpecialty = req.body.doctor_specialty;
    const DoctorIsVerified = req.body.doctor_is_verified;
    const DoctorIsExperienced = req.body.doctor_SuperExperienced;
    const DoctorClinicAddress = req.body.doctor_clinic_address;
    const DoctorCity = req.body.doctor_city;
    const DoctorState = req.body.doctor_state;
    const DoctorCountry = req.body.doctor_country;
    const DoctorAppointmentDate = req.body.doctor_appointment_date;

    //* Updating SPECIFIC Doctor WITH ID
    const UpdateDoctor = await Doctor.updateOne(
      { _id: DocId },
      {
        $push: {
          appointments: {
            patients_id: PatientId,
            patients_name: PatientName,
            patients_age: PatientAge,
            visiting_reason: PatientVisitingReason,
            appointment_date: PatientAppointmentDate,
            patients_phone: PatientPhone,
            appointment_status: 2,
          },
        },
      }
    );

    // const DocAppointment = await Doctor.aggregate([
    //   {
    //     $unwind: "$appointments",
    //   },
    //   {
    //     $match: {
    //       "appointments.patients_id": "63651d89718b22e648a9bec1",
    //     },
    //   },
    // ]);

    // console.log(DocAppointment, "RETURNING DOC DATA");

    //* Updating Specific Patient With Patient ID
    const UpdatePatient = await Patient.updateOne(
      { _id: PatientId },
      {
        $push: {
          booked_doctors: {
            doctor_id: DocId,
            doctor_full_name: DoctorName,
            doctor_education: DoctorEducation,
            doctor_img: DoctorImg,
            doctor_specialty: DoctorSpecialty,
            doctor_age: DoctorAge,
            doctor_isVerified: DoctorIsVerified,
            doctor_SuperExperienced: DoctorIsExperienced,
            doctor_clinic_address: DoctorClinicAddress,
            doctor_city: DoctorCity,
            doctor_state: DoctorState,
            doctor_country: DoctorCountry,
            doctor_appointment_date: DoctorAppointmentDate,
            booked_doctor_appointment_status: 2,
          },
        },
      }
    );

    //* SENDING RESPONSE
    if (UpdateDoctor.modifiedCount == 1 && UpdatePatient.modifiedCount == 1) {
      res
        .status(201)
        .json({ response: "Appointment request sent successfully!" });
    } else {
      res.status(400).json({ error: "Failed to send appointment request!" });
    }
  } catch (error) {
    console.log(error);
  }
});

//*  Appointment Status API Confirm || Reject || Approve
router.patch(
  "/api/v1/update_appointment_status",
  Middleware,
  async (req, res) => {
    try {
      //*  Getting User Id And Patients Array Id From Front End To Update Patient Status
      const DoctorObjId = req.rootUser._id;

      const PatientsAppointmentObjId = req.body._id;
      const PatientAppointmentStatus = req.body.appointment_status;
      const PatientsId = req.body.patients_id;

      //* Updating Specific User With Id
      const UpdateUser = await Doctor.updateOne(
        {
          _id: DoctorObjId, //* Doctor ID
          appointments: {
            $elemMatch: { _id: PatientsAppointmentObjId }, //* Patients Object ID
          },
        },

        {
          $set: {
            "appointments.$.appointment_status": PatientAppointmentStatus,
          },
        }
      );

      //* Updating Specific User With Id
      const UpdatePatient = await Patient.updateOne(
        {
          _id: PatientsId, //* Patient Document Object ID
          booked_doctors: {
            $elemMatch: {
              doctor_id: DoctorObjId,
            }, //* Patients Object ID
          },
        },

        {
          $set: {
            "booked_doctors.$.booked_doctor_appointment_status":
              PatientAppointmentStatus,
          },
        }
      );

      //* SENDING RESPONSE
      if (UpdateUser.modifiedCount == 1 && UpdatePatient.modifiedCount == 1) {
        res.status(200).json({ response: "Appointment Status Updated!" });
      } else if (UpdateUser.modifiedCount == 0) {
        res
          .status(304)
          .json({ response: "Appointment Status Already Updated!" });
      } else {
        res.status(400).json({ error: "Failed To Updated Change Status!" });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//*  Get Appointments Data Of Doctor To Get All Appointments DoctorsDetailsSubject
router.get("/api/v1/appointments", Middleware, (req, res) => {
  let UserObject = {
    appointments: req.rootUser.appointments,
  };

  res.status(200).send(UserObject);
});

//*  Getting Booked Doctor Data Of Patient
router.get("/api/v1/your_appointments", Middleware, async (req, res) => {
  try {
    const Patient_Id = req.rootUser._id;
    const UpdateUser = await Patient.findOne(
      { _id: Patient_Id },
      { booked_doctors: 1, _id: 0 }
    );

    res.status(200).send(UpdateUser);
  } catch (error) {
    res.status(400).send("Something went wrong!");
    console.log("Something Went Wrong!", error.message);
  }
});

//* TODO If Want To Get The Doctor And Patients Data Use This
router.get("/api/v1/get_user_data", Middleware, (req, res) => {
  let UserObject = {
    _id: req.rootUser._id,
    full_name: req.rootUser.full_name,
    gender: req.rootUser.gender,
    phone: req.rootUser.phone,
    age: req.rootUser.age,
    email: req.rootUser.email,
    city: req.rootUser.city,
    state: req.rootUser.state,
    country: req.rootUser.country,
    address: req.rootUser.address,
    availability: req.rootUser.availability,
    isVerified: req.rootUser.isVerified,
  };

  res.send(UserObject);
});

//*  GET LOGOUT
router.get("/api/v1/logout", (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).json({ message: "Logout Successfully!" });
});

module.exports = router;
