import express from 'express';
import { getDoctors, getDoctorById, createDoctor } from '../controllers/doctorController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getDoctors)
  .post(protect, admin, createDoctor);

router.route('/:id')
  .get(getDoctorById);

export default router;
