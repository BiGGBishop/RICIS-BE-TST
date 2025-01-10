const FormsRepo = require("../repositories/formsRepo");
const UserRepo = require("../repositories/userRepo");
const AdminRepo = require("../repositories/adminRepo");
const StatusCodes = require("../utils/statusCodes");

exports.createAuthorizationApproved = async (req) => {
  const userId = req?.user?.id;
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

  const newAuthorizationSubmit = await FormsRepo.create(data);

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
  const user = req?.user?.id;

  // Step 1: Validate user existence
  if (!user) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  // Step 2: Check the role of the user
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

  // Step 3: Save the AuthorizationApproved record
  const data = {
    user,
        categoryId: application.categoryId || null,
        subcategoryId: application.subcategoryId || null,
        classificationId: application.classificationId || null,
        incidentalClassificationId: application.incidentalClassificationId || null,
        paymentStatus: application.paymentStatus || "unpaid",
        appStatus: application.appStatus || "pending",
        boilerServiceClassification: application.boilerServiceClassification || null,
        typeService: application.typeService || null,
        liftingServiceClassification: application.liftingServiceClassification || null,
        applicationType: application.applicationType || null,
        certificationReview: application.certificationReview || false,
        exemption: application.exemption || false,
        companyName: application.companyName || null,
        companyAddress: application.companyAddress || null,
        companyCac: application.companyCac || null,
        companyYear: application.companyYear || null,
        companyEmployee: application.companyEmployee || null,
        companyMembership: application.companyMembership || null,
        companyQuality: application.companyQuality || null,
        companyCompetence: application.companyCompetence || null,
        companyCompetenceLine: application.companyCompetenceLine || null,
        companyIncidentalLine: application.companyIncidentalLine || null,
        companyContactPerson: application.companyContactPerson || null,
        companyTelephone: application.companyTelephone || null,
        companyEmail: application.companyEmail || null,
        companyMembershipNagobin: application.companyMembershipNagobin || false,
        companyMembershipLeia: application.companyMembershipLeia || false,
        managerName: application.managerName || null,
        managerAddress: application.managerAddress || null,
        managerDob: application.managerDob || null,
        managerEmail: application.managerEmail || null,
        managerTelephone: application.managerTelephone || null,
        nameSchool: application.nameSchool || null,
        dateAdmitted: application.dateAdmitted || null,
        dateCompleted: application.dateCompleted || null,
        qualification: application.qualification || null,
        institution: application.institution || null,
        dateIssue: application.dateIssue || null,
        expirationDate: application.expirationDate || null,
        nameCompany: application.nameCompany || null,
        joinDate: application.joinDate || null,
        existDate: application.existDate || null,
        inspectorName: application.inspectorName || null,
        inspectorAddress: application.inspectorAddress || null,
        inspectorDob: application.inspectorDob || null,
        inspectorEmail: application.inspectorEmail || null,
        inspectorTelephone: application.inspectorTelephone || null,
        professionalInstitution: application.professionalInstitution || null,
        professionalDoi: application.professionalDoi || null,
        professionalExpireDate: application.professionalExpireDate || null,
        experienceCompanyName: application.experienceCompanyName || null,
        experienceJoinDate: application.experienceJoinDate || null,
        experienceExistDate: application.experienceExistDate || null,
        companyResponsibleCharge: application.companyResponsibleCharge || null,
        companyResponsibleChargeDate: application.companyResponsibleChargeDate || null,
        companyQualityManual: application.companyQualityManual || null,
        operationalProcedures: application.operationalProcedures || null,
        companyDocumentation: application.companyDocumentation || null,
        documentationQuality: application.documentationQuality || null,
        designerDocumentation: application.designerDocumentation || null,
        weldingDocumentation: application.weldingDocumentation || null,
        ndtDocumentation: application.ndtDocumentation || null,
        indtDocumentation: application.indtDocumentation || null,
        isoCertification: application.isoCertification || null,
        feeId: application.feeId || null,
        status: application.status || "pending",
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