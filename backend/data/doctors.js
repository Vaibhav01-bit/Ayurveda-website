const doctors = [
  {
    name: 'Dr. Aditi Sharma',
    specialization: 'Skin & Hair Specialist',
    experience: 12,
    rating: 4.9,
    availability: [
      { day: 'Today', slots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'] },
      { day: 'Tomorrow', slots: ['09:00 AM', '01:00 PM', '03:30 PM'] }
    ],
    languages: ['English', 'Hindi'],
    consultationFee: 50,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Dr. Aditi Sharma is a renowned Ayurvedic practitioner specializing in dermatology and trichology. With over 12 years of clinical experience, she has helped thousands of patients heal chronic skin conditions using pure Ayurvedic principles and personalized herb formulations.'
  },
  {
    name: 'Dr. Rajiv Menon',
    specialization: 'Gut Health & Digestion',
    experience: 18,
    rating: 4.8,
    availability: [
      { day: 'Tomorrow', slots: ['09:00 AM', '11:30 AM', '02:00 PM'] }
    ],
    languages: ['English', 'Malayalam'],
    consultationFee: 60,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Specializing in gastrointestinal disorders, Dr. Rajiv Menon uses ancient Ayurvedic dietary principles to restore gut microbiome balance. His approach focuses on Agni (digestive fire) optimization.'
  },
  {
    name: 'Dr. Meera Patel',
    specialization: 'Stress & Sleep Disorders',
    experience: 10,
    rating: 5.0,
    availability: [
      { day: 'Today', slots: ['11:00 AM', '01:30 PM', '05:00 PM'] }
    ],
    languages: ['English', 'Gujarati', 'Hindi'],
    consultationFee: 45,
    image: 'https://images.unsplash.com/photo-1594824436951-7f12678cecea?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Dr. Meera integrates Ayurvedic psychology and lifestyle adjustments to treat insomnia, anxiety, and stress-related ailments without dependency on modern sedatives.'
  },
  {
    name: 'Dr. Karan Singh',
    specialization: 'Joints & Bones',
    experience: 15,
    rating: 4.7,
    availability: [
      { day: 'Today', slots: ['10:00 AM', '12:30 PM', '03:00 PM'] }
    ],
    languages: ['English', 'Punjabi'],
    consultationFee: 55,
    image: 'https://images.unsplash.com/photo-1537368910025-702800faa86b?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'An expert in Ayurvedic orthopedics, Dr. Karan utilizes specialized Marma therapy and herbal formulations to treat arthritis, joint pain, and sports injuries.'
  }
];

export default doctors;
