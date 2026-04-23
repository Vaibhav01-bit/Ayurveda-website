import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Doctor from './models/Doctor.js';
import Product from './models/Product.js';
import connectDB from './config/db.js';

import doctors from './data/doctors.js';
import products from './data/products.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear all existing data
    await User.deleteMany();
    await Doctor.deleteMany();
    await Product.deleteMany();

    // Import products
    const createdProducts = await Product.insertMany(products);

    // Import doctors
    const createdDoctors = await Doctor.insertMany(doctors);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Doctor.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
