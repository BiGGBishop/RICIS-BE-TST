const { getClassificationsWithMerge,getClassificationWithIncidental } = require("../services/userServices");
const axios = require('axios');
const UserService = require("../services/userServices")
const FormsRepo = require("../repositories/formsRepo");
const StatusCodes = require("../utils/statusCodes")


exports.getOTP = async (req, res) => {
  const data = await UserService.getOTP(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.resendOTP = async (req, res) => {
  const data = await UserService.resendOTP(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.validateOTP = async (req, res) => {
  const data = await UserService.validateOTP(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.signUpUsers = async (req, res) => {
  const data = await UserService.signUpUsers(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.signIn = async (req, res) => {
  const data = await UserService.signIn(req, res);
  console.log("console.lof wokring..")

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.recoveryOtp = async (req, res) => {
  const data = await UserService.recoveryOtp(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.verifyRecoveryOTP = async (req, res) => {
  const data = await UserService.verifyRecoveryOTP(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.resetForgotPassword = async (req, res) => {
  const data = await UserService.resetForgotPassword(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.resetUserPassword = async (req, res) => {
  const data = await UserService.resetUserPassword(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getUsers = async (req, res) => {
  const data = await UserService.getUsers(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};


exports.getUserDetails = async (req, res) => {
  const data = await UserService.getUserDetails(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.registerStaffAndAdmin = async (req, res) => {
  const data = await UserService.registerStaffAndAdmin(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.staffLogin = async (req, res) => {
  const data = await UserService.staffLogin(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.createApplication = async (req, res) => {
  const data = await UserService.createApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getUsersApplication = async (req, res) => {
  const data = await UserService.getUsersApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getUsersSingleApplication = async (req, res) => {
  const data = await UserService.getUsersSingleApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.addMsgToApplication = async (req, res) => {
  const data = await UserService.addMsgToApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};



exports.getPaymentToken = async (req, res) => {
  // const data = await UserService.getPaymentToken(req, res);
  const data = {
    username: 'KLTILUKE8JFUITR2',
    password: 'H8UJKGPI1ALHL20E98PWEP04V5KXHS1M'
  };
  
  let dataresponse
  axios.post('https://demo.remita.net/remita/exapp/api/v1/send/api/uaasvc/uaa/token', data)
    .then(response => {
      // console.log(response.data); // Handle the response data

      dataresponse  =  response.data
    })
    .catch(error => {
      console.error({error}); // Handle any errors
    });


    console.log({dataresponse})
  return res.status(200).json({
    status: true,
    message: "data.MESSAGE",
    data: dataresponse,
  });
};

exports.hello = async (req, res) => {
  res.status(200).json({
    message: "Hello World!",
    test: "just a test!",
  });
};

exports.getClassificationWithIncidental = async (req, res) => {
  try {
    const { classification_number } = req.query; // Get classification_number from query params

    if (!classification_number) {
      return res.status(400).json({
        status: false,
        message: "classification_number is required",
      });
    }

    const data = await getClassificationWithIncidental(classification_number);

    return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
    });
  } catch (error) {
    console.error("Error in getClassificationWithIncidental:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });
  }
};                                                                                                                                                        


exports.getClassificationMergeData = async (req, res) => {
  const { classification_number } = req.body;
  console.log(classification_number)
  try{
    const data = await getClassificationsWithMerge(classification_number)

    return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
    });
  }catch(error){
    console.error("Error in getClassificatioWithMerge:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });

  }
};


exports.getAllUserForms = async (req,res) => {
const userId = req?.user?.id;
if(!userId){
  return res.status(400).json({message:"action not allowed you need to log in as a user"})
}
  try {
    const [
      //             authorizationApprovedForms,
      authorizationManufacturerForms,
      authorizationTrainingForms,
      competencyCertificationLiftOperator
      //boilerRegistrationForms,
      // competencyForms,
      // competencyLifting08Forms,
      // competencyLifting07Forms,
      // competencyInspectionForms,                                                                
      //competencyWelderForms,
      // renewalForms,
      // liftingEquipmentRegistrationForms,
    ] = await Promise.all([
         FormsRepo.findByUserIdAuthorizationApproved(userId),
      FormsRepo.findByUserIdAuthorizationManufacturer(userId),
      FormsRepo.findByUserIdTrainingAuthorization(userId),
      FormsRepo.findByUserIdCompetencyCertificationLiftOperator(userId),
     // FormsRepo.findByUserIdBoilerRegistrationRepos(userId),
      //FormsRepo.findByUserIdCompetencyCertificationFormBoiler(userId),
     // FormsRepo.findByUserIdCompetencyLifting08(userId),
     // FormsRepo.findByUserIdCompetencyLifting07(userId),
      //FormsRepo.findByUserIdCompetencyInspection(userId),
      //FormsRepo.findByUserIdCompetencyWelder(userId),
      //FormsRepo.findByUserIdRenewalForm(userId),
      //FormsRepo.findByUserIdLiftingEquipmentRegistration(userId),
    ]);

    const allForms = {
     authorizationApprovedForms: authorizationApprovedForms || [],
      authorizationManufacturerForms: authorizationManufacturerForms || [],
      authorizationTrainingForms: authorizationTrainingForms || [],
      competencyCertificationLiftOperatior:competencyCertificationLiftOperator||[]
     // boilerRegistrationForms: boilerRegistrationForms || [],
      //competencyForms: competencyForms || [],
      //compete ncyLifting08Forms: competencyLifting08Forms || [],
      //competencyLifting07Forms: competencyLifting07Forms || [],
      //competencyInspectionForms: competencyInspectionForms || [],
      //competencyWelderForms: competencyWelderForms || [],
      //renewalForms: renewalForms || [],
      //liftingEquipmentRegistrationForms: liftingEquipmentRegistrationForms || [],
    };

    return res.status(200).json({
      status: true,
      message: "User forms fetched successfully.",
      data: allForms,
    });
  } catch (error) {
    console.error("Error fetching all user forms:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Internal server error",
    };
  }
};
                                                                             
