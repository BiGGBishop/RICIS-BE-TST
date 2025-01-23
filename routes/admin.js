const express = require("express");
const router = express.Router();
const {
    classificationValidation, 
    feeValidation,
    // getOtpValidation, 
    // verifyOtpValidation,
    // userSignUpValidation
} =  require("../validations/userValidation")
const {asyncHandler} = require("../middlewares/handler")
const adminController = require("../controllers/adminController")
const {authToken} =  require("../utils/AunthenticateUser")



router.get("/details", authToken, asyncHandler(adminController.getAdminDetails)); //for a single user
router.get("/staffs/data", authToken, asyncHandler(adminController.fetchStaffs)); //for a single user
router.get("/staffs/data/:staffId", authToken, asyncHandler(adminController.fetchStaff)); 
router.delete("/staffs/data/:staffId", authToken, asyncHandler(adminController.deleteStaff)); 
router.put("/staffs/data/:staffId", authToken, asyncHandler(adminController.actionOnStaff)); 
router.get("/users/data", authToken, asyncHandler(adminController.fetchAllUsers)); 
router.get("/users/data/:id", authToken, asyncHandler(adminController.fetchUser)); 

///others

router.post("/classification", authToken, classificationValidation, asyncHandler(adminController.addClassification)); 
router.get("/classification", authToken, asyncHandler(adminController.getClassifications)); 
router.get("/classification/:classification_number", authToken, asyncHandler(adminController.getAClassifications));
router.get("/classify/no_incidental", authToken, asyncHandler(adminController.getClassificationsNoIncidental)); 

router.get("/classify/has_incidental",authToken,asyncHandler(adminController.getClassificationsYesIncidental)); 

router.patch("/classification/:classId", authToken, asyncHandler(adminController.updateClassifications)); 
router.delete("/classification/:classId", authToken, asyncHandler(adminController.deleteClassifications));
router.get("/classify/merge", authToken, asyncHandler(adminController.getClassificationMerge)); 
router.post("/classificationMerge", authToken, asyncHandler(adminController.addClassificationMerge)); 
router.patch("/updateclassificationMerge/:classId", authToken, asyncHandler(adminController.updateClassificationMerge)); 
router.delete("/deleteclassificationMerge/:classId", authToken, asyncHandler(adminController.deleteClassificationMerge)); 
router.put("/classification/restrict/:classId", authToken, asyncHandler(adminController.restrictClassifications));

router.get("/all-applications/", authToken, asyncHandler(adminController.getAllUsersForms));

router.get("/application/:appId", authToken, asyncHandler(adminController.getSingleApplication));
 
router.put("/application/:appId", authToken, asyncHandler(adminController.actionOnApplication));
router.get("/application/filter/:status", authToken, asyncHandler(adminController.filterApplication)); 
router.post("/fees", authToken, feeValidation, asyncHandler(adminController.addFees)); 
router.get("/fees", authToken, asyncHandler(adminController.fetchFees)); 
router.put("/fees/:feeId", authToken, asyncHandler(adminController.updateFees)); 
router.delete("/fees/:feeId", authToken, asyncHandler(adminController.deleteFee)); 
 
// conversation
router.put("/application/msg/add", authToken, asyncHandler(adminController.addMsgToApplication)); 

module.exports = router;



    