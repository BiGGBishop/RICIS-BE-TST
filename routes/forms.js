const express = require("express");
const router = express.Router();

const {asyncHandler} = require("../middlewares/handler")
const usersController = require("../controllers/userController")
const adminController = require("../controllers/adminController")
const {authToken} =  require("../utils/AunthenticateUser")

router.post("/competency", authToken, asyncHandler(usersController.addCompetency)); 

module.exports = router;