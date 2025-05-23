const express = require("express");
const router = express.Router();
const {
  authValidation,
  getOtpValidation,
  verifyOtpValidation,
  userSignUpValidation,
} = require("../validations/userValidation");
const { asyncHandler } = require("../middlewares/handler");
const usersController = require("../controllers/userController");
const adminController = require("../controllers/adminController")
const { authToken } = require("../utils/AunthenticateUser");



router.post("/super-login", asyncHandler(adminController.superLogin));
router.post("/otp", getOtpValidation, asyncHandler(usersController.getOTP));
router.post(
  "/otp/resend",
  getOtpValidation,
  asyncHandler(usersController.resendOTP)
);
router.post(
  "/verify/otp",
  verifyOtpValidation,
  asyncHandler(usersController.validateOTP)
);

router.post(
  "/register/user",
  authToken,
  userSignUpValidation,
  asyncHandler(usersController.signUpUsers)
);
router.post(
  "/login/user",
  authValidation,
  asyncHandler(usersController.signIn)
);


router.post(
  "/recovery/otp",
  asyncHandler(usersController.recoveryOtp) // also to RESEND PASSWORD otp for both users and staffs
); 

router.post(
  //VERIFY OTP FOR FORGOT RECOVEERY for both users and staffs
  "/recovery/verify/otp",
  asyncHandler(usersController.verifyRecoveryOTP)
);

router.patch(
  "/recovery/password/reset",
  asyncHandler(usersController.resetForgotPassword) //recovery pasword for both user and admin-staff
);

router.patch(
  "/password/update",
  authToken,
  // validateReqBody(loginBody()),
  asyncHandler(usersController.resetUserPassword) 
);

//STAFFS-ADMIN

router.post(
  "/register/staff",
  authToken,
  asyncHandler(usersController.registerStaffAndAdmin)
);

router.post(
  "/login/staff",
  authValidation,

  asyncHandler(usersController.staffLogin)
);
module.exports = router;
