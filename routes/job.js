const express = require("express");
const JobController = require("../controllers/job");
const { authenticate } = require("../controllers/auth");
const router = express.Router();

router.get("/", JobController.findAllJobs);
router.get("/user/:userId", JobController.findJobsByUser); // New router to get all jobs by a user
router.get("/:id", JobController.findOneJob);
router.post("/", authenticate, JobController.createJob);
router.patch("/:id", JobController.updateJob);
router.delete("/:id", JobController.deleteJob);

module.exports = router;
