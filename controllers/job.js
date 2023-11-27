const Job = require("../models/jobModel");
const User = require("../models/userModel");

exports.findAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findJobsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const jobs = await Job.find({ jobOrganizerId: userId });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOneJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const { title, description, location, company, salary, createdAt } =
      req.body;
    const jobImg = req.file.path;
    const jobOrganizer = req.user.name;
    const jobOrganizerId = req.user._id;

    const job = new Job({
      title,
      description,
      location,
      jobImg,
      company,
      salary,
      createdAt,
      jobOrganizerId,
      jobOrganizer,
    });

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.jobs.push(job);
    await user.save();

    const newJob = await job.save();

    res.status(201).json({
      status: "success",
      newJob,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findById(req.user._id);
    user.jobs.pull(job);
    await user.save();

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
