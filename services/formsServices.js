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
  let {
    companyQualityManual,
    
  } = req.body;
  companyQualityManual = companyQualityManual ? await uploadSingleFile(companyQualityManual) : null;
  console.log(companyQualityManual)
  
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
    companyQualityManual,
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
        const registrations = await FormsRepo.findByUserIdBoilerRegistrationRepos(userId);
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

    exports.getBoilerRegistrationsById = async (id) => {
      const competencyForm = await FormsRepo.findBoilerRegistrationById(id);
      if (!competencyForm) {
        return {
          STATUS_CODE: StatusCodes.NOT_FOUND,
          STATUS: false,
          MESSAGE: "boiler reigistartion form not found.",
        };
      }
      return {
        STATUS_CODE: StatusCodes.OK,
        STATUS: true,
        MESSAGE: "boiler registration form fetched successfully.",
        DATA: competencyForm,
      };
    };
    
    exports.updateBoilerregistration = async (req, id) => {
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
      const updatedCompetencyForm = await FormsRepo.updateBoilerRegistration(id, req.body);
      return {
        STATUS_CODE: StatusCodes.OK,
        STATUS: true,
        MESSAGE: "Competency form updated successfully.",
        DATA: updatedCompetencyForm,
      };
    };


    //competency from lift operator
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
  
  exports.getCompetencyCertificationLiftOperatorByUserId = async (userId) => {
      const competencyForms = await FormsRepo.findByUserIdCompetencyCertificationLiftOperator(userId);
      return {
          STATUS_CODE: StatusCodes.OK,
          STATUS: true,
          MESSAGE: "Competency forms fetched successfully.",
          DATA: competencyForms,
      };
  };
  
  exports.getCompetencyCertificationLiftOperatorFormById = async (id) => {
    const competencyForm = await FormsRepo.findCompetencyCertificationLiftFormById(id);
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
  
  exports.updateCompetencyCertificationLiftOperator = async (req, id) => {
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
    const updatedCompetencyForm = await FormsRepo.updateCompetencyCertificationLiftForm(id, req.body);
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency form updated successfully.",
      DATA: updatedCompetencyForm,
    };
  };
  
  // exports.deleteCompetencyCertificationLiftOperator= async (id) => {
  //   const deletedCompetencyForm = await FormsRepo.deleteCompetencyLiftOperator(id);
  //   if (deletedCompetencyForm === 0) {
  //     return {
  //       STATUS_CODE: StatusCodes.NOT_FOUND,
  //       STATUS: false,
  //       MESSAGE: "Competency form not found.",
  //     };
  //   }
  //   return {
  //     STATUS_CODE: StatusCodes.OK,
  //     STATUS: true,
  //     MESSAGE: "Competency form deleted successfully.",
  //   };
  // };
  
   
// New functions for RenewalForm


exports.createRenewalForm = async (req) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({
    id: req.user?.id,
  });
  let {
    company_documentation,
    supervisor_documentation,
    inspector_documentation,
    
    log_book,
    application_letter,
    personnel_leia,
    personnel_nagobin,
    company_leia,
    company_nagobin
  } = req.body;


  company_documentation = await uploadSingleFile(company_documentation);
  supervisor_documentation =  await uploadSingleFile(supervisor_documentation) ;
  inspector_documentation =  await uploadSingleFile(inspector_documentation) ;
  log_book =  await uploadSingleFile(log_book);
  application_letter =  await uploadSingleFile(application_letter) ;
  personnel_leia =  await uploadSingleFile(personnel_leia);
  personnel_nagobin = await uploadSingleFile(personnel_nagobin) ;
  company_leia = await uploadSingleFile(company_leia);
  company_nagobin = await uploadSingleFile(company_nagobin);


  

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const data = {
   
    company_documentation,
    supervisor_documentation,
    inspector_documentation,
    log_book,
    application_letter,
    personnel_leia,
    personnel_nagobin,
    company_leia,
    company_nagobin,
    user_id: userId,
    ...req.body
  }

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
    const renewalForms = await FormsRepo.findRenewalFormsByUserId(userId);
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

 exports.getRenewalFormId = async (id) => {
    const renewalForm = await FormsRepo.findRenewalFormsById(id);
    if (!renewalForm) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Renewal form not found.",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Renewal form fetched successfully.",
      DATA:renewalForm,
    };
  };


  exports.updateRenewalForm = async (req, id) => {
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
    const updatedRenewalForm = await FormsRepo.updateRenewalForms(id, req.body);
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency form updated successfully.",
      DATA: updatedRenewalForm,
    };
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
  user_id:userId,
  ...req.body
 }

  const newCertification = await FormsRepo.createOperatorCertification(data);

  return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Operator certification created successfully.",
      DATA: newCertification,
  };
};

exports.updateOperatorCertification = async (req, id) => {
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
  const updatedCompetencyForm = await FormsRepo.updateOperatorCertification(id, req.body);
  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Competency form updated successfully.",
    DATA: updatedCompetencyForm,
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
  const certifications = await FormsRepo.findByUserIdOperatorCertificationsByUserId(userId);
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

 const data ={
  user_id: userId,
  ...req.body
 }

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
exports.updateCompetencyCertificationLifting = async (req,id)=>{
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
  
  const updatedCertifications = await FormsRepo.updateCompetencyCertificationLifting(id, req.body);
  console.log(updatedCertifications)
  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Competency certifications updated successfully.",
    DATA: updatedCertifications,
};
};



//Certification Inspection



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
    user_id:userId,
    ...req.body
  }

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

exports.updateCompetencyCertificationInspection = async (req,id)=>{
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
  
  const updatedCertifications = await FormsRepo.updateCompetencyCertificationInspection(id, req.body);
  console.log(updatedCertifications)
  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Competency certifications updated successfully.",
    DATA: updatedCertifications,
};
};
exports.getCompetencyCertificationInspectionByUserId= async (userId) => {
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

//competency certification form boiler
exports.createCompetencyCertificationBoiler = async (req) => {
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
    user_id:userId,
    ...req.body
  }

  const newCertification = await FormsRepo.createCompetencyCertificationFormBoiler(data);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Competency certification Form Boiler created successfully.",
    DATA: newCertification,
  };
};

exports.getCompetencyCertificationBoiler = async (userId) => {
  const certifications = await FormsRepo.findByUserIdCompetencyCertificationFormBoiler(userId);
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certifications lifting fetched successfully.",
      DATA: certifications,
  };
};

exports.updateCompetencyCertificationBoiler = async (req,id)=>{
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
  
  const updatedCertifications = await FormsRepo.updateCompetencyCertificationFormBoiler(id, req.body);
  console.log(updatedCertifications)
  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Competency certifications updated successfully.",
    DATA: updatedCertifications,
};
}

exports.getAllCompetencyCertificationBoiler = async () => {
  const certifications = await FormsRepo.findAllCompetencyCertificationFormBoiler();
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "certifications fetched successfully.",
      DATA: certifications,
  };
};

exports.getCompertencyCertificationBoilerById = async (id) => {
  try {
    const authorization = await FormsRepo.findByIdCompetencyCertificationFormBoiler(id);
    if (!authorization) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "competency record not found.",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "competency record fetched successfully.",
      DATA: authorization,
    };
  } catch (error) {
    console.error("Error in competency service:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to fetch competency",
    };
  }
};

exports.getCompertencyCertificationBoilerByUserId = async (id) => {
  try {
    const authorization = await FormsRepo.findByUserIdCompetencyCertificationFormBoiler(id);
    if (!authorization) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "competency record not found.",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "competency record fetched successfully.",
      DATA: authorization,
    };
  } catch (error) {
    console.error("Error in competency service:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to fetch competency",
    };
  }
};







//competency certification welder
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
    user_id:userId,
    ...req.body
  }

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


exports.updateCompetencyCertificationWelder = async (req,id)=>{
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
  
  const updatedCertifications = await FormsRepo.updateCompetencyCertificationWelder(id, req.body);
  console.log(updatedCertifications)
  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Competency certifications updated successfully.",
    DATA: updatedCertifications,
};
}

exports.getCompetencyCertificationWelderById = async (id) => {
  try {
    const authorization = await FormsRepo.findCompetencyCertificationWelderById(id);
    if (!authorization) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "competency record not found.",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "competency record fetched successfully.",
      DATA: authorization,
    };
  } catch (error) {
    console.error("Error in competency service:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to fetch competency",
    };
  }
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
    user_id:userId,
    ...req.body
  }
  const newRegistration = await FormsRepo.createLiftingEquipmentRegistration(data);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Lifting equipment registration created successfully.",
    DATA: newRegistration,
  };
};


exports.getLiftingEquipmentRegistrationByUserId = async (userId) => {
  console.log(userId)
  const registrations = await FormsRepo.findByUserIdLiftingEquipmentRegistration(userId);
  console.log(registrations)
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

exports.updateLiftingEquipmentRegistration = async (req,id)=>{
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
  
  const updatedCertifications = await FormsRepo.updateLiftingEquipmentRegsitration(id, req.body);
  console.log(updatedCertifications)
  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Equipment registration updated successfully.",
    DATA: updatedCertifications,
};
}

exports.getLiftingEquipmentRegistrationById = async (id) => {
  try {
    const authorization = await FormsRepo.findLiftingEquipmentRegsitrationById(id);
    if (!authorization) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "registration record not found.",
      };
    }
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "registration record fetched successfully.",
      DATA: authorization,
    };
  } catch (error) {
    console.error("Error in registration service:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Failed to fetch competency",
    };
  }
};


exports.createReport = async (req) => {
  const userId = req?.user?.id
  const userExist = await UserRepo.findUser({
    id: req.user?.id,
  });
  let {certificate_image} = req.body;

  certificate_image = certificate_image?await uploadSingleFile(certificate_image): null
  console.log(certificate_image)
  
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
    certificate_image,
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


// for user
exports.updateUserReport = async (req) => {
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
 
//for admin
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