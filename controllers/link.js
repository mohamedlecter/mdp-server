const express = require("express");
const linkModel = require("../models/linksModel");

exports.findAllLinks = async (req, res) => {
  try {
    const links = await linkModel.find();
    res.status(200).json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOneLink = async (req, res) => {
  try {
    const link = await linkModel.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }
    res.status(200).json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLink = async (req, res) => {
  try {
    const { title, link, description } = req.body;
    const newLink = new linkModel({ title, link, description });
    const savedLink = await newLink.save();
    res.status(201).json(savedLink);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const link = await linkModel.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }
    await link.remove();
    res.status(200).json({ message: "Link deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
