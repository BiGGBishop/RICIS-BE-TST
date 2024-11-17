const express = require("express");
const router = express.Router();
const {
    appValidation, 

} =  require("../validations/userValidation")
const {asyncHandler} = require("../middlewares/handler")
const usersController = require("../controllers/userController")
const {authToken} =  require("../utils/AunthenticateUser")

router.get("/multi",authToken,  asyncHandler(usersController.getUsers));
router.get("/details",authToken,  asyncHandler(usersController.getUserDetails));
router.post("/application",authToken, appValidation, asyncHandler(usersController.createApplication));
router.get("/application",authToken, asyncHandler(usersController.getUsersApplication));
router.get("/application/:appId",authToken, asyncHandler(usersController.getUsersSingleApplication));

// conversation
router.put("/application/msg/add", authToken, asyncHandler(usersController.addMsgToApplication)); 


//payments
router.get("/payment/token",authToken, asyncHandler(usersController.getPaymentToken));



module.exports = router;


