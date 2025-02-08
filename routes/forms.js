const express = require("express");
const { asyncHandler } = require("../middlewares/handler");
const formsController = require("../controllers/formsController");
const { authToken } = require("../utils/AunthenticateUser");
const {validateReqBody} = require("../validations/reqValidator");
     const {authorizationApprovedSchema,authorizationManufacturerSchema,competencyCertificationFormLiftOperatorSchema} = require("../validations/formValidator");
const { route } = require("./users");


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

router.get(
  "/get-authorization-approved/:id",
  authToken,
  asyncHandler(formsController.getAuthorizationApprovedById)
);

router.put(
  "/update-authorization-approved/:id",
  authToken,
  asyncHandler(formsController.updateAuthorizationApproved)
);


                                                        
router.get(
  "/authorization-approved/:userId",
  authToken,
  asyncHandler(formsController.getAuthorizationApprovedByUserId)
);

//authorization manufacture
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
  "/get-authorization-manufacturer/:id",
  asyncHandler(formsController.getAllAuthorizationManufacturer)
);
router.put(
  "/update-authorization-manufacturer/:id",
  authToken,
  asyncHandler(formsController.updateAuthorizationManufacturer)
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

  router.put(
    "/update-authorization-training/:id",
    authToken,
    asyncHandler(formsController.updateAuthorizationTraining)
  );

  router.get(
    "/get-authorization-training/:id",
    authToken,
    asyncHandler(formsController.getAuthorizationTrainingById)
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
router.post('/competency-form-lifting', authToken, formsController.createCompetencyCertificationLiftOperator);
router.get('/competency-form-lifting', authToken, formsController.getAllCompetencyCertificationLiftOperator);
router.get('/user-competency-form-lifting', authToken, formsController.getCompetencyCertificationLiftOperatorByUserId);
router.get('/competency-form-lifting/:id', authToken, formsController.getCompetencyCertifcationLiftOperatorById);
router.put('/update-cfl/:id', authToken, formsController.updateCompetencyCertifcationLiftOperator);
// router.delete('/delete-competency-form-lifting/:id', authToken, formsController.deleteCompetencyCertifcationLiftOperator);



// Competency Certification Lifting Operator routes
router.post("/competency-certification-operator-1", authToken, formsController.createOperatorCertification);
router.get("/competency-certification-operator-1", authToken, formsController.getAllOperatorCertifications);
router.get("/user-competency-certification-operator-1", authToken, formsController.getOperatorCertificationsByUserId);
router.get("/competency-certification-operator-1/:id", authToken, formsController.getOperatorCertificationById);
router.put("/competency-certification-operator-1/:id", authToken, formsController.updateOperatorCertification);
router.delete("/competency-certification-operator-1/:id", authToken, formsController.deleteOperatorCertification);


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
router.get("/user-competency-certification-inspection", authToken, asyncHandler(formsController.getAllCompetencyCertificationInspectionByUserId));
router.put("/update-cci/:id",authToken, asyncHandler(formsController.updateCompetencyCertificationInspection))


//Competenmcy form boiler
router.post("/competency-certification-boiler", authToken, asyncHandler(formsController.createCompetencyCertificationBoiler));
router.get("/competency-certification-boiler", authToken, asyncHandler(formsController.getAllCompetencyCertificationBoiler));
router.get("/competency-certification-boiler/:id", authToken, asyncHandler(formsController.getAllCompetencyCertificationBoilerById));
router.get("/user-competency-certification-boiler", authToken, asyncHandler(formsController.getAllCompetencyCertificationBoilerByUserId));
router.put("/update-ccb/:id",authToken, asyncHandler(formsController.updateCompetencyCertificationBoiler))



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

// Report Routes    
router.post("/create-reports", authToken,asyncHandler(formsController.createReport));
router.get("/reports",authToken, formsController.getAllReports);
router.get( "/reports-userid/:userId", authToken, asyncHandler(formsController.getReportByUserId));
router.get("/reports/:id", authToken,formsController.getReportById);
router.put("/reports/:id",authToken,  formsController.updateReport);
router.put("/edit-reports/:id",authToken,  formsController.updateUserReport);
router.delete("/reports/:id",authToken, 
   formsController.deleteReport);

module.exports = router;