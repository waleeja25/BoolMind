const mongoose = require('mongoose');
const { DEPARTMENTS } = require('../lib');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    department: {
      type: String,
      enum: DEPARTMENTS,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    joiningDate: {
      type: Date,
      required: [true,'Joining date is required'],
    },
  },
  { timestamps: true }
);

employeeSchema.index({ department: 1, joiningDate: -1 });
employeeSchema.index({ joiningDate: -1 });

module.exports = mongoose.model('Employee', employeeSchema);
