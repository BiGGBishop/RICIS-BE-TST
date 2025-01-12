const express = require("express");
const { asyncHandler } = require("../middlewares/handler");
const formsController = require("../controllers/formsController");
const { authToken } = require("../utils/AunthenticateUser");
const {validateReqBody} = require("../validations/reqValidator");
const {authorizationApprovedSchema,authorizationManufacturerSchema} = require("../validations/formValidator")

const router = express.Router();

router.post(
  "/authorization-approved",
  authToken,
  validateReqBody(authorizationApprovedSchema),
  asyncHandler(formsController.createAuthorizationApproved)
);

router.get(
  "/all-authorization-approved",
  authToken,
  asyncHandler(formsController.getAllAuthorizationApproved)
);


router.get(
  "/authorization-approved/:userId",
  authToken,
  asyncHandler(formsController.getAuthorizationApprovedByUserId)
);

router.post(
  "/authorization-manufacturer",
  authToken,
  authToken,
  validateReqBody(authorizationManufacturerSchema),
  asyncHandler(formsController.createAuthorizationManufacturer)
);

router.get(
  "/all-authorization-manufacturer",
  asyncHandler(formsController.getAllAuthorizationManufacturer)
);

router.get(
  "/authorization-manufacturer/:userId",
  asyncHandler(formsController.getAuthorizationManufacturerByUserId)
);

router.post(
  "/authorization-training",
  authToken,
  asyncHandler(formsController.createAuthorizationTraining)
);

router.get(
    "/all-authorization-training",
    authToken,
    asyncHandler(formsController.getAllAuthorizationTraining)
  );

  
router.get(
  "/authorization-training/:userId",
  authToken,
  asyncHandler(formsController.getAuthorizationTrainingByUserId)
);

module.exports = router;
