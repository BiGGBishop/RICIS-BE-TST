const FormsService = require("../services/formsServices");
const StatusCodes = require("../utils/statusCodes");
const{createCompetencyFormLiftOperator} = require("../services/formsServices")


exports.createAuthorizationApproved = async (req, res) => {
  
    const data = await FormsService.createAuthorizationApproved(req, res);
 console.log("the data",data.DATA)
    return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA
    });
};



exports.getAllAuthorizationApproved = async (req, res) => {
  try {
    const allAuthorizations = await FormsService.getAllAuthorizationApproved();

    return res.status(201).json({
      status: true,
      message: "Authorization Approved records retrieved successfully",
      data: allAuthorizations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      status: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAClassifications = async (req, res) => {
  // Pass the necessary data (e.g., req.params.classId and req.user.id) to the service
  const classId = req.params.classId;  // The classId from the URL
  const userId = req.user?.id;         // The user ID from the authenticated user (assuming it's set in the token)

  const data = await FormsService.getAClassifications(classId, userId); // Pass only necessary data

  return res.status(200).json({                                                                                                                             
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};



exports.createAuthorizationManufacturer = async (req, res) => {
  try {
    const newAuthorizationData = await FormsService.createAuthorizationManufacturer(req);

    return res.status(201).json({
      status: true,
      message: "Authorization Manufacturer record created successfully",
      data: newAuthorizationData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllAuthorizationManufacturer = async (req, res) => {
  const data = await FormsService.getAllAuthorizationManufacturer();
  return res.status(200).json({ status: true, message: "Fetched successfully", data });
};

exports.getAuthorizationManufacturerByUserId = async (req, res) => {
  const { userId } = req.params;
  const data = await FormsService.getAuthorizationManufacturerByUserId(userId);
  return res.status(200).json({ status: true, message: "Fetched successfully", data });
};

exports.createAuthorizationTraining = async (req, res) => {
  try {
    const data = await FormsService.createTrainingAuthorization(req);
    return res.status(201).json({
      status: true,
      message: "Training authorization created successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllAuthorizationTraining = async (req, res) => {
    try {
      const allAuthorizations = await FormsService.getAllAuthorizationTraining();
  
      return res.status(201).json({
        status: true,
        message: "Authorization Training records retrieved successfully",
        data: allAuthorizations,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.updateAuthorizationApproved = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await FormsService.updateAuthorizationApproved(req, id);
  
      return res.status(data.STATUS_CODE).json({
        status: data.STATUS,
        message: data.MESSAGE,
        data: data.DATA,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };

  exports.getAuthorizationTrainingByUserId = async (req, res) => {
    const { userId } = req.params;
    const data = await FormsService.getAuthorizationTrainingByUserId(userId);
    return res.status(200).json({ status: true, message: "Fetched successfully", data });
  };


  exports.createBoilerRegistration = async (req, res) => {
    const data = await FormsService.createBoilerRegistration(req);
  
    return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
    });
  };
  
  exports.getAllBoilerRegistrations = async (req, res) => {
      try {
          const allBoilerRegistrations = await FormsService.getAllBoilerRegistrations();
  
          return res.status(200).json({
              status: true,
              message: "Boiler registrations retrieved successfully",
              data: allBoilerRegistrations,
          });
      } catch (error) {
          console.error(error);
          return res.status(500).json({
              status: false,
              message: "Internal Server Error",
          });
      }
  };
  
  exports.getBoilerRegistrationByUserId = async (req, res) => {
      const { userId } = req.params;
      const data = await FormsService.getBoilerRegistrationsByUserId(userId);
      return res.status(200).json({ status: true, message: "Fetched successfully", data });
  };


  // New functions for CompetencyCertificationForm
exports.createCompetencyCertificationLiftOperator = async (req, res) => {
  try{
  const data = await createCompetencyFormLiftOperator(req);
  return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
  });
}catch(error){
  console.log(error)
  }
};

exports.getAllCompetencyCertificationLiftOperator = async (req, res) => {
  const data = await FormsService.getAllCompetencyCertificationLiftOperator();
  return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
  });
};

exports.getCompetencyFormByUserId = async (req, res) => {
  const { userId } = req.params;
  const data = await FormsService.getCompetencyFormByUserId(userId);
  return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
  });
};

exports.getCompetencyFormById = async (req, res) => {
const { id } = req.params;
const data = await FormsService.getCompetencyFormById(id);
return res.status(data.STATUS_CODE).json({
  status: data.STATUS,
  message: data.MESSAGE,
  data: data.DATA,
});
};

exports.updateCompetencyForm = async (req, res) => {
const { id } = req.params;
const data = await FormsService.updateCompetencyForm(req, id);
return res.status(data.STATUS_CODE).json({
  status: data.STATUS,
  message: data.MESSAGE,
  data: data.DATA,
});
};

exports.deleteCompetencyForm = async (req, res) => {
const { id } = req.params;
const data = await FormsService.deleteCompetencyForm(id);
return res.status(data.STATUS_CODE).json({
  status: data.STATUS,
  message: data.MESSAGE,
});
};


exports.createRenewalForm = async (req, res) => {
  try {
    const response = await FormsService.createRenewalForm(req);
    res.status(response.STATUS_CODE).json(response);
  } catch (error) {
    console.error("Error creating renewal form:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Error creating renewal form",
      });
  }
};

exports.getAllRenewalForms = async (req, res) => {
  try {
    const response = await FormsService.getAllRenewalForms();
    res.status(response.STATUS_CODE).json(response);
  } catch (error) {
    console.error("Error fetching renewal forms:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Error fetching renewal forms",
      });
  }
};

exports.getRenewalFormByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await FormsService.getRenewalFormByUserId(userId);
    res.status(response.STATUS_CODE).json(response);
  } catch (error) {
    console.error("Error fetching renewal forms by user ID:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Error fetching renewal forms by user ID",
      });
  }
};

exports.createOperatorCertification = async (req, res) => {
  const response = await FormsService.createOperatorCertification(req);
  res.status(response.STATUS_CODE).json(response);
};

exports.getAllOperatorCertifications = async (req, res) => {
  const response = await FormsService.getAllOperatorCertifications();
  res.status(response.STATUS_CODE).json(response);
};

exports.getOperatorCertificationsByUserId = async (req, res) => {
  const userId = req?.user?.id;
  const response = await FormsService.getOperatorCertificationsByUserId(userId);
  res.status(response.STATUS_CODE).json(response);
};

exports.getOperatorCertificationById = async (req, res) => {
  const { id } = req.params;
  const response = await FormsService.getOperatorCertificationById(id);
  res.status(response.STATUS_CODE).json(response);
};

exports.updateOperatorCertification = async (req, res) => {
  const { id } = req.params;
  const response = await FormsService.updateOperatorCertification(req, id);
  res.status(response.STATUS_CODE).json(response);
};

exports.deleteOperatorCertification = async (req, res) => {
  const { id } = req.params;
  const response = await FormsService.deleteOperatorCertification(id);
  res.status(response.STATUS_CODE).json(response);
};




// CompetencyCertificationLifting Controller Functions
exports.createCompetencyCertificationLifting = async (req, res) => {
  const response = await FormsService.createCompetencyCertificationLifting(req);
  res.status(response.STATUS_CODE).json(response);
};

exports.getAllCompetencyCertificationLifting = async (req, res) => {
  const response = await FormsService.getAllCompetencyCertificationLiftings();
  res.status(response.STATUS_CODE).json(response);
};

exports.getCompetencyCertificationLiftingByUserId = async (req, res) => {
  const userId = req?.user?.id;
  const response = await FormsService.getCompetencyCertificationLiftingByUserId(userId);
  res.status(response.STATUS_CODE).json(response);
};

exports.getCompetencyCertificationLiftingById = async (req, res) => {
  const { id } = req.params;
  const response = await FormsService.getCompetencyCertificationLiftingById(id);
  res.status(response.STATUS_CODE).json(response);
};


// CompetencyCertificationInspection Controller Functions
exports.createCompetencyCertificationInspection = async (req, res) => {
  const response = await FormsService.createCompetencyCertificationInspection
(req);
  res.status(response.STATUS_CODE).json(response);
};

exports.getAllCompetencyCertificationInspection = async (req, res) => {
  const response = await FormsService.getAllCompetencyCertificationInspection()
  res.status(response.STATUS_CODE).json(response);
};

exports.getAllCompetencyCertificationInspectionByUserId = async (req, res) => {
    try {
      const userId = req.user.id;
      const response = await FormsService.getAllCompetencyCertificationInspectionByUserId(userId);
      res.status(response.STATUS_CODE).json(response);
    } catch (error) {
      console.error("Error fetching renewal forms by user ID:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
          STATUS: false,
          MESSAGE: "Error fetching renewal forms by user ID",
        });
    }
};


// CompetencyCertificationwelder Controller Functions
exports.createCompetencyCertificationwelder = async (req, res) => {
  const response = await FormsService.createCompetencyCertificationWelder(req);
  res.status(response.STATUS_CODE).json(response);
};

exports.getAllCompetencyCertificationWelder = async (req, res) => {
  const response = await FormsService.getAllCompetencyCertificationWelder()
  res.status(response.STATUS_CODE).json(response);
};


exports.getAllCompetencyCertificationWelderByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await FormsService.getCompetencyCertificationWelderByUserId(userId);
    res.status(response.STATUS_CODE).json(response);
  } catch (error) {
    console.error("Error fetching renewal forms by user ID:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Error fetching renewal forms by user ID",
      });
  }
};



exports.createLiftingEquipmentRegistration = async (req, res) => {
  try {
    const response = await FormsService.createLiftingEquipmentRegistration(req);
    res.status(response.STATUS_CODE).json(response);
  } catch (error) {
    console.error("Error creating lifting equipment registration:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Error creating lifting equipment registration.",
      });
  }
};

exports.getLiftingEquipmentRegistrationByUserId = async (req, res) => {
    try {
        const userId  = req?.user?.id;
        const response = await FormsService.getLiftingEquipmentRegistrationByUserId(userId);
        res.status(response.STATUS_CODE).json(response);
    } catch (error) {
        console.error("Error fetching lifting equipment registrations:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
            STATUS: false,
            MESSAGE: "Error fetching lifting equipment registrations.",
        });
    }
};

exports.getAllLiftingEquipmentRegistration = async (req, res) => {
    try {
        const response = await FormsService.getAllLiftingEquipmentRegistration();
        res.status(response.STATUS_CODE).json(response);
    } catch (error) {
        console.error("Error fetching all lifting equipment registrations:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
            STATUS: false,
            MESSAGE: "Error fetching all lifting equipment registrations.",
        });
    }
};