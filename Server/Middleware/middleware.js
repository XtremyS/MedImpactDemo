//* JWT MODULE
const jwt = require("jsonwebtoken");

//* DOCTOR DB SCHEMA
const Patients = require("../DBSchema/patient_schema");
const Doctors = require("../DBSchema/doc_schema");

const Middleware = async (req, res, next) => {
  try {
    //* Getting JWT Token From Front-End
    const token = req.cookies.jwt;

    //* Verifying Token
    const verifyToken = jwt.verify(token, process.env.AUTH_KEY);

    //* Getting That User Whose Token Is Verified
    const rootUserDoctors = await Doctors.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    //* If Doctor Data Is There In Doctor DB
    if (rootUserDoctors != null) {
      //* Assigning Token And User Details
      req.token = token;
      req.rootUser = rootUserDoctors;
      req.userId = rootUserDoctors._id;
      next();
    }

    //* If Doctors Data Is Not There In DB
    if (rootUserDoctors == null) {
      //* Finding It In Patients DB
      const rootUserPatients = await Patients.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
      //* Assigning Token And User Details
      req.token = token;
      req.rootUser = rootUserPatients;
      req.userId = rootUserPatients._id;
      next();
    }
  } catch (error) {
    res.status(401).send("Unauthorized Token! " + error);
  }
};

module.exports = Middleware;
