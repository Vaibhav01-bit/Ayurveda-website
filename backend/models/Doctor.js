import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, required: true },
  availability: [
    {
      day: { type: String },
      slots: [{ type: String }]
    }
  ],
  languages: [{ type: String }],
  consultationFee: { type: Number, required: true },
  image: { type: String },
  bio: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
