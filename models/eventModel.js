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
  startDate: {
    type: String,
    required: true,
  },
  finishDate: {
    type: String,
    required: true,
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
