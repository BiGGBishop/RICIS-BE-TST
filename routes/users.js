const express = require("express");
const router = express.Router();
const {
    appValidation, 

} =  require("../validations/userValidation")
const {asyncHandler} = require("../middlewares/handler")
const usersController = require("../controllers/userController")
const {authToken} =  require("../utils/AunthenticateUser");
const { getClassificationsWithMerge } = require("../services/userServices");

router.get("/multi",authToken,  asyncHandler(usersController.getUsers));
router.get("/details",authToken,  asyncHandler(usersController.getUserDetails));
router.post("/application",authToken, appValidation, asyncHandler(usersController.createApplication));
router.get("/application",authToken, asyncHandler(usersController.getUsersApplication));
router.get("/application/:appId",authToken, asyncHandler(usersController.getUsersSingleApplication));
router.get("/classification-with-incidental",authToken, asyncHandler(usersController.getClassificationWithIncidental));
router.post("/classification-with-merge",authToken,usersController.getClassificationMergeData);
router.put("/application/msg/add", authToken, asyncHandler(usersController.addMsgToApplication)); 
router.get("/payment/token",authToken, asyncHandler(usersController.getPaymentToken));
router.post("/initiate-payment", authToken, asyncHandler(usersController.makePayment));
router.post("/initiate-single-payment", authToken, asyncHandler(usersController.makeSinglePayment));
router.get("/payment-status", authToken, asyncHandler(usersController.checkTransactionStatus));
router.post("/payment/check-bank-status", authToken, asyncHandler(usersController.checkTransactionStatusBank));
router.post("/remita/webhook", asyncHandler(usersController.remitaWebhook));
router.get("/my-applications",authToken,asyncHandler(usersController.getAllUserForms));
router.get("/my-applications-certificates",authToken,asyncHandler(usersController.getAllUserFormsWithCertificate));


module.exports = router;


