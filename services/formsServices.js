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
    ...req.body,
    user_id: userId,
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
  const allAuthorizations = await FormsRepo.findAllAuthorizationApproved();

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Authorizations fetched successfully.",
    DATA: allAuthorizations,
  }; 
};


exports.updateAuthorizationApproved = async (req, id) => {
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

  try {
    const updatedAuthorization = await FormsRepo.updateAuthorizationApproved(
      id,
      req.body
    );

    if (!updatedAuthorization) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Authorization not found.",
      };
    }

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Authorization successfully updated.",
      DATA: updatedAuthorization,
    };
  } catch (error) {
    console.error("Error updating authorization:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to update authorization.",
    };
  }
};

exports.getAuthorizationApprovedById = async (id) => {
  try {
    const authorization = await FormsRepo.findAuthorizationApprovedById(id);
    if (!authorization) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Authorization not found.",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Authorization fetched successfully.",
      DATA: authorization,
    };
  } catch (error) {
    console.error("Error in getAuthorizationApprovedById service:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to fetch authorization.",
    };
  }
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
  const data = {
    ...req.body,
    user_id: userId,
  }

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


exports.getAuthorizationManufacturerById = async (id) => {
  try {
    const authorization = await FormsRepo.findAuthorizationManufacturerById(id);
    if (!authorization) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Authorization not found.",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      
      STATUS: true,
      MESSAGE: "Authorization fetched successfully.",
      DATA: authorization,
    };
  } catch (error) {
    console.error("Error in getAuthorizationApprovedById service:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to fetch authorization.",
    };
  }
};

exports.updateAuthorizationManufacturer = async (req, id) => {
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

  try {
    const updatedAuthorizationManufacturer = await FormsRepo.updateAuthorizationManufacturer(
      id,
      req.body
    );

    if (!updatedAuthorizationManufacturer) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Authorization not found.",
      };
    }

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Authorization successfully updated.",
      DATA: updatedAuthorizationManufacturer,
    };
  } catch (error) {
    console.error("Error updating authorization:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to update authorization.",
    };
  }
};

exports.getAuthorizationManufacturerByUserId = async (userId) => {
  return FormsRepo.findByUserIdAuthorizationManufacturer(userId);
};


exports.createTrainingAuthorization = async (req) => {
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
    ...req.body,
    user_id: userId,
  }

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



exports.updateAuthorizationTraining= async (req, id) => {
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

  try {
    const updatedAuthorizationTraining = await FormsRepo.updateAuthorizationTraining(
      id,
      req.body
    );

    if (!updatedAuthorizationTraining) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Authorization not found.",
      };
    }

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Authorization successfully updated.",
      DATA: updatedAuthorizationTraining,
    };
  } catch (error) {
    console.error("Error updating authorization:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to update authorization.",
    };
  }
};


exports.getAuthorizationTrainingById = async (id) => {
  try {
    const authorization = await FormsRepo.findTrainingAuthorizationById(id);
    if (!authorization) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Authorization training record not found.",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Authorization training record fetched successfully.",
      DATA: authorization,
    };
  } catch (error) {
    console.error("Error in getAuthorizationTrainingById service:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to fetch authorization training record.",
    };
  }
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


 exports.createCompetencyFormLiftOperator = async (req) => {
  console.log("working..")
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

      const newCompetencyForm = await FormsRepo.createCompetencyCertificationLiftOperator(data);
  
      return {
          STATUS_CODE: StatusCodes.CREATED,
          STATUS: true,
          MESSAGE: "Competency form created successfully.",
          DATA: newCompetencyForm,
      };
  };
  
  exports.getAllCompetencyCertificationLiftOperator = async () => {
      const allCompetencyCertificationLiftOperator = await FormsRepo.findAllCompetencyCertificationLiftOperator();
  
      return {
          STATUS_CODE: StatusCodes.OK,
          STATUS: true,
          MESSAGE: "Competency forms fetched successfully.",
          DATA: allCompetencyCertificationLiftOperator,
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
    uploaded_documents: await uploadMultiple(req.body.uploaded_documents),
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


// New functions for OperatorCertification
exports.createOperatorCertification = async (req) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

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
      certification_type: req.body.certification_type,
      certification_class: req.body.certification_class,
      application_type: req.body.application_type,
      documentation_available: req.body.documentation_available,
      exemption_requested: req.body.exemption_requested,
      training_start_date: req.body.training_start_date,
      training_completion_date: req.body.training_completion_date,
      training_method: req.body.training_method,
      training_organization_name: req.body.training_organization_name,
      training_organization_registration_number: req.body.training_organization_registration_number,
      training_organization_location: req.body.training_organization_location,
      training_organization_quality_certifications: req.body.training_organization_quality_certifications,
      training_organization_contact_person: req.body.training_organization_contact_person,
      training_organization_contact_email: req.body.training_organization_contact_email,
      training_organization_contact_phone: req.body.training_organization_contact_phone,
      employer_name: req.body.employer_name,
      employer_address: req.body.employer_address,
      employer_quality_certifications: req.body.employer_quality_certifications,
      employer_contact_person: req.body.employer_contact_person,
      employer_contact_phone: req.body.employer_contact_phone,
      employer_contact_email: req.body.employer_contact_email,
      applicant_name: req.body.applicant_name,
      applicant_address: req.body.applicant_address,
      applicant_date_of_birth: req.body.applicant_date_of_birth,
      applicant_email: req.body.applicant_email,
      applicant_phone: req.body.applicant_phone,
      competence_category: req.body.competence_category,
      competence_line_number: req.body.competence_line_number,
      incidental_line_number: req.body.incidental_line_number,
      education_details: req.body.education_details,
      professional_qualifications: req.body.professional_qualifications,
      experience_details: req.body.experience_details,
      applicant_declaration_name: req.body.applicant_declaration_name,
      applicant_declaration_date: req.body.applicant_declaration_date,
      responsible_charge: req.body.responsible_charge,
      declaration_date: req.body.declaration_date,
      exam_registration_number: req.body.exam_registration_number,
      certification_class_accepted: req.body.certification_class_accepted,
      director_of_factories: req.body.director_of_factories,
      director_signature_date: req.body.director_signature_date,
      uploaded_documents: req.body.uploaded_documents,
      is_draft: req.body.is_draft || false,
  };

  const newCertification = await FormsRepo.createOperatorCertification(data);

  return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Operator certification created successfully.",
      DATA: newCertification,
  };
};

exports.getAllOperatorCertifications = async () => {
  const certifications = await FormsRepo.findAllOperatorCertifications();
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Operator certifications fetched successfully.",
      DATA: certifications,
  };
};

exports.getOperatorCertificationsByUserId = async (userId) => {
  const certifications = await FormsRepo.findOperatorCertificationsByUserId(userId);
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Operator certifications fetched successfully.",
      DATA: certifications,
  };
};

exports.getOperatorCertificationById = async (id) => {
  const certification = await FormsRepo.findOperatorCertificationById(id);
  if (!certification) {
      return {
          STATUS_CODE: StatusCodes.NOT_FOUND,
          STATUS: false,
          MESSAGE: "Operator certification not found.",
      };
  }
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Operator certification fetched successfully.",
      DATA: certification,
  };
};


exports.createCompetencyCertificationLifting = async (req) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

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
      approved_lift_installer: req.body.approved_lift_installer,
      work_equipment_operator: req.body.work_equipment_operator,
      rigger_signaler: req.body.rigger_signaler,
      scaffolding_technician: req.body.scaffolding_technician,
      abseiling_technician: req.body.abseiling_technician,
      class_a: req.body.class_a,
      class_b: req.body.class_b,
      class_1: req.body.class_1,
      class_2: req.body.class_2,
      application_type: req.body.application_type,
      training_start_date: req.body.training_start_date,
      training_completion_date: req.body.training_completion_date,
      documentation_available: req.body.documentation_available,
      exemption_requested: req.body.exemption_requested,
      employer_name: req.body.employer_name,
      employer_address: req.body.employer_address,
      employer_quality_certifications: req.body.employer_quality_certifications,
      employer_contact_person: req.body.employer_contact_person,
      employer_contact_phone: req.body.employer_contact_phone,
      employer_contact_email: req.body.employer_contact_email,
      training_organization_name: req.body.training_organization_name,
      training_method: req.body.training_method,
      training_organization_registration_number: req.body.training_organization_registration_number,
      training_organization_location: req.body.training_organization_location,
      training_organization_quality_certifications: req.body.training_organization_quality_certifications,
      training_organization_contact_person: req.body.training_organization_contact_person,
      training_organization_contact_email: req.body.training_organization_contact_email,
      training_organization_contact_phone: req.body.training_organization_contact_phone,
      applicant_name: req.body.applicant_name,
      applicant_address: req.body.applicant_address,
      applicant_date_of_birth: req.body.applicant_date_of_birth,
      applicant_email: req.body.applicant_email,
      applicant_phone: req.body.applicant_phone,
      competence_category: req.body.competence_category,
      competence_line_number: req.body.competence_line_number,
      incidental_line_number: req.body.incidental_line_number,
      high_school: req.body.high_school,
      polytechnic: req.body.polytechnic,
      university: req.body.university,
      professional_qualifications: req.body.professional_qualifications,
      experience_details: req.body.experience_details,
      applicant_declaration_name: req.body.applicant_declaration_name,
      applicant_declaration_date: req.body.applicant_declaration_date,
      responsible_charge: req.body.responsible_charge,
      declaration_date: req.body.declaration_date,
      exam_registration_number: req.body.exam_registration_number,
      certification_class_accepted: req.body.certification_class_accepted,
      director_of_factories: req.body.director_of_factories,
      director_signature_date: req.body.director_signature_date,
      uploaded_documents: req.body.uploaded_documents,
      is_draft: req.body.is_draft || false,
  };

  const newCertification = await FormsRepo.createCompetencyCertificationLifting(data);

  return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Competency certification lifting created successfully.",
      DATA: newCertification,
  };
};

exports.getAllCompetencyCertificationLiftings = async () => {
  const certifications = await FormsRepo.findAllCompetencyCertificationLifting();
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certifications lifting fetched successfully.",
      DATA: certifications,
  };
};

exports.getCompetencyCertificationLiftingByUserId = async (userId) => {
  const certifications = await FormsRepo.findCompetencyCertificationLiftingByUserId(userId);
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certifications lifting fetched successfully.",
      DATA: certifications,
  };
};

exports.getCompetencyCertificationLiftingById = async (id) => {
  const certification = await FormsRepo.findCompetencyCertificationLiftingById(id);
  if (!certification) {
      return {
          STATUS_CODE: StatusCodes.NOT_FOUND,
          STATUS: false,
          MESSAGE: "Competency certification lifting not found.",
      };
  }
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certification lifting fetched successfully.",
      DATA: certification,
  };
};



exports.createCompetencyCertificationInspection = async (req) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

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
    certification_type: req.body.certification_type,
    certification_class: req.body.certification_class,
    endorsement: req.body.endorsement,
    application_type: req.body.application_type,
    training_start_date: req.body.training_start_date,
    training_completion_date: req.body.training_completion_date,
    documentation_available: req.body.documentation_available,
    exemption_requested: req.body.exemption_requested,
    employer_name: req.body.employer_name,
    employer_physical_address: req.body.employer_physical_address,
    employer_authorization_number: req.body.employer_authorization_number,
    employer_quality_certifications: req.body.employer_quality_certifications,
    employer_contact_person: req.body.employer_contact_person,
    employer_contact_telephone: req.body.employer_contact_telephone,
    employer_contact_email_address: req.body.employer_contact_email_address,
    training_organization_name: req.body.training_organization_name,
    training_method: req.body.training_method,
    training_organization_registration_number: req.body.training_organization_registration_number,
    training_facility_location: req.body.training_facility_location,
    training_organization_quality_certifications: req.body.training_organization_quality_certifications,
    training_organization_contact_person: req.body.training_organization_contact_person,
    training_organization_telephone: req.body.training_organization_telephone,
    training_organization_email: req.body.training_organization_email,
    applicant_name: req.body.applicant_name,
    applicant_address: req.body.applicant_address,
    applicant_date_of_birth: req.body.applicant_date_of_birth,
    applicant_email_address: req.body.applicant_email_address,
    applicant_telephone_number: req.body.applicant_telephone_number,
    competence_category: req.body.competence_category,
    competence_line_number: req.body.competence_line_number,
    incidental_line_number: req.body.incidental_line_number,
    high_school: req.body.high_school,
    polytechnic: req.body.polytechnic,
    university: req.body.university,
    professional_qualification: req.body.professional_qualification,
    experience: req.body.experience,
    applicant_declaration_name: req.body.applicant_declaration_name,
    applicant_declaration_date: req.body.applicant_declaration_date,
    employer_responsible_charge_name: req.body.employer_responsible_charge_name,
    employer_responsible_charge_date: req.body.employer_responsible_charge_date,
    exam_registration_number: req.body.exam_registration_number,
    director_of_factories: req.body.director_of_factories,
    director_signature_date: req.body.director_signature_date,
    uploaded_documents: req.body.uploaded_documents,
    is_draft: req.body.is_draft || false,
  };

  const newCertification = await FormsRepo.createCompetencyCertificationInspection(data);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Authorized inspector certification created successfully.",
    DATA: newCertification,
  };
};

exports.getCompetencyCertificationInspection = async (userId) => {
  const certifications = await FormsRepo.findCompetencyCertificationInspectionByUserId(userId);
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certifications lifting fetched successfully.",
      DATA: certifications,
  };
};

exports.getAllCompetencyCertificationInspection = async () => {
  const certifications = await FormsRepo.findAllCompetencyCertificationInspection();
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "certifications fetched successfully.",
      DATA: certifications,
  };
};




exports.createCompetencyCertificationWelder = async (req) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

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
    form_type: req.body.form_type,
    class_mw: req.body.class_mw,
    class_sw: req.body.class_sw,
    new_application: req.body.new_application,
    re_application: req.body.re_application,
    training_start_date: req.body.training_start_date,
    training_completion_date: req.body.training_completion_date,
    documentation_available_for_review: req.body.documentation_available_for_review,
    exemption_requested: req.body.exemption_requested,
    employer_name: req.body.employer_name,
    employer_physical_address: req.body.employer_physical_address,
    employer_authorization_number: req.body.employer_authorization_number,
    employer_quality_certifications: req.body.employer_quality_certifications,
    employer_contact_person: req.body.employer_contact_person,
    employer_contact_telephone: req.body.employer_contact_telephone,
    employer_contact_email_address: req.body.employer_contact_email_address,
    training_organization_name: req.body.training_organization_name,
    training_method: req.body.training_method,
    training_organization_reg_number: req.body.training_organization_reg_number,
    training_facility_location: req.body.training_facility_location,
    training_organization_quality_certifications: req.body.training_organization_quality_certifications,
    training_organization_contact_person: req.body.training_organization_contact_person,
    training_organization_telephone: req.body.training_organization_telephone,
    training_organization_email: req.body.training_organization_email,
    applicant_name: req.body.applicant_name,
    applicant_address: req.body.applicant_address,
    applicant_date_of_birth: req.body.applicant_date_of_birth,
    applicant_email_address: req.body.applicant_email_address,
    applicant_telephone_number: req.body.applicant_telephone_number,
    competence_category: req.body.competence_category,
    competence_line_number: req.body.competence_line_number,
    incidental_line_number: req.body.incidental_line_number,
    high_school: req.body.high_school,
    polytechnic: req.body.polytechnic,
    university: req.body.university,
    professional_qualification: req.body.professional_qualification,
    experience: req.body.experience,
    applicant_declaration_name: req.body.applicant_declaration_name,
    applicant_declaration_date: req.body.applicant_declaration_date,
    employer_responsible_charge: req.body.employer_responsible_charge,
    employer_responsible_charge_date: req.body.employer_responsible_charge_date,
    exam_registration_number: req.body.exam_registration_number,
    certification_class_accepted: req.body.certification_class_accepted,
    director_of_factories: req.body.director_of_factories,
    director_signature_date: req.body.director_signature_date,
    uploaded_documents: req.body.uploaded_documents,
    is_draft: req.body.is_draft || false,
  };

  const newCertification = await FormsRepo.createCompetencyCertificationWelder(data);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Competency certification welder created successfully.",
    DATA: newCertification,
  };
};

exports.getCompetencyCertificationWelderByUserId= async (userId) => {
  const certifications = await FormsRepo.findCompetencyCertificationWelderByUserId(userId);
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certifications lifting fetched successfully.",
      DATA: certifications,
  };
};

exports.getAllCompetencyCertificationWelder = async () => {
  const certifications = await FormsRepo.findAllCompetencyCertificationWelder();
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "certifications fetched successfully.",
      DATA: certifications,
  };
};


  
//lifiting registration
exports.createLiftingEquipmentRegistration = async (req) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

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
    type_of_installation: req.body.type_of_installation,
    type_of_facility: req.body.type_of_facility,
    object_use: req.body.object_use,
    object_use_other: req.body.object_use_other,
    installation_type: req.body.installation_type,
    installation_start_date: req.body.installation_start_date,
    installation_completion_date: req.body.installation_completion_date,
    data_reports_available: req.body.data_reports_available,
    variance_requested: req.body.variance_requested,
    installer_name: req.body.installer_name,
    installer_address: req.body.installer_address,
    installer_authorization_number: req.body.installer_authorization_number,
    installer_quality_certifications: req.body.installer_quality_certifications,
    installer_contact_person: req.body.installer_contact_person,
    installer_contact_telephone: req.body.installer_contact_telephone,
    installer_contact_email: req.body.installer_contact_email,
    owner_name: req.body.owner_name,
    nature_of_facility: req.body.nature_of_facility,
    factory_registration_number: req.body.factory_registration_number,
    owner_location: req.body.owner_location,
    owner_quality_certifications: req.body.owner_quality_certifications,
    owner_contact_person: req.body.owner_contact_person,
    owner_contact_telephone: req.body.owner_contact_telephone,
    owner_contact_email: req.body.owner_contact_email,
    manufacturer: req.body.manufacturer,
    manufacture_year_and_place: req.body.manufacture_year_and_place,
    code_of_construction: req.body.code_of_construction,
    intended_use: req.body.intended_use,
    equipment_condition: req.body.equipment_condition,
    inspection_agency: req.body.inspection_agency,
    inspection_authorization_number: req.body.inspection_authorization_number,
    date_of_test: req.body.date_of_test,
    tested_capacity: req.body.tested_capacity,
    design_capacity: req.body.design_capacity,
    swl: req.body.swl,
    equipment_type: req.body.equipment_type,
    equipment_distinctive_number: req.body.equipment_distinctive_number,
    operating_environment: req.body.operating_environment,
    equipment_category: req.body.equipment_category,
    equipment_sub_category: req.body.equipment_sub_category,
    equipment_classification: req.body.equipment_classification,
    equipment_line_number: req.body.equipment_line_number,
    equipment_incidental_number: req.body.equipment_incidental_number,
    equipment_owner: req.body.equipment_owner,
    responsible_charge_name: req.body.responsible_charge_name,
    declaration_date: req.body.declaration_date,
    application_category: req.body.application_category,
    registered_number: req.body.registered_number,
    director_of_factories: req.body.director_of_factories,
    director_signature_date: req.body.director_signature_date,
    uploaded_documents: req.body.uploaded_documents,
    is_draft: req.body.is_draft || false,
  };

  const newRegistration = await FormsRepo.createLiftingEquipmentRegistration(data);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Lifting equipment registration created successfully.",
    DATA: newRegistration,
  };
};


exports.getLiftingEquipmentRegistrationByUserId = async (userId) => {
  const registrations = await FormsRepo.findLiftingEquipmentRegistrationByUserId(userId);
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Lifting equipment registrations fetched successfully.",
      DATA: registrations,
  };
};

exports.getAllLiftingEquipmentRegistration = async () => {
  const registrations = await FormsRepo.findAllLiftingEquipmentRegistration();
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Lifting equipment registrations fetched successfully.",
      DATA: registrations,
  };
};


exports.createReport = async (req) => {
  const userId = req?.user?.id
  const userExist = await UserRepo.findUser({
    id: req.user?.id,
  });
  
  if (!userExist) {
    console.log("working")
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }
  const data = {
    ...req.body,
    user_id: userId, // Or any other relevant data
  };
  const newReport = await FormsRepo.createReport(data);
  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Report created successfully.",
    DATA: newReport,
  };
};

exports.getAllReports = async () => {
  return FormsRepo.findAllReports();
};

exports.getReportByUserId = async (userId) => {
  try {
    const reports = await FormsRepo.findReportByUserId(userId);
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Reports fetched successfully.",
      DATA: reports,
    };
  } catch (error) {
    console.error("Error in getReportByUserId service:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to fetch reports by user ID.",
    };
  }
};

exports.getReportId = async (req)=> {
  const {id} = req.params
  try {
    const reports = await FormsRepo.findReportById(id);
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Reports fetched successfully.",
      DATA: reports,
    };
  } catch (error) {
    console.error("Error in getReportById service:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to fetch reports by user ID.",
    };
  }
};

 
exports.updateReport = async (req) => {
  const adminExist = await AdminRepo.findAdminUser({
    id: req.user?.id,
  });

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.FORBIDDEN,
      STATUS: false,
      MESSAGE: "Access denied, admin only",
    };
  }

  const { id } = req.params;
  const update = req.body;

  try {
    const updatedReport = await FormsRepo.updateReport(id, update);
    if (!updatedReport) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Report not found",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Report updated successfully",
      DATA: updatedReport,
    };
  } catch (error) {
    console.error("Error updating report:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to update report",
    };
  }
};

exports.deleteReport = async (id) => {
  return FormsRepo.deleteReport(id);
};