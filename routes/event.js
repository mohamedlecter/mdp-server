const express = require("express");
const EventController = require("../controllers/event");
const authController = require("../controllers/auth");
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

router.get("/", EventController.findAllEvents);
router.get("/user/:userId", authenticate, EventController.findEventsByUser); // New router to get all events by a user
router.get("/:id", EventController.findOneEvent);
router.post(
  "/",
  upload.single("eventImg"),
  authenticate,
  EventController.createEvent
);
router.patch("/:id", EventController.updateEvent);
router.delete("/:id", authenticate, EventController.deleteEvent);

module.exports = router;
