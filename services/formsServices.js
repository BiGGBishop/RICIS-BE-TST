const FormsRepo = require("../repositories/formsRepo");
const UserRepo = require("../repositories/userRepo");
const AdminRepo = require("../repositories/adminRepo");
const StatusCodes = require("../utils/statusCodes");

exports.createAuthorizationApproved = async (req) => {
  const userId = req?.user?.id
  const userExist = await UserRepo.findUser({
    id: req.user?.id,
  });
  
  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  // Step 3: Save the AuthorizationApproved record
  const data = {
    user_id: userId,
    categoryId: req.body.categoryId || null,
    subcategoryId: req.body.subcategoryId || null,
    classificationId: req.body.classificationId || null,
    incidentalClassificationId: req.body.incidentalClassificationId || null,
    paymentStatus: req.body.paymentStatus || "unpaid",
    appStatus: req.body.appStatus || "pending",
    boilerServiceClassification: req.body.boilerServiceClassification || null,
    typeOfService: req.body.typeOfService || null,
    liftingServiceClassification: req.body.liftingServiceClassification || null,
    applicationType: req.body.applicationType || null,
    certificationReview: req.body.certificationReview || false,
    exemption: req.body.exemption || false,
    companyName: req.body.companyName || null,
    companyAddress: req.body.companyAddress || null,
    companyCAC: req.body.companyCAC || null,
    companyYear: req.body.companyYear || null,
    companyEmployee: req.body.companyEmployee || null,
    companyMembership: req.body.companyMembership || null,
    companyQuality: req.body.companyQuality || null,
    companyCompetence: req.body.companyCompetence || null,
    companyCompetenceLine: req.body.companyCompetenceLine || null,
    companyIncidentalLine: req.body.companyIncidentalLine || null,
    companyContactPerson: req.body.companyContactPerson || null,
    companyTelephone: req.body.companyTelephone || null,
    companyEmail: req.body.companyEmail || null,
    nagobinDocument: req.body.nagobinDocument || false,
    companyMembershipLeia: req.body.companyMembershipLeia || false,
    leiaDocument: req.body.leiaDocument || null,
    managerName: req.body.managerName || null,
    managerAddress: req.body.managerAddress || null,
    managerDOB: req.body.managerDOB || null,
    managerEmail: req.body.managerEmail || null,
    managerTelephone: req.body.managerTelephone || null,
    nameSchool: req.body.nameSchool || null,
    dateAdmitted: req.body.dateAdmitted || null,
    dateCompleted: req.body.dateCompleted || null,
    qualification: req.body.qualification || null,
    institution: req.body.institution || null,
    dateIssue: req.body.dateIssue || null,
    expirationDate: req.body.expirationDate || null,
    nameCompany: req.body.nameCompany || null,
    joinDate: req.body.joinDate || null,
    existDate: req.body.existDate || null,
    inspectorName: req.body.inspectorName || null,
    inspectorAddress: req.body.inspectorAddress || null,
    inspectorDOB: req.body.inspectorDOB || null,
    inspectorEmail: req.body.inspectorEmail || null,
    inspectorTelephone: req.body.inspectorTelephone || null,
    professionalInstitution: req.body.professionalInstitution || null,
    professionalDOI: req.body.professionalDOI || null,
    professionalExpireDate: req.body.professionalExpireDate || null,
    experienceCompanyName: req.body.experienceCompanyName || null,
    experienceJoinDate: req.body.experienceJoinDate || null,
    experienceExistDate: req.body.experienceExistDate || null,
    companyResponsibleCharge: req.body.companyResponsibleCharge || null,
    companyResponsibleChargeDate: req.body.companyResponsibleChargeDate || null,
    companyQualityManuel: req.body.companyQualityManuel || null,
    operationalProcedures: req.body.operationalProcedures || null,
    companyDocumentation: req.body.companyDocumentation || null,
    documentationSupervisor: req.body.documentationSupervisor || null,
    isoCertification: req.body.isoCertification || null,
    feeId: req.body.feeId || null,
    status: req.body.status || "pending",
  };

  console.log(data)

  const newAuthorizationSubmit = await FormsRepo.create(data);
  console.log("new submit",newAuthorizationSubmit)

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Authorization successfully created.",
    DATA: newAuthorizationSubmit,
  };
};

exports.getAllAuthorizationApproved = async () => {
  const allAuthorizations = await FormsRepo.findAll();

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Authorizations fetched successfully.",
    DATA: allAuthorizations,
  };
};

exports.getAClassifications = async (classId, userId) => {
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

  if (role?.name == "user") {
    const filter = {
      id: classId, // Use classId to filter by classification ID
      restricted: { [Op.ne]: true }, // Add other conditions as needed
    };

    const user = await AdminRepo.fetchAClassification(filter);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  }

  if (role.name == "admin" || role.name == "staff") {
    const filter = { id: classId };  // Again, use classId to filter by classification ID
    const user = await AdminRepo.fetchAClassification(filter);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  }
};

exports.createAuthorizationManufacturer = async (req) => {
  const userId = req?.user?.id;

  if (!userId) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const user = await UserRepo.findUser({ id: userId });

  if (!user) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not found.",
    };
  }

  const role = await UserRepo.findRole({ id: user.userroleId });

  if (!role) {
    return {
      STATUS_CODE: StatusCodes.FORBIDDEN,
      STATUS: false,
      MESSAGE: "Role not found. Access denied.",
    };
  }

  if (role.name !== "user") {
    return {
      STATUS_CODE: StatusCodes.FORBIDDEN,
      STATUS: false,
      MESSAGE: "Access denied. This action is restricted to users.",
    };
  }

  const {
    categoryId,
    subcategoryId,
    classificationId,
    incidentalClassificationId,
    paymentStatus,
    appStatus,
    boilerServiceClassification,
    typeService,
    liftingServiceClassification,
    applicationType,
    certificationReview,
    exemption,
    companyName,
    companyAddress,
    companyCac,
    companyYear,
    companyEmployee,
    companyMembership,
    companyQuality,
    companyCompetence,
    companyCompetenceLine,
    companyIncidentalLine,
    companyContactPerson,
    companyTelephone,
    companyEmail,
    companyMembershipNagobin,
    companyMembershipLeia,
    managerName,
    managerAddress,
    managerDob,
    managerEmail,
    managerTelephone,
    nameSchool,
    dateAdmitted,
    dateCompleted,
    qualification,
    institution,
    dateIssue,
    expirationDate,
    nameCompany,
    joinDate,
    existDate,
    inspectorName,
    inspectorAddress,
    inspectorDob,
    inspectorEmail,
    inspectorTelephone,
    professionalInstitution,
    professionalDoi,
    professionalExpireDate,
    experienceCompanyName,
    experienceJoinDate,
    experienceExistDate,
    companyResponsibleCharge,
    companyResponsibleChargeDate,
    companyQualityManual,
    operationalProcedures,
    companyDocumentation,
    documentationQuality,
    designerDocumentation,
    weldingDocumentation,
    ndtDocumentation,
    indtDocumentation,
    isoCertification,
    feeId,
    status,
  } = req.body;

  const data = {
    user_id: userId,
    categoryId: categoryId || null,
    subcategoryId: subcategoryId || null,
    classificationId: classificationId || null,
    incidentalClassificationId: incidentalClassificationId || null,
    paymentStatus: paymentStatus || "unpaid",
    appStatus: appStatus || "pending",
    boilerServiceClassification: boilerServiceClassification || null,
    typeService: typeService || null,
    liftingServiceClassification: liftingServiceClassification || null,
    applicationType: applicationType || null,
    certificationReview: certificationReview || false,
    exemption: exemption || false,
    companyName: companyName || null,
    companyAddress: companyAddress || null,
    companyCac: companyCac || null,
    companyYear: companyYear || null,
    companyEmployee: companyEmployee || null,
    companyMembership: companyMembership || null,
    companyQuality: companyQuality || null,
    companyCompetence: companyCompetence || null,
    companyCompetenceLine: companyCompetenceLine || null,
    companyIncidentalLine: companyIncidentalLine || null,
    companyContactPerson: companyContactPerson || null,
    companyTelephone: companyTelephone || null,
    companyEmail: companyEmail || null,
    companyMembershipNagobin: companyMembershipNagobin || false,
    companyMembershipLeia: companyMembershipLeia || false,
    managerName: managerName || null,
    managerAddress: managerAddress || null,
    managerDob: managerDob || null,
    managerEmail: managerEmail || null,
    managerTelephone: managerTelephone || null,
    nameSchool: nameSchool || null,
    dateAdmitted: dateAdmitted || null,
    dateCompleted: dateCompleted || null,
    qualification: qualification || null,
    institution: institution || null,
    dateIssue: dateIssue || null,
    expirationDate: expirationDate || null,
    nameCompany: nameCompany || null,
    joinDate: joinDate || null,
    existDate: existDate || null,
    inspectorName: inspectorName || null,
    inspectorAddress: inspectorAddress || null,
    inspectorDob: inspectorDob || null,
    inspectorEmail: inspectorEmail || null,
    inspectorTelephone: inspectorTelephone || null,
    professionalInstitution: professionalInstitution || null,
    professionalDoi: professionalDoi || null,
    professionalExpireDate: professionalExpireDate || null,
    experienceCompanyName: experienceCompanyName || null,
    experienceJoinDate: experienceJoinDate || null,
    experienceExistDate: experienceExistDate || null,
    companyResponsibleCharge: companyResponsibleCharge || null,
    companyResponsibleChargeDate: companyResponsibleChargeDate || null,
    companyQualityManual: companyQualityManual || null,
    operationalProcedures: operationalProcedures || null,
    companyDocumentation: companyDocumentation || null,
    documentationQuality: documentationQuality || null,
    designerDocumentation: designerDocumentation || null,
    weldingDocumentation: weldingDocumentation || null,
    ndtDocumentation: ndtDocumentation || null,
    indtDocumentation: indtDocumentation || null,
    isoCertification: isoCertification || null,
    feeId: feeId || null,
    status: status || "pending",
  };

  const newAuthorizationManufacturer = await FormsRepo.createAuthorizationManufacturer(data);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Authorization successfully created.",
    DATA: newAuthorizationManufacturer,
  };
};

exports.getAllAuthorizationManufacturer = async () => {
  const allAuthorizations = await FormsRepo.findAllAuthorizationManufacturer();

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Authorizations fetched successfully.",
    DATA: allAuthorizations,
  };
};

exports.getAuthorizationManufacturerByUserId = async (userId) => {
  return FormsRepo.findByUserIdAuthorizationManufacturer(userId);
};