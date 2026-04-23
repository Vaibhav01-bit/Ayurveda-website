import Consultation from '../models/Consultation.js';

// @desc    Create new consultation booking
// @route   POST /api/consultation
// @access  Private
export const bookConsultation = async (req, res, next) => {
  try {
    const { doctorId, problem, symptoms, date, time } = req.body;

    const consultation = new Consultation({
      userId: req.user._id,
      doctorId,
      problem,
      symptoms,
      date,
      time,
      status: 'pending',
    });

    const createdConsultation = await consultation.save();
    res.status(201).json(createdConsultation);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user consultations
// @route   GET /api/consultation/user
// @access  Private
export const getUserConsultations = async (req, res, next) => {
  try {
    const consultations = await Consultation.find({ userId: req.user._id }).populate('doctorId', 'name specialization image');
    res.json(consultations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get doctor's consultations
// @route   GET /api/consultation/doctor
// @access  Private/Doctor
export const getDoctorConsultations = async (req, res, next) => {
  try {
    // Assuming doctor profile has same userId
    const consultations = await Consultation.find({ doctorId: req.user._id }).populate('userId', 'name email');
    res.json(consultations);
  } catch (error) {
    next(error);
  }
};

// @desc    Update consultation status (Doctor or Admin)
// @route   PUT /api/consultation/:id
// @access  Private
export const updateConsultationStatus = async (req, res, next) => {
  try {
    const { status, prescription } = req.body;
    
    const consultation = await Consultation.findById(req.params.id);

    if (consultation) {
      consultation.status = status || consultation.status;
      if (prescription) {
        consultation.prescription = prescription;
      }

      const updatedConsultation = await consultation.save();
      res.json(updatedConsultation);
    } else {
      res.status(404);
      throw new Error('Consultation not found');
    }
  } catch (error) {
    next(error);
  }
};
