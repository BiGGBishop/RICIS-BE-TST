const AdminRepo = require("../repositories/adminRepo");
const FormsRepo = require("../repositories/formsRepo");
const UserRepo = require("../repositories/userRepo");
const StatusCodes = require("../utils/statusCodes");
const { Op } = require("sequelize");
const { Classification,ClassificationFees,Fee, ClassificationMerge,Categories,SubCategories,Users } = require('../sequelize/models');
const transactionRepository = require('../repositories/adminRepo');

exports.getAdminDetails = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({ email: req.user?.email });

  const filter = {
    email: req.user?.email
  };

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });
  // console.log({ userExistRole: role });

  if (role?.name != "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      DATA: "Invalid Cred, strictly for admins and staffs",
    };
  
  }

    console.log("staff admin");

    let user = await AdminRepo.findAdminUser(filter);

    // Convert the instance to a plain object
    user = user.get({ plain: true });
    // remove the password field
    delete user.password;
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
};

exports.fetchStaffs = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, admin only",
    };
  }

  const roleToExclude = 1;

  const filter = {
    userroleId: { [Op.ne]: roleToExclude },
  };

  const fetchStaffs = await AdminRepo.findAdminUsers(filter);

  // Remove the password field from each user after the query
  // Manually remove the password field after querying
  const sanitizedUsers = fetchStaffs.map((user) => {
    const { password, ...sanitizedUser } = user.get({ plain: true }); // .get() to retrieve plain object
    const reg = password == "passowrd checked and removed";
    console.log(reg);

    return sanitizedUser;
  });

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: sanitizedUsers,
  };
};

exports.fetchStaff = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials.",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin" && role?.name !== "staff") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, admin or staff only",
    };
  }

  const roleToExclude = 1;

  const filter = {
    id: req.params.staffId,
    userroleId: { [Op.ne]: roleToExclude },
  };

  const fetchStaff = await AdminRepo.findAdminUser(filter);

  if (fetchStaff) {
    console.log({ fetchStaff });
    // Convert the instance to a plain object
    const user = fetchStaff?.get({ plain: true });
    // remove the password field
    delete user.password;

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  }

  return {
    STATUS_CODE: StatusCodes.BAD_REQUEST,
    STATUS: false,
    MESSAGE: "no record found",
  };
};

exports.deleteStaff = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const filter = {
    id: req.params.staffId,
  };

  const staffExist = await AdminRepo.findAdminUser({
    id: req.params.staffId,
  });

  if (!staffExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Staff does not exist, Record not found",
    };
  }

  const fetchStaff = await AdminRepo.deleteStaff(filter);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Staff deleted successfully",
    DATA: fetchStaff,
  };
};

exports.actionOnStaff = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Admin Record not found",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const staffExist = await AdminRepo.findAdminUser({
    id: req.params.staffId,
  });

  if (!staffExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Staff does not exist, Record not found",
    };
  }

  staffExist.user_status = req.body.status;
  const staff = await staffExist.save();

  // Convert the instance to a plain object
  const user = staff?.get({ plain: true });
  // remove the password field
  delete user.password;

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: `Staff status set to ${req.body.status} successfully`,
    DATA: user,
  };
};

exports.addClassification = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  // console.log({ body: req.body });

  const classObject = {
    categoryId: req.body.category,
    subcategoryId: req.body.sub_category,
    classification_name: req.body.classification_name,
    classification_number: req.body.classification_number,
    has_incidental: req.body.has_incidental,
    form_type: req.body.form_type || null,
    // fees: req.body.application_fees,
  };

  const classification = await AdminRepo.addClassification(classObject);

  // Insert into ClassificationFees for each fee in application_fees
  const feeEntries = req.body.fees.map((fee) => ({
    classificationId: classification.id, // Use the created classification's ID
    feeId: fee.feeId,
    amount: fee.amount,
  }));

  // Use bulk create for ClassificationFees entries
  await AdminRepo.addClassificationFees(feeEntries);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: classification,
  };
};

exports.addClassificationMerge = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }


  const classObject = {
    classificationId: req.body.classificationId,
    incidentalClassificationIds: req.body.incidentalClassificationIds,
  };

  
  const classificationMerge = await AdminRepo.addClassificationMerge(classObject);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: classificationMerge,
  };
};

exports.getClassifications = async (req) => {
  const userOrAdminExist =
    (await UserRepo.findUser({ id: req.user?.id })) ||
    (await AdminRepo.findAdminUser({ id: req.user?.id }));

  if (!userOrAdminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: userOrAdminExist?.userroleId });
  console.log({ userExist: role });

  if (role?.name == "user") {
    const filter = {
      restricted: { [Op.ne]: true },
    };

    const user = await AdminRepo.fetchClassifications(filter);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  }

  if (role.name == "admin" || role.name == "staff") {
    const filter = {};
    const user = await AdminRepo.fetchClassifications(filter);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  }
};

exports.getAClassifications = async (classificationNumber, userId) => {
  const userOrAdminExist =
    (await UserRepo.findUser({ id: userId })) ||
    (await AdminRepo.findAdminUser({ id: userId }));

  if (!userOrAdminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: userOrAdminExist?.userroleId });
  console.log({ userExist: role });

  // Filter based on the role of the user
  const filter = { classification_number: classificationNumber }; // Use classification_number as the filter
  if (role?.name === "user") {
    filter.restricted = { [Op.ne]: true }; // Add condition for restricted classifications
  }

  const classification = await AdminRepo.fetchAClassification(filter);

  if (!classification) {
    return {
      STATUS_CODE: StatusCodes.NOT_FOUND,
      STATUS: false,
      MESSAGE: "Classification not found",
    };
  }

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: classification,
  };
};

exports.getClassificationMerge = async (req) => {
  const userOrAdminExist =
    (await UserRepo.findUser({ id: req.user?.id })) ||
    (await AdminRepo.findAdminUser({ id: req.user?.id }));

  if (!userOrAdminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const response = await AdminRepo.fetchClassificationMerge();

  return response;
};

exports.getClassificationsNoIncidental = async (req) => {
  const userOrAdminExist =
    (await UserRepo.findUser({ id: req.user?.id })) ||
    (await AdminRepo.findAdminUser({ id: req.user?.id }));
    console.log(userOrAdminExist)

  if (!userOrAdminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: userOrAdminExist?.userroleId });
  console.log({ userExist: role });

  if (role?.name == "user") {
    const filter = {
      restricted: { [Op.ne]: true },
      has_incidental: false,
    };

    const user = await AdminRepo.fetchClassificationsNoIncidental(filter);
    console.log(user)

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  }

  if (role.name == "admin" || role.name == "staff") {
    const filter = {
      has_incidental: false,
    };
    const user = await AdminRepo.fetchClassificationsNoIncidental(filter);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  }
};

exports.getClassificationsYesIncidental = async (req) => {
  const userOrAdminExist =
    (await UserRepo.findUser({ id: req.user?.id })) ||
    (await AdminRepo.findAdminUser({ id: req.user?.id }));

  if (!userOrAdminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: userOrAdminExist?.userroleId });
  console.log({ userExist: role });

  if (role?.name == "user") {
    const filter = {
      restricted: { [Op.ne]: true },
      has_incidental: true,
    };

    const user = await AdminRepo.fetchClassificationsYesIncidental(filter);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  }

  if (role.name == "admin" || role.name == "staff") {
    const filter = {
      has_incidental: true,
    };
    const user = await AdminRepo.fetchClassificationsYesIncidental(filter);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  }
};

exports.updateClassifications = async (req) => {
  const update = {
    categoryId: req.body.category,
    subcategoryId: req.body.sub_category,
    classification_name: req.body.classification_name,
    classification_number: req.body.classification_number,
    has_incidental: req.body.has_incidental,
    form_type: req.body.form_type,
  };

  const classificationId = req.params.classId;

  const filter = {
    id: classificationId,
  };

  const classExist = await AdminRepo.fetchAClassification(filter);
  // console.log({ classExist})

  if (!classExist) {
    // from the flow users would have verified their email first, and at thie verification and  acoount is created though without a password
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "no record",
    };
  }

  await AdminRepo.findAndUpdateClassification(filter, update);
  // const updated = await AdminRepo.fetchAClassification(filter);

  // Process the fees data
  const newFeeEntries = req.body.fees.map((fee) => ({
    classificationId,
    feeId: fee.feeId,
    amount: fee.amount,
  }));

  // Fetch existing ClassificationFees
  const existingFees = await AdminRepo.findClassificationFees({
    classificationId,
  });

  // console.log({existingFees})

  // Update existing fees, delete removed ones, and add new entries
  const existingFeeIds = existingFees?.map((f) => f.feeId);
  const newFeeIds = newFeeEntries.map((f) => f.feeId);

  // Update and delete existing fees
  for (let fee of existingFees) {
    if (newFeeIds.includes(fee.feeId)) {
      // If fee exists in both, update it
      const newFeeData = newFeeEntries.find((f) => f.feeId === fee.feeId);
      await fee.update({ amount: newFeeData.amount });
    } else {
      // If fee was removed, delete it
      await fee.destroy();
    }
  }

  // Add new fees not present in existingFees
  const feesToAdd = newFeeEntries.filter(
    (f) => !existingFeeIds.includes(f.feeId)
  );
  await AdminRepo.addClassificationFees(feesToAdd);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "updated classifications",
    // DATA: updated,
  };
};

exports.updateClassificationMerge = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const { id } = req.params; // ID of the merge record to update
  const updateData = {
    classificationId: req.body.classificationId,
    incidentalClassificationIds: req.body.incidentalClassificationIds,
  };

  try {
    const updatedMerge = await AdminRepo.updateClassificationMerge(id, updateData);

    if (!updatedMerge) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Classification merge not found",
      };
    }

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: updatedMerge,
    };
  } catch (error) {
    console.error("Error updating classification merge:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "An error occurred while updating the classification merge.",
    };
  }
};

exports.deleteClassifications = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }
  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const filter = {
    id: req.params.classId,
  };
  const classExist = await AdminRepo.fetchAClassification(filter);
  // console.log({ classExist})

  if (!classExist) {
    // from the flow users would have verified their email first, and at thie verification and  acoount is created though without a password
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "no record",
    };
  }

  await AdminRepo.deleteClassification(filter);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "classification deleted successfully",
    // DATA: classResponse,
  };
};

exports.deleteClassificationMerge = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }
  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const filter = {
    id: req.params.classId,
  };
  const classExist = await AdminRepo.fetchAClassification(filter);
  // console.log({ classExist})

  if (!classExist) {
    // from the flow users would have verified their email first, and at thie verification and  acoount is created though without a password
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "no record",
    };
  }

  await AdminRepo.deleteClassification(filter);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "classification deleted successfully",
    // DATA: classResponse,
  };
};

exports.restrictClassifications = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Admin Record not found",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const clasExist = await AdminRepo.fetchAClassification({
    id: req.params.classId,
  });

  // console.log({ clasExist})

  if (!clasExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "classification record not found",
    };
  }

  clasExist.restricted = req.body.restricted;
  await clasExist.save();

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE:
      req.body.restricted === "false"
        ? `classification restriction removed`
        : `classification restricted`,
    // DATA: user,
  };
};

exports.getAllApplications = async (req) => {
  const filter = {};
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });
  console.log({ who_role: role?.name });

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (role?.name == "admin") {
    console.log({ who: "an admin" });
    const { app, totalCount } = await UserRepo.findAllApplication(filter, page, limit);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: app,
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      page,
      limit,
    };
  }

  if (role?.name == "staff") {
    const staffFilterObj = {
      app_status: "approved",
    };
    const { app, totalCount } = await UserRepo.findAllApplication(staffFilterObj, page, limit);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: app,
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      page,
      limit,
    };
  }

  return {
    STATUS_CODE: StatusCodes.BAD_REQUEST,
    STATUS: false,
    MESSAGE: "no record found",
  };
};
// console.log({filter})

exports.getSingleApplication = async (req) => {
  const filter = {
    id: req.params.appId,
  };
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin" && role?.name !== "staff") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin and staff",
    };
  }
  // console.log({filter})
  const app = await UserRepo.findApplication(filter);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: app,
  };
};

exports.actionOnApplication = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Admin Record not found",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const appExist = await UserRepo.findApplication({
    id: req.params.appId,
  });

  if (!appExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "application reecord not found",
    };
  }

  appExist.app_status = req.body.status;
  await appExist.save();

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: `application status set to ${req.body.status} successfully`,
    // DATA: user,
  };
};

exports.filterApplication = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Admin Record not found",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  console.log({ jamse: req.params.status });

  const appExist = await UserRepo.findAllApplication({
    app_status: req.params.status,
  });

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: appExist,
  };
};

exports.addMsgToApplication = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Admin Record not found",
    };
  }

  const role = await UserRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const appExist = await UserRepo.findApplication({
    id: req.body.applicationId,
  });

  if (!appExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "application reecord not found",
    };
  }

  const msgObj = {
    applicationId: req.body.applicationId,
    adminId: req.user?.id,
    message: req.body.message,
  };
  const addMsg = await AdminRepo.addAppMsg(msgObj);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: `msg sent successfully`,
    DATA: addMsg,
  };
};

exports.addFees = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Admin Record not found",
    };
  }

  const role = await UserRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const feeExist = await AdminRepo.findFee({
    fee_type: req.body.fee_type,
  });

  if (feeExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "fee type already exist",
    };
  }

  const feeObj = {
    ...req.body
  };
  const addFee = await AdminRepo.addFee(feeObj);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: `fee added successfully`,
    DATA: addFee,
  };
};

exports.fetchFees = async (req) => {
  const userOrAdminExist =
    (await UserRepo.findUser({ id: req.user?.id })) ||
    (await AdminRepo.findAdminUser({ id: req.user?.id }));

  if (!userOrAdminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: userOrAdminExist?.userroleId });
  console.log({ userExist: role });

  const filter = {};

  const fees = await AdminRepo.findFees(filter);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: fees,
  };
};

exports.updateFees = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Admin Record not found",
    };
  }
  const role = await UserRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const id = req.params.feeId;

  const update = req.body

 

  const fees = await AdminRepo.findAndUpdateFee(update,id);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: fees,
    MESSAGE: "updated fee",
  };
};

exports.deleteFee = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid credntials",
    };
  }

  const role = await UserRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const feeId = req.params.feeId;
  const feeExist = await AdminRepo.findFee({
    id: feeId,
  });
  // console.log({feeExist})

  if (!feeExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "fee type  not found",
    };
  }

  const deletedFee = await AdminRepo.deleteFee({ id: feeId });

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: `fee deleted successfully`,
    DATA: deletedFee,
  };
};

exports.getClassificationWithIncidental = async (req, res) => {
  try {
    const { classification_number } = req.params;

    // Step 1: Fetch the classification by classification_number
    const classification = await AdminRepo.fetchAClassification({
      classification_number,
    });

    if (!classification) {
      return res.status(404).json({
        status: false,
        message: "Classification not found",
      });
    }

    // Step 2: Fetch the classification merge record
    const classificationMerge = await AdminRepo.fetchClassificationMerge({
      classificationId: classification.id,
    });

    if (!classificationMerge) {
      return res.status(404).json({
        status: false,
        message: "Classification merge not found for this classification",
      });
    }

    // Step 3: Fetch the incidental classification details
    const incidentalClassification = await AdminRepo.fetchAClassification({
      id: classificationMerge.classificationIncidentalId,
    });

    if (!incidentalClassification) {
      return res.status(404).json({
        status: false,
        message: "Incidental classification not found",
      });
    }

    // Step 4: Return both classifications
    return res.status(200).json({
      status: true,
      data: {
        classification,
        incidentalClassification,
      },
    });
  } catch (error) {
    console.error("Error fetching classification with incidental:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching classification details",
    });
  }
};


exports.getAllUsersForms = async () => {
  try {
    const users = await AdminRepo.findUsers();
    if (!users || users.length === 0) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "No users found.",
        DATA: [],
      };
    }
    const allForms = [];
    for (const user of users) {
      const userId = user.id;
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
            FormsRepo.findRenewalFormsById(userId,{
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
      const userForms = results.map((forms) => forms || []);
      console.log(userForms)
      allForms.push({ userId, forms: userForms });
    }
    // console.time()
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "All users forms fetched successfully.",
      DATA: allForms,
    };
  } catch (error) {
    console.error("Error fetching all users forms:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Internal server error",
    };
  }
}

// exports.getAllUsersForms = async () => {
//   try {
   
//     const page = 2;
//     const limit = 3 // Get pagination params from query
//     const offset = (page - 1) * limit;
    
//     // Fetch paginated users
//     const { count, rows: users } = await Users.findAndCountAll({
//       limit: limit,
//       offset: offset,

//     })
//     if (!users || users.length === 0) {
//       return {
//         STATUS_CODE: StatusCodes.NOT_FOUND,
//         STATUS: false,
//         MESSAGE: "No users found.",
//         DATA: [],
//       };
//     }

//     const allForms = await Promise.all(
//       users.map(async (user) => {
//         const userId = user.id;
//         const formQueries = [
//           FormsRepo.findByUserIdAuthorizationApproved,
//           FormsRepo.findByUserIdAuthorizationManufacturer,
//           FormsRepo.findByUserIdTrainingAuthorization,
//           FormsRepo.findByUserIdCompetencyCertificationLiftOperator,
//           FormsRepo.findByUserIdBoilerRegistrationRepos,
//           FormsRepo.findByUserIdCompetencyCertificationFormBoiler,
//           FormsRepo.findByUserIdOperatorCertificationsByUserId,
//           FormsRepo.findCompetencyCertificationLiftingByUserId,
//           FormsRepo.findCompetencyCertificationInspectionByUserId,
//           FormsRepo.findCompetencyCertificationWelderByUserId,
//           FormsRepo.findRenewalFormsById,
//           FormsRepo.findByUserIdLiftingEquipmentRegistration,
//         ];

//         const includeOptions = {
//           include: [
//             {
//               model: Classification,
//               as: "classification",
//               attributes: ["id", "classification_name"],
//               include: {
//                 model: ClassificationFees,
//                 as: "classificationFees",
//                 attributes: ["amount"],
//               },
//             },
//             { model: Categories, as: "category", attributes: ["name"] },
//             { model: SubCategories, as: "subcategory", attributes: ["name"] },
//             { model: Fee, as: "fee", attributes: ["fee_type"] },
//           ],
//         };

//         const results = await Promise.all(
//           formQueries.map((query) => query(userId, includeOptions))
//         );
//         return { userId, forms: results.flat() };
//       })
//     );

//     return {
//       STATUS_CODE: StatusCodes.OK,
//       STATUS: true,
//       MESSAGE: "All users forms fetched successfully.",
//       DATA: allForms,
//       pagination: {
//         currentPage: Number(page),
//         totalUsers: count,
//         totalPages: Math.ceil(count / limit),
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching all users forms:", error);
//     return {
//       STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
//       STATUS: false,
//       MESSAGE: "Internal server error",
//     };
//   }
// };

// exports.getAllUsersForms = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 3;
//     const offset = (page - 1) * limit;

//     // Use findAndCountAll to fetch paginated users
//     const { count, rows: users } = await Users.findAndCountAll({
//       limit,
//       offset,
//     });

//     if (!users || users.length === 0) {
//       return res.status(404).json({
//         STATUS_CODE: StatusCodes.NOT_FOUND,
//         STATUS: false,
//         MESSAGE: "No users found.",
//         DATA: [],
//       });
//     }

//     const allForms = await Promise.all(
//       users.map(async (user) => {
//         const userId = user.id;
//         const formQueries = [
//           FormsRepo.findByUserIdAuthorizationApproved,
//           FormsRepo.findByUserIdAuthorizationManufacturer,
//           FormsRepo.findByUserIdTrainingAuthorization,
//           FormsRepo.findByUserIdCompetencyCertificationLiftOperator,
//           FormsRepo.findByUserIdBoilerRegistrationRepos,
//           FormsRepo.findByUserIdCompetencyCertificationFormBoiler,
//           FormsRepo.findByUserIdOperatorCertificationsByUserId,
//           FormsRepo.findCompetencyCertificationLiftingByUserId,
//           FormsRepo.findCompetencyCertificationInspectionByUserId,
//           FormsRepo.findCompetencyCertificationWelderByUserId,
//           FormsRepo.findRenewalFormsById,
//           FormsRepo.findByUserIdLiftingEquipmentRegistration,
//         ];

//         const includeOptions = {
//           include: [
//             {
//               model: Classification,
//               as: "classification",
//               attributes: ["id", "classification_name"],
//               include: {
//                 model: ClassificationFees,
//                 as: "classificationFees",
//                 attributes: ["amount"],
//               },
//             },
//             { model: Categories, as: "category", attributes: ["name"] },
//             { model: SubCategories, as: "subcategory", attributes: ["name"] },
//             { model: Fee, as: "fee", attributes: ["fee_type"] },
//           ],
//         };

//         const results = await Promise.all(
//           formQueries.map((query) => query(userId, includeOptions))
//         );

//         return { userId, forms: results.flat() };
//       })
//     );

//     return res.status(200).json({
//       STATUS_CODE: StatusCodes.OK,
//       STATUS: true,
//       MESSAGE: "All users forms fetched successfully.",
//       DATA: allForms,
//       pagination: {
//         currentPage: page,
//         totalUsers: count,
//         totalPages: Math.ceil(count / limit),
//         perPage: limit,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching all users forms:", error);
//     return res.status(500).json({
//       STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
//       STATUS: false,
//       MESSAGE: "Internal server error",
//     });
//   }
// };


exports.createBlog = async(req)=>{
  try {
    const userId = req.user?.id;
    const blog = await AdminRepo.createBlog(userId,req.body);
    console.log(blog);
    return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Blog created successfully.",
      DATA: blog,
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Internal server error",
    };
  }
}

exports.getStatistics = async (req, res) => {
  try {
    const totalUsers = await UserRepo.countUsers();
    const totalReports = await FormsRepo.countReports();

    const formsResponse = await exports.getAllUsersForms();
    
    let totalForms = 0;
    let totalDraft = 0;
    let totalApplications = 0;
    let approvedApplications = 0;
    let completedApplications = 0;
    
    if (formsResponse.STATUS_CODE === StatusCodes.OK && Array.isArray(formsResponse.DATA)) {
      formsResponse.DATA.forEach(userData => {
        
        userData.forms.forEach(formArray => {
          if (Array.isArray(formArray)) {
            formArray.forEach(form => {
              totalForms += 1;
              
              if (form.isDraft === true) {
                totalDraft += 1;
              } else {
                totalApplications += 1;
              }
              
              if (form.appStatus && form.appStatus.toLowerCase() === 'approved') {
                approvedApplications += 1;
              }
              
              if (form.certificate !== null && form.certificate !== undefined) {
                completedApplications += 1;
              }
            });
          }
        });
      });
    }

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Statistics fetched successfully",
      DATA: {
        totalUsers,
        totalReports,
        totalForms,
        totalDraft,
        totalApplications,
        approvedApplications,
        completedApplications,
      },
    };
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Internal server error",
      DATA: null,
    };
  }
}

exports.getApprovedApplications = async (req, res) => {
  try {
    // Call your existing function that fetches all forms for all users
    const formsResponse = await exports.getAllUsersForms();
    if (formsResponse.STATUS_CODE !== StatusCodes.OK || !Array.isArray(formsResponse.DATA)) {
      return {
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Error fetching forms data",
        DATA: null,
      };
    }

    // Filter approved applications (appStatus equals "approved")
    let approvedApplications = [];
    formsResponse.DATA.forEach(userData => {
      // userData.forms is an array of arrays from each query
      userData.forms.forEach(formArray => {
        if (Array.isArray(formArray)) {
          formArray.forEach(form => {
            if (form.appStatus && form.appStatus.toLowerCase() === 'approved') {
              approvedApplications.push(form);
            }
          });
        }
      });
    });

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Approved applications fetched successfully.",
      DATA: approvedApplications,
    };
  } catch (error) {
    console.error("Error fetching approved applications:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Internal server error",
      DATA: null,
    };
  }
};


exports.getAllTransactions = async () => {
  return await AdminRepo.getAllTransactions();
};

exports.createTransaction = async (transactionData) => {
  return await AdminRepo.createTransaction(transactionData);
};

exports.getTransactionsByUserId = async (user_id) => {
  return await AdminRepo.getTransactionsByUserId(user_id);
};