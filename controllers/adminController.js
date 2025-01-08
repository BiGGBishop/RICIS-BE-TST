const AdminService = require("../services/adminServices");
const UserService = require("../services/userServices");



exports.getAdminDetails = async (req, res) => {
  const data = await AdminService.getAdminDetails(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.fetchStaffs = async (req, res) => {
  const data = await AdminService.fetchStaffs(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.fetchStaff = async (req, res) => {
  const data = await AdminService.fetchStaff(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.deleteStaff = async (req, res) => {
  const data = await AdminService.deleteStaff(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.actionOnStaff = async (req, res) => {
  const data = await AdminService.actionOnStaff(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.fetchAllUsers = async (req, res) => {
  const data = await UserService.getUsers(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.fetchUser = async (req, res) => {
  const data = await UserService.getUser(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.addClassification = async (req, res) => {
  const data = await AdminService.addClassification(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getClassifications = async (req, res) => {
  const data = await AdminService.getClassifications(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getClassificationMerge = async (req, res) => {
  const data = await AdminService.getClassificationMerge(req, res);
  
  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getClassificationsNoIncidental = async (req, res) => {
  const data = await AdminService.getClassificationsNoIncidental(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getClassificationsYesIncidental = async (req, res) => {
  const data = await AdminService.getClassificationsYesIncidental(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.updateClassifications = async (req, res) => {
  const data = await AdminService.updateClassifications(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.deleteClassifications = async (req, res) => {
  const data = await AdminService.deleteClassifications(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.restrictClassifications = async (req, res) => {
  const data = await AdminService.restrictClassifications(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.addClassificationMerge = async (req, res) => {
  const data = await AdminService.addClassificationMerge(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.updateClassificationMerge = async (req, res) => {
  const data = await AdminService.updateClassificationMerge(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.deleteClassificationMerge = async (req, res) => {
  const data = await AdminService.deleteClassificationMerge(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.updateClassificationMerge = async (req, res) => {
  const data = await AdminService.updateClassificationMerge(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.deleteClassificationMerge = async (req, res) => {
  const data = await AdminService.deleteClassificationMerge(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getAllApplications = async (req, res) => {
  const data = await AdminService.getAllApplications(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getSingleApplication = async (req, res) => {
  const data = await AdminService.getSingleApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.actionOnApplication = async (req, res) => {
  const data = await AdminService.actionOnApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.filterApplication = async (req, res) => {
  const data = await AdminService.filterApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.addMsgToApplication = async (req, res) => {
  const data = await AdminService.addMsgToApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.addFees = async (req, res) => {
  const data = await AdminService.addFees(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.fetchFees = async (req, res) => {
  const data = await AdminService.fetchFees(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.updateFees = async (req, res) => {
  const data = await AdminService.updateFees(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.deleteFee = async (req, res) => {
  const data = await AdminService.deleteFee(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getClassificationWithIncidental = async (req, res) => {
  const data = await AdminService.getClassificationWithIncidental(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};