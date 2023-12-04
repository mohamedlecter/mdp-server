const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: Number,
  },
  month: {
    type: String,
  },
  year: {
    type: Number,
  },
  eventTimeStart: {
    type: String,
    required: true,
  },
  eventTimeEnd: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  eventImg: {
    type: String,
    required: true,
  },
  eventOrganizer: {
    type: String,
    required: true,
  },
  eventOrganizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
