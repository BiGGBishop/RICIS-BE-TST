const express = require("express");
const router = express.Router();
// const {authValidation, getOtpValidation, verifyOtpValidation,userSignUpValidation} =  require("../validations/userValidation")
const {asyncHandler} = require("../middlewares/handler")
const startUpController = require("../controllers/startUpController")
const {authToken} =  require("../utils/AunthenticateUser")


router.post("/cat", authToken,  (startUpController.addCategories)); 
router.post("/sub-cat", authToken,  (startUpController.addSubCategories)); 


 
/**GET REQUESTS */
router.get("/cat", authToken, asyncHandler(startUpController.getCategories)); 
router.get("/cat/:catId", authToken, asyncHandler(startUpController.getCategories)); 
router.get("/cat/incidental", authToken, asyncHandler(startUpController.getClassificationsNoIncidental)); 
router.get("/cat/noincidental", authToken, asyncHandler(startUpController.getClassificationsYesIncidental)); 
router.get("/sub-cat/:catId", authToken, asyncHandler(startUpController.getSubCategories)); 
router.get("/sub-cat/", authToken, asyncHandler(startUpController.getAllSubCategories)); 
router.patch("/sub-cat/:subCatId", authToken, asyncHandler(startUpController.updateSubCategories)); 
router.patch("/cat/:catId", authToken, asyncHandler(startUpController.updateCategories)); 
router.delete("/cat/:catId", authToken, asyncHandler(startUpController.deleteCategory)); 
router.delete("/sub-cat/:subCatId", authToken, asyncHandler(startUpController.deleteSubCategories)); 

module.exports = router;


