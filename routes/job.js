const express = require("express");
const JobController = require("../controllers/job");
const { authenticate } = require("../controllers/auth");
const router = express.Router();
const multer = require("multer");
// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", JobController.findAllJobs);
router.get("/user/:userId", JobController.findJobsByUser); // New router to get all jobs by a user
router.get("/:id", JobController.findOneJob);
router.post(
  "/",
  upload.single("jobImg"),
  authenticate,
  JobController.createJob
);
router.patch("/:id", JobController.updateJob);
router.delete("/:id", JobController.deleteJob);

module.exports = router;
