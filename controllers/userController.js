const { getClassificationsWithMerges,getClassificationWithIncidental } = require("../services/userServices");
const axios = require('axios');
const crypto = require('crypto');
const dotenv = require('dotenv');
const UserService = require("../services/userServices");
const AdminService = require("../services/adminServices");
const FormsRepo = require("../repositories/formsRepo");
//const StatusCodes = require("../utils/statusCodes")
const {Otp, User, Categories,SubCategories,Fee,Classification,ClassificationFees} = require("../sequelize/models" );
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

    console.log('--- Incoming Payment Request ---');
    console.log('User ID:', userId);
    console.log('Request Body:', req.body);

    // Step 1: Check if an existing transaction exists
    const existingTransaction = await UserService.findTransactionByUserAndForm(req);

    const orderId = Date.now();

    const lineItems = [
      {
        lineItemsId: "itemid1",
        beneficiaryName: "Alozie Michael",
        beneficiaryAccount: "6020067886",
        bankCode: "058",
        beneficiaryAmount: `${Number(statutoryFees)}`,
        deductFeeFrom: "1"
      },
      {
        lineItemsId: "itemid2",
        beneficiaryName: "Folivi Joshua",
        beneficiaryAccount: "0360883515",
        bankCode: "058",
        beneficiaryAmount: `${Number(incidentalFees)}`,
        deductFeeFrom: "0"
      }
    ];

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

    console.log('--- Remita Payload ---');
    console.log(JSON.stringify(payload, null, 2));

    const response = await axios.post(REMITA_BASE_URL, payload, { headers });

    console.log('--- Raw Response from Remita ---');
    console.log('Response Data:', response.data);

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

    if (!rrr) {
      console.error('❌ Remita did not return an RRR:', data);
      return res.status(502).json({ error: 'Failed to get RRR from Remita', data });
    }

    const transactionData = {
      user_id: userId,
      form_id,
      form_name,
      rrr,
      billerName: "Remita Payment Gateway",
      payerName,
      payerEmail,
      statutoryFees,
      incidentalFees,
      totalFees: totalAmount,
      orderId,
      transactionDate: new Date()
    };

    let transaction;
    if (existingTransaction) {
      console.log('Updating existing transaction:', existingTransaction.id);
      transaction = await AdminService.updateTransaction(existingTransaction.id, transactionData);
    } else {
      console.log('Creating new transaction');
      transaction = await AdminService.createTransaction(transactionData);
    }

    console.log('✅ Saved transaction:', transaction);
    return res.json({ ...data, orderId });

  } catch (error) {
    console.error('❌ Error processing Remita payment:', error); // full error log
    return res.status(500).json({
      error: 'Payment creation failed',
      details: error.message,
      remitaError: error.response?.data || null
    });
  }
};

exports.makeSinglePayment = async (req, res) => {
  try {
    const {
      serviceTypeId = REMITA_SERVICE_TYPE_ID,
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

    // Step 1: Check if a transaction already exists for this user + form
    const existingTransaction = await UserService.findTransactionByUserAndForm(req);

    // Step 2: Generate a new RRR regardless
    const orderId = Date.now();

    const hashData = REMITA_MERCHANT_ID + REMITA_SERVICE_TYPE_ID + orderId + Number(amount) + REMITA_API_KEY;
    const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `remitaConsumerKey=${REMITA_CONSUMER_KEY},remitaConsumerToken=${apiHash}`
    };

    const payload = {
      serviceTypeId,
      amount,
      orderId,
      payerName,
      payerEmail,
      payerPhone,
      description,
      responseUrl: RESPONSE_URL,
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

    const transactionData = {
      user_id: userId,
      form_id,
      form_name,
      rrr,
      billerName: "Remita Payment Gateway",
      payerName,
      payerEmail,
      statutoryFees: 0,
      totalFees: amount,
      orderId,
      transactionDate: new Date()
    };

    let transaction;
    if (existingTransaction) {
      // Update existing record with new RRR and payment info
      transaction = await AdminService.updateTransaction(existingTransaction.id, transactionData);
    } else {
      // Create a new transaction if none exists
      transaction = await AdminService.createTransaction(transactionData);
    }

    console.log('Saved transaction:', transaction);

    res.json({ ...data, orderId });

  } catch (error) {
    console.error('Error processing Remita payment:', error);
    res.status(500).json({ error: 'Payment creation failed', details: error.message });
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

    const url = `https://demo.remita.net/remita/exapp/api/v1/send/api/echannelsvc/${REMITA_MERCHANT_ID}/${rrr}/${apiHash}/status.reg`;

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

// exports.checkTransactionStatusBank = async (req, res) => {
//   try {
//     const userId = req.user?.id || null;
//     const formId = req.body?.form_id || null;

//     if (!userId || !formId) {
//       return res.status(400).json({ error: "Missing required parameters: user ID or form ID" });
//     }

//     // Step 1: Find the transaction
//     const transaction = await UserService.findTransactionByUserAndForm(req);

//     if (!transaction || !transaction.rrr) {
//       return res.status(404).json({ error: "No transaction found with a valid RRR" });
//     }

//     const rrr = transaction.rrr;

//     // Step 2: Prepare hash and request URL
//     const hashData = rrr + REMITA_API_KEY + REMITA_MERCHANT_ID;
//     const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

//     const url = `https://demo.remita.net/remita/exapp/api/v1/send/api/echannelsvc/${REMITA_MERCHANT_ID}/${rrr}/${apiHash}/status.reg`;

//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `remitaConsumerKey=${REMITA_MERCHANT_ID},remitaConsumerToken=${apiHash}`
//     };

//     // Step 3: Send request to Remita
//     const response = await axios.get(url, { headers });

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

//     // ✅ Pull status code directly from the correct structure
//     const statusCode = data?.status || '';
//     const paymentSuccessCodes = ['00', '01']; // 00: success, 01: paid but pending remittance

//     console.log('Remita status code:', statusCode);

//     let updatesPerformed = false;

//     if (paymentSuccessCodes.includes(statusCode)) {
//       await AdminService.updateTransaction(transaction.id, { status: 'completed' });
//       const formName = transaction.form_name;
//       try {
//         await FormsService.updatePaymentStatus(transaction.form_name, transaction.form_id, 'paid');
//       } catch (err) {
//         console.error(`❌ Failed to update payment status for form ${formName}:`, err);
//       }

//       updatesPerformed = true;
//       console.log(`✅ Payment confirmed. Transaction and form updated for user ${transaction.user_id}`);
//     }

//     return res.json({
//       message: 'Transaction status retrieved successfully',
//       rrr,
//       paymentConfirmed: updatesPerformed,
//       statusResponse: data
//     });

//   } catch (error) {
//     console.error('❌ Error checking transaction status:', error);
//     return res.status(500).json({
//       error: 'Failed to check transaction status',
//       details: error.message
//     });
//   }
// };

// exports.checkTransactionStatusBank = async (req, res) => {
//   try {
//     const userId = req.user?.id || null;
//     const formId = req.body?.form_id || null;

//     if (!userId || !formId) {
//       return res.status(400).json({ error: "Missing required parameters: user ID or form ID" });
//     }

//     // Step 1: Find the transaction
//     const transaction = await UserService.findTransactionByUserAndForm(req);

//     if (!transaction || !transaction.rrr) {
//       return res.status(404).json({ error: "No transaction found with a valid RRR" });
//     }

//     const rrr = transaction.rrr;

//     // Step 2: Prepare hash and request URL
//     const hashData = rrr + REMITA_API_KEY + REMITA_MERCHANT_ID;
//     const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

//     const url = `https://demo.remita.net/remita/exapp/api/v1/send/api/echannelsvc/${REMITA_MERCHANT_ID}/${rrr}/${apiHash}/status.reg`;

//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `remitaConsumerKey=${REMITA_MERCHANT_ID},remitaConsumerToken=${apiHash}`
//     };

//     // Step 3: Query Remita
//     const response = await axios.get(url, { headers });

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

//     const statusCode = data?.status || '';
//     const paymentSuccessCodes = ['00', '01']; // success codes
    
//     console.log('Remita status code:', statusCode);

//     return res.json({
//       message: 'Transaction status retrieved successfully',
//       rrr,
//       paymentConfirmed: paymentSuccessCodes.includes(statusCode),
//       statusResponse: data
//     });

//   } catch (error) {
//     console.error('❌ Error checking transaction status:', error);
//     return res.status(500).json({
//       error: 'Failed to check transaction status',
//       details: error.message
//     });
//   }
// };

exports.checkTransactionStatusBank = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const formId = req.body?.form_id || null;

    if (!userId || !formId) {
      return res.status(400).json({ error: "Missing required parameters: user ID or form ID" });
    }

    // Step 1: Find the transaction
    const transaction = await UserService.findTransactionByUserAndForm(req);

    if (!transaction || !transaction.rrr) {
      return res.status(404).json({ error: "No transaction found with a valid RRR" });
    }

    const rrr = transaction.rrr;

    // Step 2: Prepare hash and request URL
    const hashData = rrr + REMITA_API_KEY + REMITA_MERCHANT_ID;
    const apiHash = crypto.createHash('sha512').update(hashData).digest('hex');

    const url = `https://demo.remita.net/remita/exapp/api/v1/send/api/echannelsvc/${REMITA_MERCHANT_ID}/${rrr}/${apiHash}/status.reg`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `remitaConsumerKey=${REMITA_MERCHANT_ID},remitaConsumerToken=${apiHash}`
    };

    // Step 3: Query Remita
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

    const statusCode = data?.status || '';
    const paymentSuccessCodes = ['00', '01']; // success codes

    console.log('Remita status code:', statusCode);

    // Step 4: Update transaction and form status if payment is successful
    if (paymentSuccessCodes.includes(statusCode)) {
      await AdminService.updateTransaction(transaction.id, { status: 'completed' });
      await FormsService.updatePaymentStatus(transaction.form_id, 'paid');
      await FormsService.updateDraftStatus(transaction.form_id, false);

      console.log(`✅ Payment confirmed. Transaction and form updated for user ${transaction.user_id}`);
    }

    return res.json({
      message: 'Transaction status retrieved and form updated successfully',
      rrr,
      paymentConfirmed: paymentSuccessCodes.includes(statusCode),
      statusResponse: data
    });

  } catch (error) {
    console.error('❌ Error checking transaction status:', error);
    return res.status(500).json({
      error: 'Failed to check transaction status',
      details: error.message
    });
  }
};

exports.handleNotification = async (req, res) => {
  try {
    const data = req.body;

    console.log("Remita Notification Received:", data);

    const notification = Array.isArray(data) ? data[0] : data;

    const {
      rrr,
      orderId,
      amount,
      payerName,
      payerPhoneNumber,
      payerEmail,
      serviceTypeId,
      paymentDescription,
      transactiondate,
      chargeFee,
      customFieldData,
      type
    } = notification;

    const statusCode = notification.statuscode || notification.status; // Check both

    let newStatus = 'pending';

    if (statusCode === '00') {
      newStatus = 'completed';
    } else if (['01', '021', '022', '023', '030', '999'].includes(statusCode)) {
      newStatus = 'failed';
    } else {
      newStatus = 'pending';
    }

    // Save or update transaction
    await AdminService.updateTransaction({
      rrr,
      orderId,
      amount,
      payerName,
      payerPhoneNumber,
      payerEmail,
      status: newStatus,
      confirmedAt: newStatus === 'completed' ? new Date() : null,
      rawData: data
    });

    // Remita expects 200 OK
    res.status(200).json({ message: 'Notification received successfully' });

  } catch (error) {
    console.error("Error handling Remita webhook:", error);
    res.status(500).json({ error: 'Failed to process notification' });
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

// exports.getAllUserForms = async (req,res) => {
// const userId = req?.user?.id;
// if(!userId){
//   return res.status(400).json({message:"action not allowed you need to log in as a user"})
// }
//   try {
//    const results = await Promise.all([
//                  FormsRepo.findByUserIdAuthorizationApproved(userId,{
//                     include:[
//                       {
//                         model: Classification,
//                         as: "classification",
//                         attributes: ["id", "classification_name"],
//                         include: {
//                           model: ClassificationFees,
//                           as: "classificationFees", // Changed alias to match the association
//                           attributes: ["amount"],
//                         },
//                       },
//                       { model: Categories, as: 'category', attributes: ['name'] },
//                       { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                       { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                     ],       
//                   }),                            
//                 FormsRepo.findByUserIdAuthorizationManufacturer(userId,{
//                   include: [
//                     {
//                       model: Classification,
//                       as: "classification",
//                       attributes: ["id", "classification_name"],
//                       include: {
//                         model: ClassificationFees,
//                         as: "classificationFees", // Changed alias to match the association
//                         attributes: ["amount"],
//                       },
//                     },
//                     { model: Categories, as: 'category', attributes: ['name'] },
//                     { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                     { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                   ],       
//                 }),                 
//                 FormsRepo.findByUserIdTrainingAuthorization(userId,{
//                   include: [
//                     {
//                       model: Classification,
//                       as: "classification",
//                       attributes: ["id", "classification_name"],
//                       include: {
//                         model: ClassificationFees,
//                         as: "classificationFees", // Changed alias to match the association
//                         attributes: ["amount"],
//                       },
//                     },
//                     { model: Categories, as: 'category', attributes: ['name'] },
//                     { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                     { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                   ],       
//                 }),
//                 FormsRepo.findByUserIdCompetencyCertificationLiftOperator(userId,{
//                   include: [
//                     {
//                       model: Classification,
//                       as: "classification",
//                       attributes: ["id", "classification_name"],
//                       include: {
//                         model: ClassificationFees,
//                         as: "classificationFees", // Changed alias to match the association
//                         attributes: ["amount"],
//                       },
//                     },
//                     { model: Categories, as: 'category', attributes: ['name'] },
//                     { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                     { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                   ],     
//                 }),
              
//                FormsRepo.findByUserIdBoilerRegistrationRepos(userId,{
//                  include: [
//                    {
//                      model: Classification,
//                      as: "classification",
//                      attributes: ["id", "classification_name"],
//                      include: {
//                        model: ClassificationFees,
//                        as: "classificationFees", // Changed alias to match the association
//                        attributes: ["amount"],
//                      },
//                    },
//                    { model: Categories, as: 'category', attributes: ['name'] },
//                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                  ],    
//                }),
   
//                FormsRepo.findByUserIdCompetencyCertificationFormBoiler(userId,{
//                  include: [
//                    {
//                      model: Classification,
//                      as: "classification",
//                      attributes: ["id", "classification_name"],
//                      include: {
//                        model: ClassificationFees,
//                        as: "classificationFees", // Changed alias to match the association
//                        attributes: ["amount"],
//                      },
//                    },
//                    { model: Categories, as: 'category', attributes: ['name'] },
//                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                  ],     
//                }),
//               FormsRepo.findByUserIdOperatorCertificationsByUserId(userId,{
//                  include: [
//                    {
//                      model: Classification,
//                      as: "classification",
//                      attributes: ["id", "classification_name"],
//                      include: {
//                        model: ClassificationFees,
//                        as: "classificationFees", // Changed alias to match the association
//                        attributes: ["amount"],
//                      },
//                    },
//                    { model: Categories, as: 'category', attributes: ['name'] },
//                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                  ],     
//                }),
//               FormsRepo.findCompetencyCertificationLiftingByUserId(userId,{
//                  include: [
//                    {
//                      model: Classification,
//                      as: "classification",
//                      attributes: ["id", "classification_name"],
//                      include: {
//                        model: ClassificationFees,
//                        as: "classificationFees", // Changed alias to match the association
//                        attributes: ["amount"],
//                      },
//                    },
//                    { model: Categories, as: 'category', attributes: ['name'] },
//                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                  ],     
//                }),
//                FormsRepo.findCompetencyCertificationInspectionByUserId(userId,{
//                  include: [
//                    {
//                      model: Classification,
//                      as: "classification",
//                      attributes: ["id", "classification_name"],
//                      include: {
//                        model: ClassificationFees,
//                        as: "classificationFees", // Changed alias to match the association
//                        attributes: ["amount"],
//                      },
//                    },
//                    { model: Categories, as: 'category', attributes: ['name'] },
//                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                  ],     
//                }),
//                FormsRepo.findCompetencyCertificationWelderByUserId(userId,{
//                  include: [
//                    {
//                      model: Classification,
//                      as: "classification",
//                      attributes: ["id", "classification_name"],
//                      include: {
//                        model: ClassificationFees,
//                        as: "classificationFees", // Changed alias to match the association
//                        attributes: ["amount"],
//                      },
//                    },
//                    { model: Categories, as: 'category', attributes: ['name'] },
//                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                  ],     
//                }),
//                FormsRepo.findRenewalFormsByUserId(userId,{
//                  include: [
//                    {
//                      model: Classification,
//                      as: "classification",
//                      attributes: ["id", "classification_name"],
//                      include: {
//                        model: ClassificationFees,
//                        as: "classificationFees", // Changed alias to match the association
//                        attributes: ["amount"],
//                      },
//                    },
//                    { model: Categories, as: 'category', attributes: ['name'] },
//                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                  ],     
//                }),
//                FormsRepo.findByUserIdLiftingEquipmentRegistration(userId,{
//                  include: [
//                    {
//                      model: Classification,
//                      as: "classification",
//                      attributes: ["id", "classification_name"],
//                      include: {
//                        model: ClassificationFees,
//                        as: "classificationFees", // Changed alias to match the association
//                        attributes: ["amount"],
//                      },
//                    },
//                    { model: Categories, as: 'category', attributes: ['name'] },
//                    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
//                    { model: Fee, as: 'fee', attributes: ['fee_type'] },
//                  ],     
//                }),                                     
             
//          ]);
//     const allForms = results.map((forms) => forms || []);
//     console.log(allForms)
//     const flatForms = results.flat();
//     let totalAmount = 0;

//     flatForms.forEach(form => {
//       const fees = form.classification?.classificationFees;

//       if (Array.isArray(fees)) {
//         fees.forEach(fee => {
//           totalAmount += fee.amount || 0;
//         });
//       } else if (fees) {
//         totalAmount += fees.amount || 0;
//       }
//     });
//     return res.status(200).json({
//       status: true,
//       message: "User forms fetched successfully.",
//       data: {
//         forms: allForms,
//         totalAmount
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching all user forms:", error);
//     return {
//       STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
//       STATUS: false,
//       MESSAGE: "Internal server error",
//     };
//   }
// };

exports.getAllUserForms = async (req, res) => {
  const userId = req?.user?.id;
  if (!userId) {
    return res.status(400).json({
      status: false,
      message: "Action not allowed. Please log in as a user."
    });
  }

  const includes = [
    {
      model: Classification,
      as: "classification",
      attributes: ["id", "classification_name"],
      include: {
        model: ClassificationFees,
        as: "classificationFees",
        attributes: ["amount"],
      },
    },
    { model: Categories, as: 'category', attributes: ['name'] },
    { model: SubCategories, as: 'subcategory', attributes: ['name'] },
    { model: Fee, as: 'fee', attributes: ['fee_type'] },
  ];

  // Create a mapping of queries with names
  const queryMap = [
    { name: "AuthorizationApproved", query: FormsRepo.findByUserIdAuthorizationApproved(userId, { include: includes }) },
    { name: "AuthorizationManufacturer", query: FormsRepo.findByUserIdAuthorizationManufacturer(userId, { include: includes }) },
    { name: "TrainingAuthorization", query: FormsRepo.findByUserIdTrainingAuthorization(userId, { include: includes }) },
    { name: "CompetencyCertificationLiftOperator", query: FormsRepo.findByUserIdCompetencyCertificationLiftOperator(userId, { include: includes }) },
    { name: "BoilerRegistrationRepos", query: FormsRepo.findByUserIdBoilerRegistrationRepos(userId, { include: includes }) },
    { name: "CompetencyCertificationFormBoiler", query: FormsRepo.findByUserIdCompetencyCertificationFormBoiler(userId, { include: includes }) },
    { name: "OperatorCertificationsByUserId", query: FormsRepo.findByUserIdOperatorCertificationsByUserId(userId, { include: includes }) },
    { name: "CompetencyCertificationLiftingByUserId", query: FormsRepo.findCompetencyCertificationLiftingByUserId(userId, { include: includes }) },
    { name: "CompetencyCertificationInspectionByUserId", query: FormsRepo.findCompetencyCertificationInspectionByUserId(userId, { include: includes }) },
    { name: "CompetencyCertificationWelderByUserId", query: FormsRepo.findCompetencyCertificationWelderByUserId(userId, { include: includes }) },
    { name: "RenewalFormsByUserId", query: FormsRepo.findRenewalFormsByUserId(userId, { include: includes }) },
    { name: "LiftingEquipmentRegistration", query: FormsRepo.findByUserIdLiftingEquipmentRegistration(userId, { include: includes }) },
  ];

  const queryPromises = queryMap.map(q => q.query);

  console.time("DB Queries");

  try {
    const results = await Promise.allSettled(queryPromises);

    console.timeEnd("DB Queries");

    // Log results for each query
    results.forEach((result, index) => {
      const name = queryMap[index].name;
      if (result.status === 'rejected') {
        console.error(`❌ Query "${name}" failed:`, result.reason);
      } else {
        console.log(`✅ Query "${name}" succeeded with ${result.value.length} items.`);
      }
    });

    // Collect only successful results
    const successfulResults = results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);

    const flatForms = successfulResults.flat().filter(Boolean);

    // Calculate total amount
    let totalAmount = 0;
    flatForms.forEach(form => {
      const fees = form.classification?.classificationFees;
      if (Array.isArray(fees)) {
        fees.forEach(fee => totalAmount += fee.amount || 0);
      } else if (fees) {
        totalAmount += fees.amount || 0;
      }
    });

    return res.status(200).json({
      status: true,
      message: "User forms fetched successfully.",
      data: {
        forms: successfulResults,
        totalAmount
      }
    });
  } catch (error) {
    console.error("Unexpected error while processing user forms:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
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
