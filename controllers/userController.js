const { getClassificationsWithMerges,getClassificationWithIncidental } = require("../services/userServices");
const axios = require('axios');
const crypto = require('crypto');
const dotenv = require('dotenv');
const UserService = require("../services/userServices")
const AdminService = require("../services/adminServices")
const FormsRepo = require("../repositories/formsRepo");
//const StatusCodes = require("../utils/statusCodes")
const {Categories,SubCategories,Fee,Classification,ClassificationFees} = require("../sequelize/models" );
const {Op} = require('sequelize');
const StatusCodes = require("../utils/statusCodes");

dotenv.config();

const REMITA_MERCHANT_ID = process.env.REMITA_MERCHANT_ID;
const REMITA_API_KEY = process.env.REMITA_API_KEY;
const REMITA_CONSUMER_KEY = process.env.REMITA_CONSUMER_KEY;
const REMITA_SERVICE_TYPE_ID = process.env.REMITA_SERVICE_TYPE_ID;
const REMITA_BASE_URL = process.env.REMITA_BASE_URL;
const RESPONSE_URL = process.env.RESPONSE_URL;

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
    totalCount: data.totalCount,
    totalPages: data.totalPages,
    page: data.page,
    limit: data.limit,
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

// exports.makePayment = async (req, res) => {
//   try {
//     const {
//       serviceTypeId = REMITA_SERVICE_TYPE_ID,
//       totalAmount,
//       payerName,
//       payerEmail,
//       payerPhone,
//       description,
//       statutoryFees,
//       incidentalFees,
//     } = req.body;

//     const orderId = Date.now();

//     const lineItem1 = {
//       lineItemsId: "itemid1",
//       beneficiaryName: "Alozie Michael",
//       beneficiaryAccount: "6020067886",
//       bankCode: "058",
//       beneficiaryAmount: `${Number(statutoryFees)}`,
//       deductFeeFrom: "1"
//     };

//     const lineItem2 = {
//       lineItemsId: "itemid2",
//       beneficiaryName: "Folivi Joshua",
//       beneficiaryAccount: "0360883515",
//       bankCode: "058",
//       beneficiaryAmount: `${Number(incidentalFees)}`,
//       deductFeeFrom: "0"
//     };

//     const lineItems = [lineItem1, lineItem2];

//     const hashData = REMITA_MERCHANT_ID + serviceTypeId + orderId + Number(totalAmount) + REMITA_API_KEY;
//     const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `remitaConsumerKey=${REMITA_CONSUMER_KEY},remitaConsumerToken=${apiHash}`
//     };

//     const payload = {
//       serviceTypeId,
//       amount: Number(totalAmount),
//       orderId,
//       payerName,
//       payerEmail,
//       payerPhone,
//       description,
//       responseUrl: RESPONSE_URL,
//       lineItems
//       // "expiryDate" can be added if required.
//     };

//     const response = await axios.post(REMITA_BASE_URL, payload, { headers });

//     let data;
//     if (typeof response.data === 'string') {
//       let resBody = response.data;
//       if (resBody.startsWith('jsonp')) {
//         resBody = resBody.substring(7, resBody.length - 1);
//       }
//       data = JSON.parse(resBody);
//     } else {
//       data = response.data;
//     }
//     if (data && data.RRR) {
//       const transactionData = {
//         user_id: req.user?.id || null,
//         form_id: req.body.form_id || null,
//         form_name: req.body.form_name || '',
//         rrr: data.RRR,
//         billerName: "Remita Payment Gateway",
//         payerName,
//         payerEmail,
//         statutoryFees,
//         totalFees: totalAmount,
//         transactionDate: new Date()
//       };

//      const transaction = await AdminService.createTransaction(transactionData);
//      console.log(transaction);
//     }

//     res.json({ ...data, orderId});
//   } catch (error) {
//     console.error('Error processing Remita split payment:', error);
//     res.status(500).json({ error: 'Payment creation failed', details: error.message });
//   }
// };

exports.makePayment = async (req, res) => {
  try {
    const {
      serviceTypeId = REMITA_SERVICE_TYPE_ID,
      totalAmount,
      payerName,
      payerEmail,
      payerPhone,
      description,
      statutoryFees,
      incidentalFees,
      form_id,
      form_name
    } = req.body;

    const userId = req.user?.id || null;

    // Step 1: Check if an RRR already exists for this user & form
    const existingTransaction = await UserService.findTransactionByUserAndForm(req);

    if (existingTransaction && existingTransaction.rrr) {
      return res.json({
        message: 'RRR already generated',
        rrr: existingTransaction.rrr,
        orderId: existingTransaction.orderId,
        reuse: true
      });
    }

    // Step 2: No existing RRR, so generate a new one
    const orderId = Date.now();

    const lineItem1 = {
      lineItemsId: "itemid1",
      beneficiaryName: "Alozie Michael",
      beneficiaryAccount: "6020067886",
      bankCode: "058",
      beneficiaryAmount: `${Number(statutoryFees)}`,
      deductFeeFrom: "1"
    };

    const lineItem2 = {
      lineItemsId: "itemid2",
      beneficiaryName: "Folivi Joshua",
      beneficiaryAccount: "0360883515",
      bankCode: "058",
      beneficiaryAmount: `${Number(incidentalFees)}`,
      deductFeeFrom: "0"
    };

    const lineItems = [lineItem1, lineItem2];

    const hashData = REMITA_MERCHANT_ID + serviceTypeId + orderId + Number(totalAmount) + REMITA_API_KEY;
    const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `remitaConsumerKey=${REMITA_CONSUMER_KEY},remitaConsumerToken=${apiHash}`
    };

    const payload = {
      serviceTypeId,
      amount: Number(totalAmount),
      orderId,
      payerName,
      payerEmail,
      payerPhone,
      description,
      responseUrl: RESPONSE_URL,
      lineItems
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

    const rrr = data?.RRR || null;

    // Step 3: Save the transaction regardless of payment status
    const transactionData = {
      user_id: userId,
      form_id,
      form_name,
      rrr,
      billerName: "Remita Payment Gateway",
      payerName,
      payerEmail,
      statutoryFees,
      totalFees: totalAmount,
      orderId,
      transactionDate: new Date()
    };

    const transaction = await AdminService.createTransaction(transactionData);
    console.log('Saved transaction:', transaction);

    res.json({ ...data, orderId });

  } catch (error) {
    console.error('Error processing Remita payment:', error);
    res.status(500).json({ error: 'Payment creation failed', details: error.message });
  }
};

// exports.makeSinglePayment = async (req, res) => {
//   try {
//     // Get the data from the request body
//     const {
//       amount,
//       payerName,
//       payerEmail,
//       payerPhone,
//       description,
//       form_id,
//       form_name,
//     } = req.body;

//     // Validate that required fields are provided
//     if (!amount || !payerName || !payerEmail || !payerPhone || !description) {
//       return res.status(400).json({
//         error: 'All fields are required: amount, payerName, payerEmail, payerPhone, description'
//       });
//     }

//     // Generate orderId (timestamp in milliseconds)
//     const d = new Date();
//     const orderId = d.getTime();

//     // Generate API hash using SHA512
//     const hashData = REMITA_MERCHANT_ID + REMITA_SERVICE_TYPE_ID + orderId + amount + REMITA_API_KEY;
//     const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

//     // Prepare request body for the payment API
//     const body = {
//       serviceTypeId: REMITA_SERVICE_TYPE_ID,
//       amount: amount,
//       orderId: orderId,
//       payerName: payerName,
//       payerEmail: payerEmail,
//       payerPhone: payerPhone,
//       description: description
//     };

//     // Prepare headers
//     const headers = {
//       'Authorization': `remitaConsumerKey=${REMITA_CONSUMER_KEY},remitaConsumerToken=${apiHash}`,
//       'Content-Type': 'application/json'
//     };

//     // Log the body to verify it's correct
//     console.log('Request Body:', body);

//     // Send POST request to the payment API
//     const response = await axios.post(REMITA_BASE_URL, body, { headers });

//     // Log the response for debugging
//     console.log('Raw API Response:', response.data);

//     // Parse the response and extract necessary fields
//     let resBody = response.data;
//     if (resBody.startsWith('jsonp')) {
//       resBody = resBody.substring(7, resBody.length - 1);  // Remove JSONP wrapper if present
//       console.log('Processed API Response:', resBody);  // Log after removing JSONP wrapper
//     }

//     const data = JSON.parse(resBody);

//     // Check if the response has the expected data fields
//     if (data && data.RRR && data.statuscode && data.status) {

//       const result = {
//         statuscode: data.statuscode,  // Add the statuscode
//         RRR: data.RRR,                // Add the RRR
//         status: data.status           // Add the status message
//       };

//       const transactionData = {
//         user_id: req.user?.id || null,
//         form_id,
//         form_name,
//         rrr: data.RRR,
//         billerName: "Remita Payment Gateway",
//         payerName,
//         payerEmail,
//         statutoryFees:0,
//         totalFees: amount,
//         transactionDate: new Date()
//       };

//       const transaction = await AdminService.createTransaction(transactionData);
//       console.log(transaction)
//       console.log('Payment Response:', result);  // Log the payment response for debugging
//       return res.status(200).json(result);  // Send the payment response back to the client
//     } else {
//       return res.status(500).json({ error: 'Failed to retrieve valid response data from Remita' });
//     }

//   } catch (error) {
//     console.error('Error making payment:', error.message);  // Logs the error message
//     if (error.response) {
//       // If there is a response from Remita (e.g., status code, data)
//       console.error('Error Response Data:', error.response.data);  // Log the response data
//       console.error('Error Response Status:', error.response.status);  // Log the response status code
//     }
//     console.error('Stack trace:', error.stack);  // Logs the stack trace
//     return res.status(500).json({ error: 'An error occurred while processing the payment' });
//   }
// };

exports.makeSinglePayment = async (req, res) => {
  try {
    const {
      amount,
      payerName,
      payerEmail,
      payerPhone,
      description,
      form_id,
      form_name
    } = req.body;

    const userId = req.user?.id || null;

    // Validate required fields
    if (!amount || !payerName || !payerEmail || !payerPhone || !description) {
      return res.status(400).json({
        error: 'All fields are required: amount, payerName, payerEmail, payerPhone, description'
      });
    }

    // Step 1: Check for existing RRR for this user + form
    const existingTransaction = await UserService.findTransactionByUserAndForm(req);

    if (existingTransaction && existingTransaction.rrr) {
      return res.status(200).json({
        message: 'RRR already generated',
        RRR: existingTransaction.rrr,
        orderId: existingTransaction.orderId,
        reuse: true
      });
    }

    // Step 2: No RRR found, proceed to generate a new one
    const orderId = Date.now();

    const hashData = REMITA_MERCHANT_ID + REMITA_SERVICE_TYPE_ID + orderId + amount + REMITA_API_KEY;
    const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

    const body = {
      serviceTypeId: REMITA_SERVICE_TYPE_ID,
      amount,
      orderId,
      payerName,
      payerEmail,
      payerPhone,
      description
    };

    const headers = {
      'Authorization': `remitaConsumerKey=${REMITA_CONSUMER_KEY},remitaConsumerToken=${apiHash}`,
      'Content-Type': 'application/json'
    };

    const response = await axios.post(REMITA_BASE_URL, body, { headers });

    let resBody = response.data;
    if (resBody.startsWith('jsonp')) {
      resBody = resBody.substring(7, resBody.length - 1);
    }

    const data = JSON.parse(resBody);

    if (data && data.RRR) {
      const transactionData = {
        user_id: userId,
        form_id,
        form_name,
        rrr: data.RRR,
        billerName: "Remita Payment Gateway",
        payerName,
        payerEmail,
        statutoryFees: 0,
        totalFees: amount,
        orderId,
        transactionDate: new Date()
      };

      const transaction = await AdminService.createTransaction(transactionData);
      console.log('Saved transaction:', transaction);

      return res.status(200).json({
        RRR: data.RRR,
        orderId,
        statuscode: data.statuscode,
        status: data.status
      });
    } else {
      return res.status(500).json({ error: 'Failed to retrieve valid RRR from Remita' });
    }

  } catch (error) {
    console.error('Error making payment:', error.message);
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
    }
    console.error('Stack trace:', error.stack);
    return res.status(500).json({ error: 'An error occurred while processing the payment' });
  }
};

exports.checkTransactionStatus = async (req, res) => {
  try {
    const { rrr } = req.body;
    if (!rrr) {
      return res.status(400).json({ error: "Missing required parameter: rrr" });
    }

    const hashData = rrr + REMITA_API_KEY + REMITA_MERCHANT_ID;
    const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

    const url = `http://www.remitademo.net/remita/ecomm/${REMITA_MERCHANT_ID}/${rrr}/${apiHash}/status.reg`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `remitaConsumerKey=${REMITA_MERCHANT_ID},remitaConsumerToken=${apiHash}`
    };

    const response = await axios.get(url, { headers });

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

    res.json(data);
  } catch (error) {
    console.error('Error checking transaction status:', error);
    res.status(500).json({ error: 'Failed to check transaction status', details: error.message });
  }
};

exports.checkTransactionStatusBank = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const formId = req.body?.form_id || null;

    if (!userId || !formId) {
      return res.status(400).json({ error: "Missing required parameters: user or form ID" });
    }

    // Find transaction with matching user and form
    const transaction = await UserService.findTransactionByUserAndForm(req);

    if (!transaction || !transaction.rrr) {
      return res.status(404).json({ error: "No transaction found with valid RRR" });
    }

    const rrr = transaction.rrr;
    const hashData = rrr + REMITA_API_KEY + REMITA_MERCHANT_ID;
    const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

    const url = `http://www.remitademo.net/remita/ecomm/${REMITA_MERCHANT_ID}/${rrr}/${apiHash}/status.reg`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `remitaConsumerKey=${REMITA_MERCHANT_ID},remitaConsumerToken=${apiHash}`
    };

    const response = await axios.get(url, { headers });

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

    res.json({
      message: 'Transaction status retrieved successfully',
      rrr,
      statusResponse: data
    });

  } catch (error) {
    console.error('Error checking transaction status:', error);
    res.status(500).json({
      error: 'Failed to check transaction status',
      details: error.message
    });
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
}

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
      STATUS_CODE:500,
      STATUS: false,
      MESSAGE: "Internal server error",
    };
  }
};
