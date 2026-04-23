import express from 'express';
import { bookConsultation, getUserConsultations, updateConsultationStatus, getDoctorConsultations } from '../controllers/consultationController.js';
import { protect, doctor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, bookConsultation);

router.route('/user')
  .get(protect, getUserConsultations);

router.route('/doctor')
  .get(protect, doctor, getDoctorConsultations);

router.route('/:id')
  .put(protect, doctor, updateConsultationStatus);

export default router;
