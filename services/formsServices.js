const FormsRepo = require("../repositories/formsRepo");
const UserRepo = require("../repositories/userRepo");
const AdminRepo = require("../repositories/adminRepo");
const {Feedback} = require("../sequelize/models")
const StatusCodes = require("../utils/statusCodes");
const {User} = require("../sequelize/models")
const { uploadSingleFile } = require('../utils/cloudinary');
const { sendFeedbackNotification } = require("../utils/emails/feedback");
const {AdminStaff} = require("../sequelize/models");
const { sendReportNotification } = require("../utils/emails/report");
 

//Authourization Approved

exports.getAuthorizationApprovedByUserId = async (userId) => {
  return FormsRepo.findByUserIdAuthorizationApproved(userId);
};

exports.createAuthorizationApproved = async (req) => {
  const userId = req?.user?.id
  const userExist = await UserRepo.findUser({
    id: req.user?.id,
  });
  let {
    member_nagobin,
  member_leia,
  member_indt,
    companyQualityManual,
    operationalProcedures,
    companyDocumentation,
    documentationQuality,
    documentationSupervisor,
    documentationInspection,
    designerDocumentation,
    weldingDocumentation,
    ndtDocumentation,
    indtDocumentation,
    isoCertification,
  
    ...rest
  } = req.body;


  // Upload files in parallel
  try {
    const [
      member_nagobin_url,
    member_leia_url,
    member_indt_url,
      companyQualityManualUrl,
      operationalProceduresUrl,
      companyDocumentationUrl,
      documentationQualityUrl,
      documentationSupervisorUrl,
      documentationInspectionUrl,
      designerDocumentationUrl,
      weldingDocumentationUrl,
      ndtDocumentationUrl,
      indtDocumentationUrl,
      isoCertificationUrl,
  
    ] = await Promise.all([
      uploadSingleFile(member_nagobin),
      uploadSingleFile(member_leia),
      uploadSingleFile(member_indt),
      uploadSingleFile(companyQualityManual),
      uploadSingleFile(operationalProcedures),
      uploadSingleFile(companyDocumentation),
      uploadSingleFile(documentationQuality),
      uploadSingleFile(documentationSupervisor),
      uploadSingleFile(documentationInspection),
      uploadSingleFile(designerDocumentation),
      uploadSingleFile(weldingDocumentation),
      uploadSingleFile(ndtDocumentation),
      uploadSingleFile(indtDocumentation),
      uploadSingleFile(isoCertification),

    ]);
  
    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "User not authenticated.",
      };
    }
  
    const data = {
      member_nagobin: member_nagobin_url,
    member_leia: member_leia_url,
    member_indt: member_indt_url,
      companyQualityManual: companyQualityManualUrl,
      operationalProcedures: operationalProceduresUrl,
      companyDocumentation: companyDocumentationUrl,
      documentationQuality: documentationQualityUrl,
      documentationSupervisor: documentationSupervisorUrl,
      documentationInspection: documentationInspectionUrl,
      designerDocumentation: designerDocumentationUrl,
      weldingDocumentation: weldingDocumentationUrl,
      ndtDocumentation: ndtDocumentationUrl,
      indtDocumentation: indtDocumentationUrl,
      isoCertification: isoCertificationUrl,
     
      user_id: userId,
      ...rest,
    };
  
  

  const newAuthorizationSubmit = await FormsRepo.create(data);
  console.log("new submit",newAuthorizationSubmit)

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Authorization successfully created.",
    DATA: newAuthorizationSubmit,
  };
}catch(error){
  console.error("Error creating authorization:", error);
  return {
    STATUS_CODE: StatusCodes.SERVER_ERROR,
    STATUS: false,
    MESSAGE: "An error occurred while creating authorization.",
  };
};
}     

exports.updateAuthorizationApproved = async (req, id) => {
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
    // Fetch the existing authorization data
    const existingAuthorization = await FormsRepo.findAuthorizationApprovedById(id);
    if (!existingAuthorization) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Authorization not found.",
      };
    }

    let {
      member_nagobin,
      member_leia,
      member_indt,
      companyQualityManual,
      operationalProcedures,
      companyDocumentation,
      documentationQuality,
      documentationSupervisor,
      documentationInspection,
      designerDocumentation,
      weldingDocumentation,
      ndtDocumentation,
      indtDocumentation,
      isoCertification,
      certificate,
      ...rest
    } = req.body;

    let certificate_image = certificate?.certificate_image;
    let remain = { ...certificate };
    delete remain.certificate_image;

    
    const [
      member_nagobin_url,
      member_leia_url,
      member_indt_url,
      companyQualityManualUrl,
      operationalProceduresUrl,
      companyDocumentationUrl,
      documentationQualityUrl,
      designerDocumentationUrl,
      documentationSupervisorUrl,
      documentationInspectionUrl,
      weldingDocumentationUrl,
      ndtDocumentationUrl,
      indtDocumentationUrl,
      isoCertificationUrl,
      certificate_image_url,
    ] = await Promise.all([
      member_nagobin ? uploadSingleFile(member_nagobin) : existingAuthorization.member_nagobin,
      member_leia ? uploadSingleFile(member_leia) : existingAuthorization.member_leia,
      member_indt ? uploadSingleFile(member_indt) : existingAuthorization.member_indt,
      companyQualityManual ? uploadSingleFile(companyQualityManual) : existingAuthorization.companyQualityManual,
      operationalProcedures ? uploadSingleFile(operationalProcedures) : existingAuthorization.operationalProcedures,
      companyDocumentation ? uploadSingleFile(companyDocumentation) : existingAuthorization.companyDocumentation,
      documentationQuality ? uploadSingleFile(documentationQuality) : existingAuthorization.documentationQuality,
      documentationSupervisor ? uploadSingleFile(documentationSupervisor) : existingAuthorization.documentationSupervisor,
      documentationInspection? uploadSingleFile(documentationInspection) : existingAuthorization.documentationInspection,
      designerDocumentation ? uploadSingleFile(designerDocumentation) : existingAuthorization.designerDocumentation,
      weldingDocumentation ? uploadSingleFile(weldingDocumentation) : existingAuthorization.weldingDocumentation,
      ndtDocumentation ? uploadSingleFile(ndtDocumentation) : existingAuthorization.ndtDocumentation,
      indtDocumentation ? uploadSingleFile(indtDocumentation) : existingAuthorization.indtDocumentation,
      isoCertification ? uploadSingleFile(isoCertification) : existingAuthorization.isoCertification,
      certificate_image ? uploadSingleFile(certificate_image) : existingAuthorization.certificate?.certificate_image,
    ]);

    const updatedData = {
      member_nagobin: member_nagobin_url,
      member_leia: member_leia_url,
      member_indt: member_indt_url,
      companyQualityManual: companyQualityManualUrl,
      operationalProcedures: operationalProceduresUrl,
      companyDocumentation: companyDocumentationUrl,
      documentationQuality: documentationQualityUrl,
      designerDocumentation: designerDocumentationUrl,
      weldingDocumentation: weldingDocumentationUrl,
      ndtDocumentation: ndtDocumentationUrl,
      indtDocumentation: indtDocumentationUrl,
      isoCertification: isoCertificationUrl,
      certificate: {
        certificate_image: certificate_image_url,
        ...remain,
      },
      ...rest,
    };

    const updatedAuthorization = await FormsRepo.updateAuthorizationApproved(id, updatedData);

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

exports.getAllAuthorizationApproved = async () => {
  const allAuthorizations = await FormsRepo.findAllAuthorizationApproved();

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "Authorizations fetched successfully.",
    DATA: allAuthorizations,
  }; 
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

//Authorization Manufacfturer

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
  let {
    member_nagobin,
  member_leia,
  member_indt,
    companyQualityManual,
    operationalProcedures,
    companyDocumentation,
    documentationQuality,
    designerDocumentation,
    weldingDocumentation,
    ndtDocumentation,
    indtDocumentation,
    isoCertification,

    ...rest
  } = req.body;
 

  try {
    const [
    
      member_nagobin_url,
    member_leia_url,
    member_indt_url,
      companyQualityManualUrl,
      operationalProceduresUrl,
      companyDocumentationUrl,
      documentationQualityUrl,
      designerDocumentationUrl,
      weldingDocumentationUrl,
      ndtDocumentationUrl,
      indtDocumentationUrl,
      isoCertificationUrl,
      
    ] = await Promise.all([
    
      uploadSingleFile(member_nagobin),
      uploadSingleFile(member_leia),
      uploadSingleFile(member_indt),
      uploadSingleFile(companyQualityManual),
      uploadSingleFile(operationalProcedures),
      uploadSingleFile(companyDocumentation),
      uploadSingleFile(documentationQuality),
      uploadSingleFile(designerDocumentation),
      uploadSingleFile(weldingDocumentation),
      uploadSingleFile(ndtDocumentation),
      uploadSingleFile(indtDocumentation),
      uploadSingleFile(isoCertification),
    ]);
  
    
  
    const data = {
      member_nagobin: member_nagobin_url,
      member_leia: member_leia_url,
      member_indt: member_indt_url,
      companyQualityManual: companyQualityManualUrl,
      operationalProcedures: operationalProceduresUrl,
      companyDocumentation: companyDocumentationUrl,
      documentationQuality: documentationQualityUrl,
      designerDocumentation: designerDocumentationUrl,
      weldingDocumentation: weldingDocumentationUrl,
      ndtDocumentation: ndtDocumentationUrl,
      indtDocumentation: indtDocumentationUrl,
      isoCertification: isoCertificationUrl,
      user_id: userId,
      ...rest,
    };
  


  const newAuthorizationManufacturer = await FormsRepo.createAuthorizationManufacturer(data);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Authorization successfully created.",
    DATA: newAuthorizationManufacturer,
  };
}catch(error){
  console.error("Error creating authorization manufacturer:", error);
  return {
    STATUS_CODE: StatusCodes.SERVER_ERROR,
    STATUS: false,
    MESSAGE: "An error occurred while creating authorization manufacturer.",
  };
}
}
exports.updateAuthorizationManufacturer = async (req, id) => {
  const userId = req?.user?.id;

  if (!userId) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const userExist = await UserRepo.findUser({ id: userId });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const existingAuthorization = await FormsRepo.findAuthorizationManufacturerById(id);

  if (!existingAuthorization) {
    return {
      STATUS_CODE: StatusCodes.NOT_FOUND,
      STATUS: false,
      MESSAGE: "Authorization not found.",
    };
  }

  let {
    member_nagobin,
    member_leia,
    member_indt,
    companyQualityManual,
    operationalProcedures,
    companyDocumentation,
    documentationQuality,
    designerDocumentation,
    weldingDocumentation,
    ndtDocumentation,
    indtDocumentation,
    isoCertification,
    certificate,
    ...rest
  } = req.body;
  let certificate_image = certificate?.certificate_image;
  let remain = { ...certificate };
  delete remain.certificate_image;

  try {
    const [
      certificate_image_url,
      member_nagobin_url,
      member_leia_url,
      member_indt_url,
      companyQualityManualUrl,
      operationalProceduresUrl,
      companyDocumentationUrl,
      documentationQualityUrl,
      designerDocumentationUrl,
      weldingDocumentationUrl,
      ndtDocumentationUrl,
      indtDocumentationUrl,
      isoCertificationUrl,
    ] = await Promise.all([
      certificate_image ? uploadSingleFile(certificate_image) : existingAuthorization?.certificate?.certificate_image,
      member_nagobin ? uploadSingleFile(member_nagobin) : existingAuthorization.member_nagobin,
      member_leia ? uploadSingleFile(member_leia) : existingAuthorization.member_leia,
      member_indt ? uploadSingleFile(member_indt) : existingAuthorization.member_indt,
      companyQualityManual ? uploadSingleFile(companyQualityManual) : existingAuthorization.companyQualityManual,
      operationalProcedures ? uploadSingleFile(operationalProcedures) : existingAuthorization.operationalProcedures,
      companyDocumentation ? uploadSingleFile(companyDocumentation) : existingAuthorization.companyDocumentation,
      documentationQuality ? uploadSingleFile(documentationQuality) : existingAuthorization.documentationQuality,
      designerDocumentation ? uploadSingleFile(designerDocumentation) : existingAuthorization.designerDocumentation,
      weldingDocumentation ? uploadSingleFile(weldingDocumentation) : existingAuthorization.weldingDocumentation,
      ndtDocumentation ? uploadSingleFile(ndtDocumentation) : existingAuthorization.ndtDocumentation,
      indtDocumentation ? uploadSingleFile(indtDocumentation) : existingAuthorization.indtDocumentation,
      isoCertification ? uploadSingleFile(isoCertification) : existingAuthorization.isoCertification,
    ]);

    const data = {
      member_nagobin: member_nagobin_url,
      member_leia: member_leia_url,
      member_indt: member_indt_url,
      companyQualityManual: companyQualityManualUrl,
      operationalProcedures: operationalProceduresUrl,
      companyDocumentation: companyDocumentationUrl,
      documentationQuality: documentationQualityUrl,
      designerDocumentation: designerDocumentationUrl,
      weldingDocumentation: weldingDocumentationUrl,
      ndtDocumentation: ndtDocumentationUrl,
      indtDocumentation: indtDocumentationUrl,
      isoCertification: isoCertificationUrl,
      certificate: {
        certificate_image: certificate_image_url,
        ...remain,
      },
      user_id: userId,
      ...rest,
    };

    const updatedAuthorizationManufacturer = await FormsRepo.updateAuthorizationManufacturer(id, data);

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

  // Upload files in parallel
  try {
    let {
      member_nagobin,
    member_leia,
    member_indt,
      companyQualityManual,
      operationalProcedures,
      companyDocumentation,
      documentationQuality,
      designerDocumentation,
      weldingDocumentation,
      ndtDocumentation,
      indtDocumentation,
      isoCertification,
     
      ...rest
    } = req.body;

    const [
      member_nagobin_url,
    member_leia_url,
    member_indt_url,
      companyQualityManualUrl,
      operationalProceduresUrl,
      companyDocumentationUrl,
      documentationQualityUrl,
      designerDocumentationUrl,
      weldingDocumentationUrl,
      ndtDocumentationUrl,
      indtDocumentationUrl,
      isoCertificationUrl,
    ] = await Promise.all([

      uploadSingleFile(member_nagobin),
      uploadSingleFile(member_leia),
      uploadSingleFile(member_indt),
      uploadSingleFile(companyQualityManual),
      uploadSingleFile(operationalProcedures),
      uploadSingleFile(companyDocumentation),
      uploadSingleFile(documentationQuality),
      uploadSingleFile(designerDocumentation),
      uploadSingleFile(weldingDocumentation),
      uploadSingleFile(ndtDocumentation),
      uploadSingleFile(indtDocumentation),
      uploadSingleFile(isoCertification),
    ]);
  
  
    const data = {
      
      member_nagobin: member_nagobin_url,
    member_leia: member_leia_url,
    member_indt: member_indt_url,
      companyQualityManual: companyQualityManualUrl,
      operationalProcedures: operationalProceduresUrl,
      companyDocumentation: companyDocumentationUrl,
      documentationQuality: documentationQualityUrl,
      designerDocumentation: designerDocumentationUrl,
      weldingDocumentation: weldingDocumentationUrl,
      ndtDocumentation: ndtDocumentationUrl,
      indtDocumentation: indtDocumentationUrl,
      isoCertification: isoCertificationUrl,
      user_id: userId,
      ...rest,
    };
  


  const newTrainingAuthorization = await FormsRepo.createTrainingAuthorization(data);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "Training authorization created successfully.",
    DATA: newTrainingAuthorization,
  };
}catch(error){
  console.error("Error creating training authorization:", error);
  return {
    STATUS_CODE: StatusCodes.SERVER_ERROR,
    STATUS: false,
    MESSAGE: "An error occurred while creating training authorization.",
  };
}
}

exports.updateAuthorizationTraining = async (req, id) => {
  const userId = req?.user?.id;

  if (!userId) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const userExist = await UserRepo.findUser({ id: userId });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const existingAuthorization = await FormsRepo.findTrainingAuthorizationById(id);

  if (!existingAuthorization) {
    return {
      STATUS_CODE: StatusCodes.NOT_FOUND,
      STATUS: false,
      MESSAGE: "Authorization not found.",
    };
  }

  let {
    member_nagobin,
    member_leia,
    member_indt,
    companyQualityManual,
    operationalProcedures,
    companyDocumentation,
    documentationQuality,
    designerDocumentation,
    weldingDocumentation,
    ndtDocumentation,
    indtDocumentation,
    isoCertification,
    certificate,
    ...rest
  } = req.body;

  let certificate_image = certificate?.certificate_image;
  let remain = certificate ? { ...certificate } : {};

  try {
    const [
      certificate_image_url,
      member_nagobin_url,
      member_leia_url,
      member_indt_url,
      companyQualityManualUrl,
      operationalProceduresUrl,
      companyDocumentationUrl,
      documentationQualityUrl,
      designerDocumentationUrl,
      weldingDocumentationUrl,
      ndtDocumentationUrl,
      indtDocumentationUrl,
      isoCertificationUrl,
    ] = await Promise.all([
      certificate_image ? uploadSingleFile(certificate_image) : existingAuthorization?.certificate?.certificate_image,
      member_nagobin ? uploadSingleFile(member_nagobin) : existingAuthorization.member_nagobin,
      member_leia ? uploadSingleFile(member_leia) : existingAuthorization.member_leia,
      member_indt ? uploadSingleFile(member_indt) : existingAuthorization.member_indt,
      companyQualityManual ? uploadSingleFile(companyQualityManual) : existingAuthorization.companyQualityManual,
      operationalProcedures ? uploadSingleFile(operationalProcedures) : existingAuthorization.operationalProcedures,
      companyDocumentation ? uploadSingleFile(companyDocumentation) : existingAuthorization.companyDocumentation,
      documentationQuality ? uploadSingleFile(documentationQuality) : existingAuthorization.documentationQuality,
      designerDocumentation ? uploadSingleFile(designerDocumentation) : existingAuthorization.designerDocumentation,
      weldingDocumentation ? uploadSingleFile(weldingDocumentation) : existingAuthorization.weldingDocumentation,
      ndtDocumentation ? uploadSingleFile(ndtDocumentation) : existingAuthorization.ndtDocumentation,
      indtDocumentation ? uploadSingleFile(indtDocumentation) : existingAuthorization.indtDocumentation,
      isoCertification ? uploadSingleFile(isoCertification) : existingAuthorization.isoCertification,
    ]);

    const data = {
      member_nagobin: member_nagobin_url,
      member_leia: member_leia_url,
      member_indt: member_indt_url,
      companyQualityManual: companyQualityManualUrl,
      operationalProcedures: operationalProceduresUrl,
      companyDocumentation: companyDocumentationUrl,
      documentationQuality: documentationQualityUrl,
      designerDocumentation: designerDocumentationUrl,
      weldingDocumentation: weldingDocumentationUrl,
      ndtDocumentation: ndtDocumentationUrl,
      indtDocumentation: indtDocumentationUrl,
      isoCertification: isoCertificationUrl,
      certificate: {
        certificate_image: certificate_image_url,
        ...remain,
      },
      user_id: userId,
      ...rest,
    };

    const updatedAuthorizationTraining = await FormsRepo.updateTrainingAuthorization(id, data);

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


exports.getAllAuthorizationTraining = async () => {
    const allAuthorizations = await FormsRepo.findAllTrainingAuthorization();
  
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Authorizations fetched successfully.",
      DATA: allAuthorizations,
    };
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
      let {
        manufacturers_data_report,
        construction_drawings,
        design_calculation,
        test_parameters_data,
        accreditation_documents,
        installation_plan,
        quality_assurance_program,
 
        ...rest
      } = req.body;
  
     
  
      // Upload all files in parallel
      const [
        manufacturersDataReportUrl,
        constructionDrawingsUrl,
        designCalculationUrl,
        testParametersDataUrl,
        accreditationDocumentsUrl,
        installationPlanUrl,
        qualityAssuranceProgramUrl,
 
      ] = await Promise.all([
        uploadSingleFile(manufacturers_data_report),
        uploadSingleFile(construction_drawings),
        uploadSingleFile(design_calculation),
        uploadSingleFile(test_parameters_data),
        uploadSingleFile(accreditation_documents),
        uploadSingleFile(installation_plan),
        uploadSingleFile(quality_assurance_program),
       
      ]);
  
      const data = {
        manufacturers_data_report: manufacturersDataReportUrl,
        construction_drawings: constructionDrawingsUrl,
        design_calculation: designCalculationUrl,
        test_parameters_data: testParametersDataUrl,
        accreditation_documents: accreditationDocumentsUrl,
        installation_plan: installationPlanUrl,
        quality_assurance_program: qualityAssuranceProgramUrl,
      
        user_id: userId,
        ...rest
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
    
    exports.updateBoilerRegistration = async (req, id) => {
      const userId = req?.user?.id;
    
      if (!userId) {
        return {
          STATUS_CODE: StatusCodes.UNAUTHORIZED,
          STATUS: false,
          MESSAGE: "User not authenticated.",
        };
      }
    
      const userExist = await UserRepo.findUser({ id: userId });
    
      if (!userExist) {
        return {
          STATUS_CODE: StatusCodes.UNAUTHORIZED,
          STATUS: false,
          MESSAGE: "User not authenticated.",
        };
      }
    
      const existingRegistration = await FormsRepo.findBoilerRegistrationById(id);
    
      if (!existingRegistration) {
        return {
          STATUS_CODE: StatusCodes.NOT_FOUND,
          STATUS: false,
          MESSAGE: "Boiler registration not found.",
        };
      }
    
      let {
        manufacturers_data_report,
        construction_drawings,
        design_calculation,
        test_parameters_data,
        accreditation_documents,
        installation_plan,
        quality_assurance_program,
        certificate,
        ...rest
      } = req.body;
    
      let { certificate_image, ...certificateRest } = certificate || {};
    
      try {
        const [
          manufacturersDataReportUrl,
          constructionDrawingsUrl,
          designCalculationUrl,
          testParametersDataUrl,
          accreditationDocumentsUrl,
          installationPlanUrl,
          qualityAssuranceProgramUrl,
          certificateImageUrl,
        ] = await Promise.all([
          manufacturers_data_report ? uploadSingleFile(manufacturers_data_report) : existingRegistration.manufacturers_data_report,
          construction_drawings ? uploadSingleFile(construction_drawings) : existingRegistration.construction_drawings,
          design_calculation ? uploadSingleFile(design_calculation) : existingRegistration.design_calculation,
          test_parameters_data ? uploadSingleFile(test_parameters_data) : existingRegistration.test_parameters_data,
          accreditation_documents ? uploadSingleFile(accreditation_documents) : existingRegistration.accreditation_documents,
          installation_plan ? uploadSingleFile(installation_plan) : existingRegistration.installation_plan,
          quality_assurance_program ? uploadSingleFile(quality_assurance_program) : existingRegistration.quality_assurance_program,
          certificate_image ? uploadSingleFile(certificate_image) : existingRegistration.certificate?.certificate_image,
        ]);
    
        const data = {
          manufacturers_data_report: manufacturersDataReportUrl,
          construction_drawings: constructionDrawingsUrl,
          design_calculation: designCalculationUrl,
          test_parameters_data: testParametersDataUrl,
          accreditation_documents: accreditationDocumentsUrl,
          installation_plan: installationPlanUrl,
          quality_assurance_program: qualityAssuranceProgramUrl,
          certificate: {
            certificate_image: certificateImageUrl,
            ...certificateRest,
          },
          user_id: userId,
          ...rest,
        };
    
        const updatedRegistration = await FormsRepo.updateBoilerRegistration(id, data);
    
        return {
          STATUS_CODE: StatusCodes.OK,
          STATUS: true,
          MESSAGE: "Boiler registration updated successfully.",
          DATA: updatedRegistration,
        };
      } catch (error) {
        console.error("Error updating boiler registration:", error);
        return {
          STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
          STATUS: false,
          MESSAGE: "Failed to update boiler registration.",
        };
      }
    };
    

    //competency from lift operator
 
    exports.createCompetencyFormLiftOperator = async (req) => {
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
        let {
          applicant_cv,
          higher_education_certifications,
          training_certificate,
          employment_letter,
          ...rest
        } = req.body;
    
        
    
        // Upload all files in parallel
        const [
          applicantCvUrl,
          higherEducationCertificationsUrl,
          trainingCertificateUrl,
          employmentLetterUrl,
         
        ] = await Promise.all([
          uploadSingleFile(applicant_cv),
          uploadSingleFile(higher_education_certifications),
          uploadSingleFile(training_certificate),
          uploadSingleFile(employment_letter),
          
        ]);
    
        const data = {
          applicant_cv: applicantCvUrl,
          higher_education_certifications: higherEducationCertificationsUrl,
          training_certificate: trainingCertificateUrl,
          employment_letter: employmentLetterUrl,
          
          user_id: userId,
          ...rest
        };
    
        const newCompetencyForm = await FormsRepo.createCompetencyCertificationLiftOperator(data);
        return {
          STATUS_CODE: StatusCodes.CREATED,
          STATUS: true,
          MESSAGE: "Competency form created successfully.",
          DATA: newCompetencyForm,
        };
      } catch (error) {
        console.error("Error in createCompetencyFormLiftOperator service:", error);
        return {
          STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
          STATUS: false,
          MESSAGE: "Failed to create competency form.",
        };
      }
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
    console.log("Updating competency form...");
  
    const userId = req?.user?.id;
  
    if (!userId) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "User not authenticated.",
      };
    }
  
    const userExist = await UserRepo.findUser({ id: userId });
  
    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "User not authenticated.",
      };
    }
  
    const existingForm = await FormsRepo.findCompetencyCertificationLiftFormById(id);
  
    if (!existingForm) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Competency form not found.",
      };
    }
  
    let {
      applicant_cv,
      higher_education_certifications,
      training_certificate,
      employment_letter,
      certificate,
      ...rest
    } = req.body;
  
    let { certificate_image, ...certificateRest } = certificate || {};
  
    try {
      const [
        applicantCvUrl,
        higherEducationCertificationsUrl,
        trainingCertificateUrl,
        employmentLetterUrl,
        certificateImageUrl,
      ] = await Promise.all([
        applicant_cv ? uploadSingleFile(applicant_cv) : existingForm.applicant_cv,
        higher_education_certifications ? uploadSingleFile(higher_education_certifications) : existingForm.higher_education_certifications,
        training_certificate ? uploadSingleFile(training_certificate) : existingForm.training_certificate,
        employment_letter ? uploadSingleFile(employment_letter) : existingForm.employment_letter,
        certificate_image ? uploadSingleFile(certificate_image) : existingForm.certificate?.certificate_image,
      ]);
  
      const data = {
        applicant_cv: applicantCvUrl,
        higher_education_certifications: higherEducationCertificationsUrl,
        training_certificate: trainingCertificateUrl,
        employment_letter: employmentLetterUrl,
        certificate: {
          certificate_image: certificateImageUrl,
          ...certificateRest,
        },
        user_id: userId,
        ...rest,
      };
  
      const updatedForm = await FormsRepo.updateCompetencyCertificationLiftForm(id, data);
  
      return {
        STATUS_CODE: StatusCodes.OK,
        STATUS: true,
        MESSAGE: "Competency form updated successfully.",
        DATA: updatedForm,
      };
    } catch (error) {
      console.error("Error updating competency form:", error);
      return {
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Failed to update competency form.",
      };
    }
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
    company_nagobin,
    
     ...rest
  } = req.body;
  
  // Upload files in parallel
  try {
    const [
    
      company_documentation_url,
      supervisor_documentation_url,
      inspector_documentation_url,
      log_book_url,
      application_letter_url,
      personnel_leia_url,
      personnel_nagobin_url,
      company_leia_url,
      company_nagobin_url,
    ] = await Promise.all([
      uploadSingleFile(company_documentation),
      uploadSingleFile(supervisor_documentation),
      uploadSingleFile(inspector_documentation),
      uploadSingleFile(log_book),
      uploadSingleFile(application_letter),
      uploadSingleFile(personnel_leia),
      uploadSingleFile(personnel_nagobin),
      uploadSingleFile(company_leia),
      uploadSingleFile(company_nagobin),
    ]);

    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "User not authenticated.",
      };
    }

    const data = {
      company_documentation: company_documentation_url,
      supervisor_documentation: supervisor_documentation_url,
      inspector_documentation: inspector_documentation_url,
      log_book: log_book_url,
      application_letter: application_letter_url,
      personnel_leia: personnel_leia_url,
      personnel_nagobin: personnel_nagobin_url,
      company_leia: company_leia_url,
      company_nagobin: company_nagobin_url,
      user_id: userId,
     ...rest,
    };

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
  
    if (!userId) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "User not authenticated.",
      };
    }
  
    const userExist = await UserRepo.findUser({ id: userId });
  
    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "User not authenticated.",
      };
    }
  
    const existingRenewalForm = await FormsRepo.findRenewalFormsById(id);
  
    if (!existingRenewalForm) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Renewal form not found.",
      };
    }
  
    let {
      company_documentation,
      supervisor_documentation,
      inspector_documentation,
      log_book,
      application_letter,
      personnel_leia,
      personnel_nagobin,
      company_leia,
      company_nagobin,
      certificate,
      ...rest
    } = req.body;
  
    let { certificate_image, ...certificateRest } = certificate || {};
  
    try {
      const [
        certificate_image_url,
        company_documentation_url,
        supervisor_documentation_url,
        inspector_documentation_url,
        log_book_url,
        application_letter_url,
        personnel_leia_url,
        personnel_nagobin_url,
        company_leia_url,
        company_nagobin_url,
      ] = await Promise.all([
        certificate_image ? uploadSingleFile(certificate_image) : existingRenewalForm.certificate?.certificate_image,
        company_documentation ? uploadSingleFile(company_documentation) : existingRenewalForm.company_documentation,
        supervisor_documentation ? uploadSingleFile(supervisor_documentation) : existingRenewalForm.supervisor_documentation,
        inspector_documentation ? uploadSingleFile(inspector_documentation) : existingRenewalForm.inspector_documentation,
        log_book ? uploadSingleFile(log_book) : existingRenewalForm.log_book,
        application_letter ? uploadSingleFile(application_letter) : existingRenewalForm.application_letter,
        personnel_leia ? uploadSingleFile(personnel_leia) : existingRenewalForm.personnel_leia,
        personnel_nagobin ? uploadSingleFile(personnel_nagobin) : existingRenewalForm.personnel_nagobin,
        company_leia ? uploadSingleFile(company_leia) : existingRenewalForm.company_leia,
        company_nagobin ? uploadSingleFile(company_nagobin) : existingRenewalForm.company_nagobin,
      ]);
  
      const data = {
        company_documentation: company_documentation_url,
        supervisor_documentation: supervisor_documentation_url,
        inspector_documentation: inspector_documentation_url,
        log_book: log_book_url,
        application_letter: application_letter_url,
        personnel_leia: personnel_leia_url,
        personnel_nagobin: personnel_nagobin_url,
        company_leia: company_leia_url,
        company_nagobin: company_nagobin_url,
        user_id: userId,
        certificate: {
          certificate_image: certificate_image_url,
          ...certificateRest,
        },
        ...rest,
      };
  
      const updatedRenewalForm = await FormsRepo.updateRenewalForms(id, data);
  
      return {
        STATUS_CODE: StatusCodes.OK,
        STATUS: true,
        MESSAGE: "Renewal form updated successfully.",
        DATA: updatedRenewalForm,
      };
    } catch (error) {
      console.error("Error updating renewal form:", error);
      return {
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Failed to update renewal form.",
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

  let {
    applicant_cv,
    higher_education_certifications,
    leia_certificate,
    training_certificate,
    employment_letter,
    ...rest
  } = req.body;

  try {
    const [
      applicantCvUrl,
      higherEducationCertificationsUrl,
      leiaCertificateUrl,
      trainingCertificateUrl,
      employmentLetterUrl,
    ] = await Promise.all([
      applicant_cv ? uploadSingleFile(applicant_cv) : null,
      higher_education_certifications ? uploadSingleFile(higher_education_certifications) : null,
      leia_certificate ? uploadSingleFile(leia_certificate) : null,
      training_certificate ? uploadSingleFile(training_certificate) : null,
      employment_letter ? uploadSingleFile(employment_letter) : null,
    ]);

    const data = {
      applicant_cv: applicantCvUrl,
      higher_education_certifications: higherEducationCertificationsUrl,
      leia_certificate: leiaCertificateUrl,
      training_certificate: trainingCertificateUrl,
      employment_letter: employmentLetterUrl,
      user_id: userId,
      ...rest,
    };

    const newCertification = await FormsRepo.createOperatorCertification(data);

    return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Operator certification created successfully.",
      DATA: newCertification,
    };
  } catch (error) {
    console.error("Error creating operator certification:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error creating operator certification.",
    };
  }
};

exports.updateOperatorCertification = async (req, id) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const existingCertification = await FormsRepo.findOperatorCertificationById(id);

  if (!existingCertification) {
    return {
      STATUS_CODE: StatusCodes.NOT_FOUND,
      STATUS: false,
      MESSAGE: "Operator certification not found.",
    };
  }

  let {
    applicant_cv,
    higher_education_certifications,
    leia_certificate,
    training_certificate,
    employment_letter,
    certificate,
    ...rest
  } = req.body;

  let { certificate_image, ...certificateRest } = certificate || {};

  try {
    const [
      applicantCvUrl,
      higherEducationCertificationsUrl,
      leiaCertificateUrl,
      trainingCertificateUrl,
      employmentLetterUrl,
      certificateImageUrl,
    ] = await Promise.all([
      applicant_cv ? uploadSingleFile(applicant_cv) : existingCertification.applicant_cv,
      higher_education_certifications
        ? uploadSingleFile(higher_education_certifications)
        : existingCertification.higher_education_certifications,
      leia_certificate ? uploadSingleFile(leia_certificate) : existingCertification.leia_certificate,
      training_certificate ? uploadSingleFile(training_certificate) : existingCertification.training_certificate,
      employment_letter ? uploadSingleFile(employment_letter) : existingCertification.employment_letter,
      certificate_image ? uploadSingleFile(certificate_image) : existingCertification?.certificate?.certificate_image,
    ]);

    const data = {
      applicant_cv: applicantCvUrl,
      higher_education_certifications: higherEducationCertificationsUrl,
      leia_certificate: leiaCertificateUrl,
      training_certificate: trainingCertificateUrl,
      employment_letter: employmentLetterUrl,
      certificate: {
        certificate_image: certificateImageUrl,
        ...certificateRest,
      },
      user_id: userId,
      ...rest,
    };

    const updatedCertification = await FormsRepo.updateOperatorCertification(id, data);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Operator certification updated successfully.",
      DATA: updatedCertification,
    };
  } catch (error) {
    console.error("Error updating operator certification:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error updating operator certification.",
    };
  }
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

  let {
    applicant_cv,
    higher_education_certifications,
    leia_certificate,
    training_certificate,
    employment_letter,

    ...rest
  } = req.body;



  try {
    const [
      applicantCvUrl,
      higherEducationCertificationsUrl,
      leiaCertificateUrl,
      trainingCertificateUrl,
      employmentLetterUrl,
   
    ] = await Promise.all([
      applicant_cv ? uploadSingleFile(applicant_cv) : null,
      higher_education_certifications ? uploadSingleFile(higher_education_certifications) : null,
      leia_certificate ? uploadSingleFile(leia_certificate) : null,
      training_certificate ? uploadSingleFile(training_certificate) : null,
      employment_letter ? uploadSingleFile(employment_letter) : null,
   
    ]);

    const data = {
      user_id: userId,
      applicant_cv: applicantCvUrl,
      higher_education_certifications: higherEducationCertificationsUrl,
      leia_certificate: leiaCertificateUrl,
      training_certificate: trainingCertificateUrl,
      employment_letter: employmentLetterUrl,
     
      ...rest,
    };

    const newCertification = await FormsRepo.createCompetencyCertificationLifting(data);

    return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Competency certification lifting created successfully.",
      DATA: newCertification,
    };
  } catch (error) {
    console.error("Error creating competency certification lifting:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error creating competency certification lifting.",
    };
  }
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
exports.updateCompetencyCertificationLifting = async (req, id) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const existingCertification = await FormsRepo.findCompetencyCertificationLiftingById(id);

  if (!existingCertification) {
    return {
      STATUS_CODE: StatusCodes.NOT_FOUND,
      STATUS: false,
      MESSAGE: "Competency certification lifting not found.",
    };
  }

  let {
    applicant_cv,
    higher_education_certifications,
    leia_certificate,
    training_certificate,
    employment_letter,
    certificate,
    ...rest
  } = req.body;

  let { certificate_image, ...certificateRest } = certificate || {};

  try {
    const [
      applicantCvUrl,
      higherEducationCertificationsUrl,
      leiaCertificateUrl,
      trainingCertificateUrl,
      employmentLetterUrl,
      certificateImageUrl,
    ] = await Promise.all([
      applicant_cv ? uploadSingleFile(applicant_cv) : existingCertification.applicant_cv,
      higher_education_certifications ? uploadSingleFile(higher_education_certifications) : existingCertification.higher_education_certifications,
      leia_certificate ? uploadSingleFile(leia_certificate) : existingCertification.leia_certificate,
      training_certificate ? uploadSingleFile(training_certificate) : existingCertification.training_certificate,
      employment_letter ? uploadSingleFile(employment_letter) : existingCertification.employment_letter,
      certificate_image ? uploadSingleFile(certificate_image) : existingCertification.certificate?.certificate_image,
    ]);

    const data = {
      applicant_cv: applicantCvUrl,
      higher_education_certifications: higherEducationCertificationsUrl,
      leia_certificate: leiaCertificateUrl,
      training_certificate: trainingCertificateUrl,
      employment_letter: employmentLetterUrl,
      certificate: {
        certificate_image: certificateImageUrl,
        ...certificateRest,
      },
      user_id: userId,
      ...rest,
    };

    const updatedCertifications = await FormsRepo.updateCompetencyCertificationLifting(id, data);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certification lifting updated successfully.",
      DATA: updatedCertifications,
    };
  } catch (error) {
    console.error("Error updating competency certification lifting:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error updating competency certification lifting.",
    };
  }
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

  let {
    applicant_cv,
    higher_education_certifications,
    nagobin_experience_certificate,
    training_certificate,
    other_certifications,
    employment_letter,
    ...rest
  } = req.body;

  try {
    // Upload files in parallel if they exist
    const [
      applicantCvUrl,
      higherEducationCertificationsUrl,
      nagobinExperienceCertificateUrl,
      trainingCertificateUrl,
      otherCertificationsUrl,
      employmentLetterUrl,
    ] = await Promise.all([
      applicant_cv ? uploadSingleFile(applicant_cv) : null,
      higher_education_certifications ? uploadSingleFile(higher_education_certifications) : null,
      nagobin_experience_certificate ? uploadSingleFile(nagobin_experience_certificate) : null,
      training_certificate ? uploadSingleFile(training_certificate) : null,
      other_certifications ? uploadSingleFile(other_certifications) : null,
      employment_letter ? uploadSingleFile(employment_letter) : null,
    ]);

    const data = {
      user_id: userId,
      applicant_cv: applicantCvUrl,
      higher_education_certifications: higherEducationCertificationsUrl,
      nagobin_experience_certificate: nagobinExperienceCertificateUrl,
      training_certificate: trainingCertificateUrl,
      other_certifications: otherCertificationsUrl,
      employment_letter: employmentLetterUrl,
      ...rest,
    };

    const newCertification = await FormsRepo.createCompetencyCertificationInspection(data);

    return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Authorized inspector certification created successfully.",
      DATA: newCertification,
    };
  } catch (error) {
    console.error("Error creating competency certification inspection:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error creating competency certification inspection.",
    };
  }
};


exports.getCompetencyCertificationInspectionById = async (userId) => {
  const certifications = await FormsRepo.findCompetencyCertificationInspectionById(userId);
  return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certifications lifting fetched successfully.",
      DATA: certifications,
  };
};

exports.updateCompetencyCertificationInspection = async (req, id) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const existingCertification = await FormsRepo.findCompetencyCertificationInspectionById(id);

  if (!existingCertification) {
    return {
      STATUS_CODE: StatusCodes.NOT_FOUND,
      STATUS: false,
      MESSAGE: "Competency certification inspection not found.",
    };
  }

  let {
    applicant_cv,
    higher_education_certifications,
    nagobin_experience_certificate,
    training_certificate,
    other_certifications,
    employment_letter,
    certificate, // Certificate field
    ...rest
  } = req.body;

  let { certificate_image, ...certificateRest } = certificate || {};

  try {
    const [
      applicantCvUrl,
      higherEducationCertificationsUrl,
      nagobinExperienceCertificateUrl,
      trainingCertificateUrl,
      otherCertificationsUrl,
      employmentLetterUrl,
      certificateImageUrl,
    ] = await Promise.all([
      applicant_cv ? uploadSingleFile(applicant_cv) : existingCertification.applicant_cv,
      higher_education_certifications ? uploadSingleFile(higher_education_certifications) : existingCertification.higher_education_certifications,
      nagobin_experience_certificate ? uploadSingleFile(nagobin_experience_certificate) : existingCertification.nagobin_experience_certificate,
      training_certificate ? uploadSingleFile(training_certificate) : existingCertification.training_certificate,
      other_certifications ? uploadSingleFile(other_certifications) : existingCertification.other_certifications,
      employment_letter ? uploadSingleFile(employment_letter) : existingCertification.employment_letter,
      certificate_image ? uploadSingleFile(certificate_image) : existingCertification.certificate?.certificate_image,
    ]);

    const data = {
      applicant_cv: applicantCvUrl,
      higher_education_certifications: higherEducationCertificationsUrl,
      nagobin_experience_certificate: nagobinExperienceCertificateUrl,
      training_certificate: trainingCertificateUrl,
      other_certifications: otherCertificationsUrl,
      employment_letter: employmentLetterUrl,
      certificate: {
        certificate_image: certificateImageUrl,
        ...certificateRest,
      },
      user_id: userId,
      ...rest,
    };

    const updatedCertification = await FormsRepo.updateCompetencyCertificationInspection(id, data);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certification inspection updated successfully.",
      DATA: updatedCertification,
    };
  } catch (error) {
    console.error("Error updating competency certification inspection:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error updating competency certification inspection.",
    };
  }
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

  const { 
    applicant_cv, 
    higher_education_certifications, 
    training_certificate, 
    employment_letter, 
    ...rest 
  } = req.body;

  try {
    const [
      applicantCvUrl,
      higherEducationCertificationsUrl,
      trainingCertificateUrl,
      employmentLetterUrl,
    ] = await Promise.all([
      applicant_cv ? uploadSingleFile(applicant_cv) : null,
      higher_education_certifications ? uploadSingleFile(higher_education_certifications) : null,
      training_certificate ? uploadSingleFile(training_certificate) : null,
      employment_letter ? uploadSingleFile(employment_letter) : null,
    ]);

    const data = {
      user_id: userId,
      applicant_cv: applicantCvUrl,
      higher_education_certifications: higherEducationCertificationsUrl,
      training_certificate: trainingCertificateUrl,
      employment_letter: employmentLetterUrl,
      ...rest,
    };

    const newCertification = await FormsRepo.createCompetencyCertificationFormBoiler(data);

    return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Competency certification Form Boiler created successfully.",
      DATA: newCertification,
    };
  } catch (error) {
    console.error("Error creating competency certification Form Boiler:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error creating competency certification Form Boiler.",
    };
  }
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

exports.updateCompetencyCertificationBoiler = async (req, id) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const existingCertification = await FormsRepo.findByIdCompetencyCertificationFormBoiler(id);

  if (!existingCertification) {
    return {
      STATUS_CODE: StatusCodes.NOT_FOUND,
      STATUS: false,
      MESSAGE: "Competency certification Form Boiler not found.",
    };
  }

  let {
    applicant_cv,
    higher_education_certifications,
    training_certificate,
    employment_letter,
    certificate,
    ...rest
  } = req.body;

  let { certificate_image, ...certificateRest } = certificate || {};

  try {
    const [
      applicantCvUrl,
      higherEducationCertificationsUrl,
      trainingCertificateUrl,
      employmentLetterUrl,
      certificateImageUrl,
    ] = await Promise.all([
      applicant_cv ? uploadSingleFile(applicant_cv) : existingCertification.applicant_cv,
      higher_education_certifications ? uploadSingleFile(higher_education_certifications) : existingCertification.higher_education_certifications,
      training_certificate ? uploadSingleFile(training_certificate) : existingCertification.training_certificate,
      employment_letter ? uploadSingleFile(employment_letter) : existingCertification.employment_letter,
      certificate_image ? uploadSingleFile(certificate_image) : existingCertification.certificate?.certificate_image,
    ]);

    // Handle certificate separately
    const certificateData = {
      certificate_image: certificateImageUrl,
      ...certificateRest,
    };

    const data = {
      applicant_cv: applicantCvUrl,
      higher_education_certifications: higherEducationCertificationsUrl,
      training_certificate: trainingCertificateUrl,
      employment_letter: employmentLetterUrl,
      certificate: certificateData,
      user_id: userId,
      ...rest,
    };

    const updatedCertifications = await FormsRepo.updateCompetencyCertificationFormBoiler(id, data);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certification Form Boiler updated successfully.",
      DATA: updatedCertifications,
    };
  } catch (error) {
    console.error("Error updating competency certification Form Boiler:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error updating competency certification Form Boiler.",
    };
  }
};


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

  const {
    applicant_cv,
    higher_education_certifications,
    other_certificate,
    training_certificate,
    employment_letter,
    ...rest
  } = req.body;

  try {
    const [
      applicantCvUrl,
      higherEducationCertificationsUrl,
      otherCertificateUrl,
      trainingCertificateUrl,
      employmentLetterUrl,
    ] = await Promise.all([
      applicant_cv ? uploadSingleFile(applicant_cv) : null,
      higher_education_certifications ? uploadSingleFile(higher_education_certifications) : null,
      other_certificate ? uploadSingleFile(other_certificate) : null,
      training_certificate ? uploadSingleFile(training_certificate) : null,
      employment_letter ? uploadSingleFile(employment_letter) : null,
    ]);

    const data = {
      applicant_cv: applicantCvUrl,
      higher_education_certifications: higherEducationCertificationsUrl,
      other_certificate: otherCertificateUrl,
      training_certificate: trainingCertificateUrl,
      employment_letter: employmentLetterUrl,
      user_id: userId,
      ...rest,
    };

    const newCertification = await FormsRepo.createCompetencyCertificationWelder(data);

    return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Competency certification welder created successfully.",
      DATA: newCertification,
    };
  } catch (error) {
    console.error("Error creating competency certification welder:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error creating competency certification welder.",
    };
  }
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


exports.updateCompetencyCertificationWelder = async (req, id) => {
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

  const existingCertification = await FormsRepo.findCompetencyCertificationWelderById(id);

  if (!existingCertification) {
    return {
      STATUS_CODE: StatusCodes.NOT_FOUND,
      STATUS: false,
      MESSAGE: "Competency certification welder not found.",
    };
  }

  let {
    applicant_cv,
    higher_education_certifications,
    other_certificate,
    training_certificate,
    employment_letter,
    certificate,
    ...rest
  } = req.body;

  let { certificate_image, ...certificateRest } = certificate || {};

  try {
    const [
      applicantCvUrl,
      higherEducationCertificationsUrl,
      otherCertificateUrl,
      trainingCertificateUrl,
      employmentLetterUrl,
      certificateImageUrl,
    ] = await Promise.all([
      applicant_cv ? uploadSingleFile(applicant_cv) : existingCertification.applicant_cv,
      higher_education_certifications ? uploadSingleFile(higher_education_certifications) : existingCertification.higher_education_certifications,
      other_certificate ? uploadSingleFile(other_certificate) : existingCertification.other_certificate,
      training_certificate ? uploadSingleFile(training_certificate) : existingCertification.training_certificate,
      employment_letter ? uploadSingleFile(employment_letter) : existingCertification.employment_letter,
      certificate_image ? uploadSingleFile(certificate_image) : existingCertification.certificate?.certificate_image,
    ]);

    const data = {
      applicant_cv: applicantCvUrl,
      higher_education_certifications: higherEducationCertificationsUrl,
      other_certificate: otherCertificateUrl,
      training_certificate: trainingCertificateUrl,
      employment_letter: employmentLetterUrl,
      certificate: {
        certificate_image: certificateImageUrl,
        ...certificateRest,
      },
      user_id: userId,
      ...rest,
    };

    const updatedCertifications = await FormsRepo.updateCompetencyCertificationWelder(id, data);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Competency certification welder updated successfully.",
      DATA: updatedCertifications,
    };
  } catch (error) {
    console.error("Error updating competency certification welder:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error updating competency certification welder.",
    };
  }
};


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

  const {
    manufacturers_report_certificate,
    construction_drawings_lifting_equipment,
    design_calculation,
    test_parameters_data,
    accreditation_documents_manufacturer,
    installation,
    quality_assurance_program,
    ...rest
  } = req.body;

  try {
    const [
      manufacturersReportCertificateUrl,
      constructionDrawingsLiftingEquipmentUrl,
      designCalculationUrl,
      testParametersDataUrl,
      accreditationDocumentsManufacturerUrl,
      installationUrl,
      qualityAssuranceProgramUrl,
    ] = await Promise.all([
      manufacturers_report_certificate ? uploadSingleFile(manufacturers_report_certificate) : null,
      construction_drawings_lifting_equipment ? uploadSingleFile(construction_drawings_lifting_equipment) : null,
      design_calculation ? uploadSingleFile(design_calculation) : null,
      test_parameters_data ? uploadSingleFile(test_parameters_data) : null,
      accreditation_documents_manufacturer ? uploadSingleFile(accreditation_documents_manufacturer) : null,
      installation ? uploadSingleFile(installation) : null,
      quality_assurance_program ? uploadSingleFile(quality_assurance_program) : null,
    ]);

    const data = {
      user_id: userId,
      manufacturers_report_certificate: manufacturersReportCertificateUrl,
      construction_drawings_lifting_equipment: constructionDrawingsLiftingEquipmentUrl,
      design_calculation: designCalculationUrl,
      test_parameters_data: testParametersDataUrl,
      accreditation_documents_manufacturer: accreditationDocumentsManufacturerUrl,
      installation: installationUrl,
      quality_assurance_program: qualityAssuranceProgramUrl,
      ...rest,
    };

    const newRegistration = await FormsRepo.createLiftingEquipmentRegistration(data);

    return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "Lifting equipment registration created successfully.",
      DATA: newRegistration,
    };
  } catch (error) {
    console.error("Error creating lifting equipment registration:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error creating lifting equipment registration.",
    };
  }
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

exports.updateLiftingEquipmentRegistration = async (req, id) => {
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  const existingRegistration = await FormsRepo.findLiftingEquipmentRegsitrationById(id);

  if (!existingRegistration) {
    return {
      STATUS_CODE: StatusCodes.NOT_FOUND,
      STATUS: false,
      MESSAGE: "Lifting equipment registration not found.",
    };
  }

  const {
    manufacturers_report_certificate,
    construction_drawings_lifting_equipment,
    design_calculation,
    test_parameters_data,
    accreditation_documents_manufacturer,
    installation,
    quality_assurance_program,
    certificate,
    ...rest
  } = req.body;

  let { certificate_image, ...certificateRest } = certificate || {};

  try {
    const [
      manufacturersReportCertificateUrl,
      constructionDrawingsLiftingEquipmentUrl,
      designCalculationUrl,
      testParametersDataUrl,
      accreditationDocumentsManufacturerUrl,
      installationUrl,
      qualityAssuranceProgramUrl,
      certificateImageUrl,
    ] = await Promise.all([
      manufacturers_report_certificate ? uploadSingleFile(manufacturers_report_certificate) : existingRegistration.manufacturers_report_certificate,
      construction_drawings_lifting_equipment ? uploadSingleFile(construction_drawings_lifting_equipment) : existingRegistration.construction_drawings_lifting_equipment,
      design_calculation ? uploadSingleFile(design_calculation) : existingRegistration.design_calculation,
      test_parameters_data ? uploadSingleFile(test_parameters_data) : existingRegistration.test_parameters_data,
      accreditation_documents_manufacturer ? uploadSingleFile(accreditation_documents_manufacturer) : existingRegistration.accreditation_documents_manufacturer,
      installation ? uploadSingleFile(installation) : existingRegistration.installation,
      quality_assurance_program ? uploadSingleFile(quality_assurance_program) : existingRegistration.quality_assurance_program,
      certificate_image ? uploadSingleFile(certificate_image) : existingRegistration.certificate?.certificate_image,
    ]);

    const data = {
      manufacturers_report_certificate: manufacturersReportCertificateUrl,
      construction_drawings_lifting_equipment: constructionDrawingsLiftingEquipmentUrl,
      design_calculation: designCalculationUrl,
      test_parameters_data: testParametersDataUrl,
      accreditation_documents_manufacturer: accreditationDocumentsManufacturerUrl,
      installation: installationUrl,
      quality_assurance_program: qualityAssuranceProgramUrl,
      certificate: {
        certificate_image: certificateImageUrl,
        ...certificateRest,
      },
      user_id: userId,
      ...rest,
    };

    const updatedRegistration = await FormsRepo.updateLiftingEquipmentRegsitration(id, data);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "Lifting equipment registration updated successfully.",
      DATA: updatedRegistration,
    };
  } catch (error) {
    console.error("Error updating lifting equipment registration:", error);
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "Error updating lifting equipment registration.",
    };
  }
};

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
  const userId = req?.user?.id;
  const userExist = await UserRepo.findUser({ id: userId });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.UNAUTHORIZED,
      STATUS: false,
      MESSAGE: "User not authenticated.",
    };
  }

  let { report } = req.body;
  
  // Check if a report is provided, and upload it if so
  report = report ? await uploadSingleFile(report) : null;

  const data = {
    ...req.body,
    report, // Include the report URL if uploaded
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

//user
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

  try {
    
    const existingReport = await FormsRepo.findReportById(id);

    if (!existingReport) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Report not found",
      };
    }

    let { report, ...update } = req.body;
    if (report) {
      report = await uploadSingleFile(report); 
    }

    const updatedData = {
      report: report || existingReport.report,
      ...update,
    };

  
    const updatedReport = await FormsRepo.updateReport(id, updatedData);

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

  try {
    const existingReport = await FormsRepo.findReportById(id);

    if (!existingReport) {
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Report not found",
      };
    }
    let certificate_image = req.body?.certificate_image;

    if (certificate_image) {
      certificate_image = await uploadSingleFile(certificate_image);
    } else {
      certificate_image = existingReport.certificate_image;
    }
    const updatedData = {
      ...req.body,
      certificate_image,
    };
    //find existingReort user email
    const user = await User.findOne({where:{id:existingReport.user_id}})
    const email = user.email
   
    const updatedReport = await FormsRepo.updateReport(id, updatedData);
    const reportDetails={
      status:updatedReport.status,
      url:`${process.env.REPORT_URL}/user/report/${updatedReport._id}`,
    }
    if(updatedReport)(
      await sendReportNotification(email,reportDetails)
    )
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

exports.createFeedback = async (feedbackData, userId,email) => {
  const userRole = await AdminRepo.findAdminUser({ email: email });
  const isAdmin = userRole?.userroleId === 1 ?true:false
  const adminFeedbackUrl = process.env.FEEDBACK_URL_ADMIN;
  const userFeedbackUrl = process.env.FEEDBACK_URL_USER;

  console.log(email)
  try {
    const { formId, formType, message } = feedbackData;
      const newFeedback = await Feedback.create({
        userId:userId,
        formId: formId,
        formType: formType,
        message: message,
        isAdmin: isAdmin
      });
      if(!newFeedback){
        return {
          STATUS_CODE: 400,
          STATUS: false,
          MESSAGE: "Failed to create feedback",
        };
      }
     if(isAdmin){
      const mail = {
        message:newFeedback.message,
        url:adminFeedbackUrl
      }
        await sendFeedbackNotification(email, mail);
        await User.update({isFeedBackReceived: true} ,{ where: { email } });
        
  
      }else{
        const mail = {
        message:newFeedback.message,
        url:userFeedbackUrl
        }
        await sendFeedbackNotification(email, mail);
        await AdminStaff.update({isFeedBackReceived: true} ,{ where: {userroleId:1 } });

      }
      return {
        STATUS_CODE: 201,
        STATUS: true,
        MESSAGE: "Feedback created successfully",
        DATA: newFeedback,
      }
  } catch (error) {
    console.error("Error creating feedback:", error);
    return {
      STATUS_CODE: 500,
      STATUS: false,
      MESSAGE: "Error creating feedback",
    };
  }
};

exports.getFeedback = async (formType, formId) => {
  try {
    const feedback = await Feedback.findAll({
      where: {
        formId: formId,
        formType: formType,
      },
      include: [
        {
          model:User,
          as: "user",
          attributes: ["id", "email", "first_name", "last_name"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    return {
      STATUS_CODE: 200,
      STATUS: true,
      MESSAGE: "Feedback retrieved successfully",
      DATA: feedback,
    };
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    return {
      STATUS_CODE: 500,
      STATUS: false,
      MESSAGE: "Error retrieving feedback",
    };
  }
};


exports.readFeedBack =async(email)=>{
  const userRole = await AdminRepo.findAdminUser({ email: email });
  const isAdmin = userRole?.userroleId === 1 ?true:false
  try {
    if(isAdmin){
      await AdminStaff.update({isFeedBackReceived:false},{where:{userroleId:1}})
    }else{
      await User.update({isFeedBackReceived:false},{where:{email}})
    }
    return {
      STATUS_CODE: 200,
      STATUS: true,
    };
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    return {
      STATUS_CODE: 500,
      STATUS: false,
      MESSAGE: "Error retrieving feedback",
    };
  }
}
//THE END