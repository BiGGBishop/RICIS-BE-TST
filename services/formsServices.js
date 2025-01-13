const FormsRepo = require("../repositories/formsRepo");
const UserRepo = require("../repositories/userRepo");
const AdminRepo = require("../repositories/adminRepo");
const StatusCodes = require("../utils/statusCodes");
const { uploadMultiple, uploadSingleFile } = require('../utils/cloudinary');

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
    companyQualityManual: await  uploadSingleFile(req.files.companyQualityManual[0])|| null,
    operationalProcedures: await uploadSingleFile(req.files.operationalProcedures[0]) || null,
    companyDocumentation: await uploadSingleFile(req.files.companyDocumentation[0]) || null,
    documentationSupervisor: await uploadSingleFile(req.files.documentationSupervisor[0]) || null,
    isoCertification: await uploadSingleFile(req.files.isoCertification[0]) || null,
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
    isoCertification: await uploadSingleFile(isoCertification) || null,
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


exports.createAuthorizationTraining = async (req) => {
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

  const data = {
    userId: userId,
    date_received: req.body.date_received,
    authorized_inspector: req.body.authorized_inspector,
    design_engineer: req.body.design_engineer,
    power_engineer: req.body.power_engineer,
    welding_engineer: req.body.welding_engineer,
    refrigerator_engineer: req.body.refrigerator_engineer,
    boiler_and_pressure_vessel_operator: req.body.boiler_and_pressure_vessel_operator,
    pressure_welder: req.body.pressure_welder,
    refrigeration_technician: req.body.refrigeration_technician,
    approved_person: req.body.approved_person,
    lift_technician: req.body.lift_technician,
    crane_operator: req.body.crane_operator,
    forklift_operator: req.body.forklift_operator,
    work_equipment_operator: req.body.work_equipment_operator,
    rigger: req.body.rigger,
    scaffolding_technician: req.body.scaffolding_technician,
    abseiling_technician: req.body.abseiling_technician,
    new_application: req.body.new_application,
    re_application: req.body.re_application,
    available_for_documentation_review: req.body.available_for_documentation_review,
    exemption_request: req.body.exemption_request,
    company_name: req.body.company_name,
    physical_address: req.body.physical_address,
    year_of_commencing_business: req.body.year_of_commencing_business,
    number_of_employee: req.body.number_of_employee,
    member_nagobin: req.body.member_nagobin,
    member_leia: req.body.member_leia,
    member_indt: req.body.member_indt,
    member_other_bodies: req.body.member_other_bodies,
    quality_certification: req.body.quality_certification,
    competence_category: req.body.competence_category,
    competence_line: req.body.competence_line,
    incidental_line: req.body.incidental_line,
    contact_person: req.body.contact_person,
    telephone: req.body.telephone,
    email_address: req.body.email_address,
    technical_supervisor_name: req.body.technical_supervisor_name,
    technical_supervisor_address: req.body.technical_supervisor_address,
    technical_supervisor_email: req.body.technical_supervisor_email,
    technical_supervisor_date_of_birth: req.body.technical_supervisor_date_of_birth,
    technical_supervisor_phonenumber: req.body.technical_supervisor_phonenumber,
    high_school: req.body.high_school,
    polytechnic: req.body.polytechnic,
    university: req.body.university,
    professional_qualification: req.body.professional_qualification,
    professional_qualification_institution: req.body.professional_qualification_institution,
    experience: req.body.experience,
    name_of_user: req.body.name_of_user,
    company_responsible_charge: req.body.company_responsible_charge,
    date_sign: req.body.date_sign,
    approval_category: req.body.approval_category,
    approval_class: req.body.approval_class,
    training_approval_number_ngtan: req.body.training_approval_number_ngtan,
    director_of_factories: req.body.director_of_factories,
    date_sign_director_of_factories: req.body.date_sign_director_of_factories,
    documents_uploaded: await uploadMultiple(req.files.documents_uploaded),
    is_draft: req.body.is_draft,
  };

  const newTrainingAuthorization = await FormsRepo.createTrainingAuthorization(data);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Training authorization created successfully.",
    DATA: newTrainingAuthorization,
  };
};

exports.getAllAuthorizationTraining = async () => {
    const allAuthorizations = await FormsRepo.findAllTrainingAuthorization();
  
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Authorizations fetched successfully.",
      DATA: allAuthorizations,
    };
  };

  exports.getAuthorizationTrainingByUserId = async (userId) => {
    return FormsRepo.findByUserIdTrainingAuthorization(userId);
  };

  
  exports.createBoilerRegistration = async (req) => {
    const userId = req?.user?.id;
    const userExist = await UserRepo.findUser({ id: userId });
  
    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "User not authenticated.",
      };
    }
  
    try {
      const data = {
        ...req.body,
        user_id: userId,
      };
      const newRegistration = await FormsRepo.createBoilerRegistrationRepo(data);
      return {
        STATUS_CODE: StatusCodes.CREATED,
        STATUS: true,
        MESSAGE: "Boiler registration created successfully.",
        DATA: newRegistration,
      };
    } catch (error) {
      console.error("Error in createBoilerRegistration service:", error);
      return {
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Failed to create boiler registration.",
      };
    }
  };
  
  exports.getAllBoilerRegistrations = async () => {
    try {
      const allRegistrations = await FormsRepo.findAllBoilerRegistrationRepos();
      return {
        STATUS_CODE: StatusCodes.OK,
        STATUS: true,
        MESSAGE: "Boiler registrations fetched successfully.",
        DATA: allRegistrations,
      };
    } catch (error) {
      console.error("Error in getAllBoilerRegistrations service:", error);
      return {
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Failed to fetch boiler registrations.",
      };
    }
  };
  
  
  exports.getBoilerRegistrationsByUserId = async (userId) => {
      try {
        const registrations = await FormsRepo.findBoilerRegistrationReposByUserId(userId);
        return {
          STATUS_CODE: StatusCodes.OK,
          STATUS: true,
          MESSAGE: "Boiler registrations fetched successfully.",
          DATA: registrations,
        };
      } catch (error) {
        console.error("Error in getBoilerRegistrationsByUserId service:", error);
        return {
          STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
          STATUS: false,
          MESSAGE: "Failed to fetch boiler registrations by user ID.",
        };
      }
    };


    //competency
    exports.createCompetencyForm = async (req) => {
      const userId = req?.user?.id;
      const userExist = await UserRepo.findUser({
        id: userId,
      });
  
      if (!userExist) {
        return {
          STATUS_CODE: StatusCodes.UNAUTHORIZED,
          STATUS: false,
          MESSAGE: "User not authenticated.",
        };
      }
  
      const data = {
          ...req.body,
          userId: userId
      };
  
      const newCompetencyForm = await FormsRepo.createCompetencyForm(data);
  
      return {
          STATUS_CODE: StatusCodes.CREATED,
          STATUS: true,
          MESSAGE: "Competency form created successfully.",
          DATA: newCompetencyForm,
      };
  };
  
  exports.getAllCompetencyForms = async () => {
      const allCompetencyForms = await FormsRepo.findAllCompetencyForms();
  
      return {
          STATUS_CODE: StatusCodes.OK,
          STATUS: true,
          MESSAGE: "Competency forms fetched successfully.",
          DATA: allCompetencyForms,
      };
  };
  
  exports.getCompetencyFormByUserId = async (userId) => {
      const competencyForms = await FormsRepo.findCompetencyFormByUserId(userId);
      return {
          STATUS_CODE: StatusCodes.OK,
          STATUS: true,
          MESSAGE: "Competency forms fetched successfully.",
          DATA: competencyForms,
      };
  };
  
  exports.getCompetencyFormById = async (id) => {
    const competencyForm = await FormsRepo.findCompetencyFormById(id);
    if (!competencyForm) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Competency form not found.",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency form fetched successfully.",
      DATA: competencyForm,
    };
  };
  
  exports.updateCompetencyForm = async (req, id) => {
    const userId = req?.user?.id;
    const userExist = await UserRepo.findUser({
      id: userId,
    });
  
    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "User not authenticated.",
      };
    }
    const updatedCompetencyForm = await FormsRepo.updateCompetencyForm(id, req.body);
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency form updated successfully.",
      DATA: updatedCompetencyForm,
    };
  };
  
  exports.deleteCompetencyForm = async (id) => {
    const deletedCompetencyForm = await FormsRepo.deleteCompetencyForm(id);
    if (deletedCompetencyForm === 0) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Competency form not found.",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency form deleted successfully.",
    };
  };
  
   
// New functions for RenewalForm
exports.createRenewalForm = async (req) => {
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

  const data = {
    userId: userId,
    date_received: req.body.date_received,
    form_number: req.body.form_number,
    form_type: req.body.form_type,
    equipment_registration: req.body.equipment_registration,
    certificate_of_competence: req.body.certificate_of_competence,
    certificate_of_authorization: req.body.certificate_of_authorization,
    documentation_available: req.body.documentation_available,
    exemption_requested: req.body.exemption_requested,
    company_name: req.body.company_name,
    company_address: req.body.company_address,
    company_cac_registration_number: req.body.company_cac_registration_number,
    year_of_commencement: req.body.year_of_commencement,
    number_of_employees: req.body.number_of_employees,
    nagobin_membership: req.body.nagobin_membership,
    leia_membership: req.body.leia_membership,
    other_memberships: req.body.other_memberships,
    quality_certifications: req.body.quality_certifications,
    previous_authorization_certificate_number:
      req.body.previous_authorization_certificate_number,
    previous_authorization_date_of_issue:
      req.body.previous_authorization_date_of_issue,
    previous_authorization_expiry_date:
      req.body.previous_authorization_expiry_date,
    renewal_reason: req.body.renewal_reason,
    competence_category: req.body.competence_category,
    competence_line_number: req.body.competence_line_number,
    incidental_line_number: req.body.incidental_line_number,
    contact_person_name: req.body.contact_person_name,
    contact_person_email: req.body.contact_person_email,
    contact_person_phone: req.body.contact_person_phone,
    responsible_charge_name: req.body.responsible_charge_name,
    declaration_date: req.body.declaration_date,
    approval_category: req.body.approval_category,
    approval_class: req.body.approval_class,
    contractor_number: req.body.contractor_number,
    director_of_factories: req.body.director_of_factories,
    director_signature_date: req.body.director_signature_date,
    uploaded_documents: await uploadMultiple(req.files.uploaded_documents),
    is_draft: req.body.is_draft,
  };

  try {
    const newRenewalForm = await FormsRepo.createRenewalForm(data);
    return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Renewal form successfully created.",
      DATA: newRenewalForm,
    };
  } catch (error) {
    console.error("Error creating renewal form:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error creating renewal form",
    };
  }
};

exports.getAllRenewalForms = async () => {
  try {
    const allRenewalForms = await FormsRepo.findAllRenewalForms();
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Renewal forms fetched successfully.",
      DATA: allRenewalForms,
    };
  } catch (error) {
    console.error("Error fetching renewal forms:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error fetching renewal forms",
    };
  }
};

exports.getRenewalFormByUserId = async (userId) => {
  try {
    const renewalForms = await FormsRepo.findRenewalFormByUserId(userId);
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Renewal forms fetched successfully.",
      DATA: renewalForms,
    };
  } catch (error) {
    console.error("Error fetching renewal forms by user ID:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error fetching renewal forms by user ID",
    };
  }
};