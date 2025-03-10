const { getClassificationsWithMerges,getClassificationWithIncidental } = require("../services/userServices");
const axios = require('axios');
const crypto = require('crypto');
const dotenv = require('dotenv');
const UserService = require("../services/userServices")
const FormsRepo = require("../repositories/formsRepo");
//const StatusCodes = require("../utils/statusCodes")
const {Categories,SubCategories,Fee,Classification,ClassificationFees} = require("../sequelize/models" );
const {Op} = require('sequelize')

dotenv.config();

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
  
  let dataresponse = axios.post('https://demo.remita.net/remita/exapp/api/v1/send/api/uaasvc/uaa/token', data)
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

const REMITA_MERCHANT_ID = process.env.REMITA_MERCHANT_ID;
const REMITA_API_KEY = process.env.REMITA_API_KEY;
const REMITA_CONSUMER_KEY = process.env.REMITA_CONSUMER_KEY;
const REMITA_SERVICE_TYPE_ID = process.env.REMITA_SERVICE_TYPE_ID;
const REMITA_BASE_URL = process.env.REMITA_BASE_URL;
const RESPONSE_URL = process.env.RESPONSE_URL;

exports.makePayment = async (req, res) => {
  try {
    const {
      serviceTypeId = REMITA_SERVICE_TYPE_ID,
      totalAmount,
      payerName,
      payerEmail,
      payerPhone,
      description,
      lineItems
    } = req.body;

    const orderId = Date.now();

    const hashData = REMITA_MERCHANT_ID + serviceTypeId + orderId + totalAmount + REMITA_API_KEY;
    const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `remitaConsumerKey=${REMITA_CONSUMER_KEY},remitaConsumerToken=${apiHash}`
    };

    const payload = {
      serviceTypeId,
      amount: totalAmount,
      orderId,
      payerName,
      payerEmail,
      payerPhone,
      description,
      responseUrl: RESPONSE_URL,
      lineItems
      // "expiryDate" can be added if required.
    };

    const response = await axios.post(REMITA_BASE_URL, payload, { headers });

    let data;
    if (typeof response.data === 'string') {
      let resBody = response.data;
      if (resBody.startsWith('jsonp')) {
        resBody = resBody.substring(7, resBody.length - 1);
      }
      data = JSON.parse(resBody);
    } else {
      data = response.data;
    }

    res.json({ ...data, orderId });
  } catch (error) {
    console.error('Error processing Remita split payment:', error);
    res.status(500).json({ error: 'Payment creation failed', details: error.message });
  }
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
  const { classification_number,application_type } = req.body;
  console.log(classification_number,application_type)
  try{
    const data = await getClassificationsWithMerges(classification_number,application_type);
    return res.status(200).json({
      data: data,
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
   const results = await Promise.all([
                 FormsRepo.findByUserIdAuthorizationApproved(userId,{
                    include:[
                      {
                        model: Classification,
                        as: "classification",
                        attributes: ["id", "classification_name"],
                        include: {
                          model: ClassificationFees,
                          as: "classificationFees", // Changed alias to match the association
                          attributes: ["amount"],
                        },
                      },
                      { model: Categories, as: 'category', attributes: ['name'] },
                      { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                      { model: Fee, as: 'fee', attributes: ['fee_type'] },
                    ],       
                  }),                            
                FormsRepo.findByUserIdAuthorizationManufacturer(userId,{
                  include: [
                    {
                      model: Classification,
                      as: "classification",
                      attributes: ["id", "classification_name"],
                      include: {
                        model: ClassificationFees,
                        as: "classificationFees", // Changed alias to match the association
                        attributes: ["amount"],
                      },
                    },
                    { model: Categories, as: 'category', attributes: ['name'] },
                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
                  ],       
                }),                 
                FormsRepo.findByUserIdTrainingAuthorization(userId,{
                  include: [
                    {
                      model: Classification,
                      as: "classification",
                      attributes: ["id", "classification_name"],
                      include: {
                        model: ClassificationFees,
                        as: "classificationFees", // Changed alias to match the association
                        attributes: ["amount"],
                      },
                    },
                    { model: Categories, as: 'category', attributes: ['name'] },
                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
                  ],       
                }),
                FormsRepo.findByUserIdCompetencyCertificationLiftOperator(userId,{
                  include: [
                    {
                      model: Classification,
                      as: "classification",
                      attributes: ["id", "classification_name"],
                      include: {
                        model: ClassificationFees,
                        as: "classificationFees", // Changed alias to match the association
                        attributes: ["amount"],
                      },
                    },
                    { model: Categories, as: 'category', attributes: ['name'] },
                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
                  ],     
                }),
              
               FormsRepo.findByUserIdBoilerRegistrationRepos(userId,{
                 include: [
                   {
                     model: Classification,
                     as: "classification",
                     attributes: ["id", "classification_name"],
                     include: {
                       model: ClassificationFees,
                       as: "classificationFees", // Changed alias to match the association
                       attributes: ["amount"],
                     },
                   },
                   { model: Categories, as: 'category', attributes: ['name'] },
                   { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                   { model: Fee, as: 'fee', attributes: ['fee_type'] },
                 ],    
               }),
   
               FormsRepo.findByUserIdCompetencyCertificationFormBoiler(userId,{
                 include: [
                   {
                     model: Classification,
                     as: "classification",
                     attributes: ["id", "classification_name"],
                     include: {
                       model: ClassificationFees,
                       as: "classificationFees", // Changed alias to match the association
                       attributes: ["amount"],
                     },
                   },
                   { model: Categories, as: 'category', attributes: ['name'] },
                   { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                   { model: Fee, as: 'fee', attributes: ['fee_type'] },
                 ],     
               }),
              FormsRepo.findByUserIdOperatorCertificationsByUserId(userId,{
                 include: [
                   {
                     model: Classification,
                     as: "classification",
                     attributes: ["id", "classification_name"],
                     include: {
                       model: ClassificationFees,
                       as: "classificationFees", // Changed alias to match the association
                       attributes: ["amount"],
                     },
                   },
                   { model: Categories, as: 'category', attributes: ['name'] },
                   { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                   { model: Fee, as: 'fee', attributes: ['fee_type'] },
                 ],     
               }),
              FormsRepo.findCompetencyCertificationLiftingByUserId(userId,{
                 include: [
                   {
                     model: Classification,
                     as: "classification",
                     attributes: ["id", "classification_name"],
                     include: {
                       model: ClassificationFees,
                       as: "classificationFees", // Changed alias to match the association
                       attributes: ["amount"],
                     },
                   },
                   { model: Categories, as: 'category', attributes: ['name'] },
                   { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                   { model: Fee, as: 'fee', attributes: ['fee_type'] },
                 ],     
               }),
               FormsRepo.findCompetencyCertificationInspectionByUserId(userId,{
                 include: [
                   {
                     model: Classification,
                     as: "classification",
                     attributes: ["id", "classification_name"],
                     include: {
                       model: ClassificationFees,
                       as: "classificationFees", // Changed alias to match the association
                       attributes: ["amount"],
                     },
                   },
                   { model: Categories, as: 'category', attributes: ['name'] },
                   { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                   { model: Fee, as: 'fee', attributes: ['fee_type'] },
                 ],     
               }),
               FormsRepo.findCompetencyCertificationWelderByUserId(userId,{
                 include: [
                   {
                     model: Classification,
                     as: "classification",
                     attributes: ["id", "classification_name"],
                     include: {
                       model: ClassificationFees,
                       as: "classificationFees", // Changed alias to match the association
                       attributes: ["amount"],
                     },
                   },
                   { model: Categories, as: 'category', attributes: ['name'] },
                   { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                   { model: Fee, as: 'fee', attributes: ['fee_type'] },
                 ],     
               }),
               FormsRepo.findRenewalFormsByUserId(userId,{
                 include: [
                   {
                     model: Classification,
                     as: "classification",
                     attributes: ["id", "classification_name"],
                     include: {
                       model: ClassificationFees,
                       as: "classificationFees", // Changed alias to match the association
                       attributes: ["amount"],
                     },
                   },
                   { model: Categories, as: 'category', attributes: ['name'] },
                   { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                   { model: Fee, as: 'fee', attributes: ['fee_type'] },
                 ],     
               }),
               FormsRepo.findByUserIdLiftingEquipmentRegistration(userId,{
                 include: [
                   {
                     model: Classification,
                     as: "classification",
                     attributes: ["id", "classification_name"],
                     include: {
                       model: ClassificationFees,
                       as: "classificationFees", // Changed alias to match the association
                       attributes: ["amount"],
                     },
                   },
                   { model: Categories, as: 'category', attributes: ['name'] },
                   { model: SubCategories, as: 'subcategory', attributes: ['name'] },
                   { model: Fee, as: 'fee', attributes: ['fee_type'] },
                 ],     
               }),                                     
             
         ]);
    const allForms = results.map((forms) => forms || []);
    console.log(allForms)
      
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

const FormsService = require("../services/formsServices");
const StatusCodes = require("../utils/statusCodes");

exports.getAllUserFormsWithCertificate = async (req, res) => {
  const userId = req?.user?.id;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "action not allowed you need to log in as a user" });
  }
  try {
    const results = await Promise.all([
      FormsRepo.findByUserIdAuthorizationApproved(userId, {
        where: {
          certificate: { [Op.ne]: null }, // Add this where clause
        },
        attributes: ['certificate'],
      }),
      FormsRepo.findByUserIdAuthorizationManufacturer(userId, {
        where: {
          certificate: { [Op.ne]: null }, // Add this where clause
        },
        attributes: ['certificate'],
      }),
      FormsRepo.findByUserIdTrainingAuthorization(userId, {
        where: {
          certificate: { [Op.ne]: null }, // Add this where clause
        },
        attributes: ['certificate'],
      }),
      FormsRepo.findByUserIdCompetencyCertificationLiftOperator(userId, {
        where: {
          certificate: { [Op.ne]: null }, // Add this where clause
        },
        attributes: ['certificate'],
      }),
    ]);
    const allForms = results.map((forms) => {
      if (forms && forms.length > 0) {
        return forms.map((form) => form.certificate); // Extract certificate from each form
      }
      return []; // Return empty array if no forms are found
    })

    return res.status(200).json({
      status: true,
      message: "User forms fetched successfully.",
      data: allForms,
    });
  } catch (error) {
    console.error("Error fetching all user forms:", error);
    return {
      STATUS_CODE:INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Internal server error",
    };
  }
};
