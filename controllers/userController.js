const UserService = require("../services/userServices");
const axios = require('axios');

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
