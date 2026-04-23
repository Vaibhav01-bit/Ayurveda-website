import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor',
    },
    problem: {
      type: String,
      required: true,
    },
    symptoms: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    prescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;
