const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

router.get("/", UserController.findAllUsers);
router.get("/:id", UserController.findOneUser);
router.post("/signup", UserController.createUser);
router.post("/admin/signup", UserController.adminSignup);
router.post("/admin/login", UserController.adminLogin);
router.post("/login", UserController.loginUser);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
