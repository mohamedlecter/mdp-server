const express = require("express");
const LinkController = require("../controllers/link");
const router = express.Router();

router.get("/", LinkController.findAllLinks);
router.get("/:id", LinkController.findOneLink);
router.post("/", LinkController.createLink);
router.delete("/:id", LinkController.deleteLink);

module.exports = router;
