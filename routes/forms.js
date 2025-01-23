const express = require("express");
const { asyncHandler } = require("../middlewares/handler");
const formsController = require("../controllers/formsController");
const { authToken } = require("../utils/AunthenticateUser");
const {validateReqBody} = require("../validations/reqValidator");
     const {authorizationApprovedSchema,authorizationManufacturerSchema,competencyCertificationFormLiftOperatorSchema} = require("../validations/formValidator")

const router = express.Router();

router.post(
  "/authorization-approved",
  authToken,
   
  asyncHandler(formsController.createAuthorizationApproved)
);

router.get(
  "/all-authorization-approved",
  authToken,
  asyncHandler(formsController.getAllAuthorizationApproved)
);

router.put(
  "/authorization-approved/:id",
  authToken,
  asyncHandler(formsController.updateAuthorizationApproved)
);
                                                        
router.get(
  "/authorization-approved/:userId",
  authToken,
  asyncHandler(formsController.getAuthorizationApprovedByUserId)
);

router.post(
  "/authorization-manufacturer",
  authToken,

  //validateReqBody(authorizationManufacturerSchema),
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

router.post(
  "/boiler-registration",
  authToken,
  asyncHandler(formsController.createBoilerRegistration)
);

router.get(
    "/all-boiler-registrations",
    authToken,
    asyncHandler(formsController.getAllBoilerRegistrations)
);

router.get(
    "/boiler-registration/:userId",
    authToken,
    asyncHandler(formsController.getBoilerRegistrationByUserId)
);
// Competency Certification Form Routes
router.post('/competency-form-lifting', authToken,validateReqBody(competencyCertificationFormLiftOperatorSchema), formsController.createCompetencyCertificationLiftOperator);
router.get('/competency-form-lifting-operator', authToken, formsController.getAllCompetencyCertificationLiftOperator);
router.get('/competency-form/user/:userId', authToken, formsController.getCompetencyFormByUserId);
router.get('/competency-form/:id', authToken, formsController.getCompetencyFormById);
router.put('/competency-form/:id', authToken, formsController.updateCompetencyForm);
router.delete('/competency-form/:id', authToken, formsController.deleteCompetencyForm);



// Competency Certification Lifting Operator routes
router.post("/competency-certification-lifing-08", authToken, formsController.createOperatorCertification);
router.get("/competency-certification-lifing-08", authToken, formsController.getAllOperatorCertifications);
router.get("/competency-certification-lifing-08/user", authToken, formsController.getOperatorCertificationsByUserId);
router.get("/competency-certification-lifing-08/:id", authToken, formsController.getOperatorCertificationById);
router.put("/competency-certification-lifing-08/:id", authToken, formsController.updateOperatorCertification);
router.delete("/competency-certification-lifing-08/:id", authToken, formsController.deleteOperatorCertification);


// Competency Certification Lifting Operator routes
router.post("/competency-certification-lifting-07", authToken, asyncHandler(formsController.createCompetencyCertificationLifting));
router.get("/competency-certification-lifting-07", authToken, asyncHandler(formsController.getAllCompetencyCertificationLifting));
router.get("/competency-certification-lifting-07/userId", authToken, asyncHandler(formsController.getCompetencyCertificationLiftingByUserId));
router.get("/competency-certification-lifting-07/:id", authToken, asyncHandler(formsController.getCompetencyCertificationLiftingById));
router.put("/competency-certification-lifting-07/:id", authToken, asyncHandler(formsController.updateCompetencyCertificationLifting));
router.delete("/competency-certification-lifting-07/:id", authToken, asyncHandler(formsController.deleteCompetencyCertificationLifting));


// Competency Certification Lifting Operator routes
router.post("/competency-certification-inspection", authToken, asyncHandler(formsController.createCompetencyCertificationInspection));
router.get("/competency-certification-inspection", authToken, asyncHandler(formsController.getAllCompetencyCertificationInspection));
router.get("/competency-certification-inspection", authToken, asyncHandler(formsController.getCompetencyCertificationInspectionByUserId));


// Competency Certification Welder routes
router.post("/competency-certification-welder", authToken, asyncHandler(formsController.createCompetencyCertificationwelder));
router.get("/competency-certification-welder", authToken, asyncHandler(formsController.getAllCompetencyCertificationWelder));
router.get("/competency-certification-welder/userId", authToken, asyncHandler(formsController.getAllCompetencyCertificationWelderByUserId));



//renewal  
router.post("/renewal-form", authToken, formsController.createRenewalForm);
router.get("/renewal-form", authToken, formsController.getAllRenewalForms);
router.get("/renewal-form/user", authToken, formsController.getRenewalFormByUserId);


//lfting equpment reg
router.post("/lifting-equipment-registration", authToken, formsController.createLiftingEquipmentRegistration);
router.get("/lifting-equipment-registration", authToken, formsController.getAllLiftingEquipmentRegistration);
router.get("/lifting-equipment-registration/user", authToken, formsController.getLiftingEquipmentRegistrationByUserId);

module.exports = router;