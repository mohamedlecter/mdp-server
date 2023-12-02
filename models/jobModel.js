const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobDurationStart: {
    type: String,
    required: true,
  },
  jobDurationEnd: {
    type: String,
    required: true,
  },
  jobHourStart: {
    type: String,
    required: true,
  },
  jobHourEnd: {
    type: String,
    required: true,
  },
  jobOrganizer: {
    type: String,
    required: true,
  },
  jobOrganizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
