const Event = require("../models/eventModel");
const User = require("../models/userModel");
const multer = require("multer");

exports.findAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOneEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, eventTimeStart, eventTimeEnd } =
      req.body;
    const eventImg = req.file.path;

    // eventOrganizer and eventOrganizerId are derived from the authenticated user
    const eventOrganizer = req.user.name;
    const eventOrganizerId = req.user._id;

    // Parse and format the incoming date
    const eventDate = new Date(date);
    const formattedDate = eventDate.toISOString().split("T")[0];
    const formattedDay = eventDate.getDate(); // Day of the month (1-31)
    const formattedMonth = eventDate.toLocaleString("en-US", {
      month: "short",
    }); // Short month name (e.g., Oct)
    const formattedYear = eventDate.getFullYear();

    const event = new Event({
      title,
      description,
      date: formattedDate,
      day: formattedDay,
      month: formattedMonth,
      year: formattedYear,
      eventTimeStart,
      eventTimeEnd,
      location,
      eventImg,
      eventOrganizer,
      eventOrganizerId,
    });

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.events.push(event);
    await user.save();

    const newEvent = await event.save();

    res.status(201).json({
      status: "success",
      newEvent,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const user = await User.findById(req.user._id);
    user.events.pull(event);
    await user.save();

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const { title, description, date, location, eventTimeStart, eventTimeEnd } =
      req.body;
    const eventDate = new Date(date);
    const formattedDate = eventDate.toISOString().split("T")[0];
    const formattedDay = eventDate.getDate();
    const formattedMonth = eventDate.toLocaleString("en-US", {
      month: "short",
    });
    const formattedYear = eventDate.getFullYear();

    const eventImg = req.file.path;

    event.title = title;
    event.description = description;
    event.date = formattedDate;
    event.day = formattedDay;
    event.month = formattedMonth;
    event.year = formattedYear;
    event.location = location;
    event.eventTimeStart = eventTimeStart;
    event.eventTimeEnd = eventTimeEnd;
    event.eventImg = eventImg;

    await event.save();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findEventsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await Event.find({ eventOrganizerId: userId });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
