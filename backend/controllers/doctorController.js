import Doctor from '../models/Doctor.js';

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    next(error);
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
export const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404);
      throw new Error('Doctor not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a doctor profile (Admin only)
// @route   POST /api/doctors
// @access  Private/Admin
export const createDoctor = async (req, res, next) => {
  try {
    const { userId, name, specialization, experience, languages, consultationFee, image, bio, availability } = req.body;

    const doctor = new Doctor({
      userId,
      name,
      specialization,
      experience,
      languages,
      consultationFee,
      image,
      bio,
      availability
    });

    const createdDoctor = await doctor.save();
    res.status(201).json(createdDoctor);
  } catch (error) {
    next(error);
  }
};
