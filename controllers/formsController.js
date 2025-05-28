const FormsService = require("../services/formsServices");
const StatusCodes = require("../utils/statusCodes");
const{createCompetencyFormLiftOperator} = require("../services/formsServices")



//Authorization Approved

exports.createAuthorizationApproved = async (req, res) => {
  
    const data = await FormsService.createAuthorizationApproved(req, res);
 console.log("the data",data.DATA)
    return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA
    });
};


exports.getAuthorizationApprovedById = async (req, res) => {
  const { id } = req.params;
  const data = await FormsService.getAuthorizationApprovedById(id);
  return res.status(data.STATUS_CODE).json(data);
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

exports.updateAuthorizationApproved = async (req, res) => {
  const { id } = req.params;
  const data = await FormsService.updateAuthorizationApproved(req, id);
  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getAuthorizationApprovedByUserId= async (req, res) => {
    try {
        const userId  = req?.user?.id;
        const response = await FormsService.getAuthorizationApprovedByUserId(userId);
        res.status(response.STATUS_CODE).json(response);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
            STATUS: false,
            MESSAGE: "Error fetching data.",
        });
    }
  };

//get a classification

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


//Authorization Manufacturer
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

exports.updateAuthorizationManufacturer = async (req, res) => {
  const { id } = req.params;
  const data = await FormsService.updateAuthorizationManufacturer(req, id);
  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};


exports.getAuthorizationManufacturerById = async (req, res) => {
  const { id } = req.params;
  const data = await FormsService.getAuthorizationManufacturerById(id);
  return res.status(200).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getAuthorizationManufacturerByUserId= async (req, res) => {
    try {
        const userId  = req?.user?.id;
        const response = await FormsService.getAuthorizationManufacturerByUserId(userId);
        res.status(response.STATUS_CODE).json(response);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
            STATUS: false,
            MESSAGE: "Error fetching data.",
        });
    }
  };

//Authorization Training
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


exports.getAuthorizationTrainingByUserId= async (req, res) => {
    try {
        const userId  = req?.user?.id;
        const response = await FormsService.getAuthorizationTrainingByUserId(userId);
        res.status(response.STATUS_CODE).json(response);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
            STATUS: false,
            MESSAGE: "Error fetching data.",
        });
    }
  };

  exports.getAuthorizationTrainingById = async (req, res) => {
    const { id } = req.params;
    const data = await FormsService.getAuthorizationTrainingById(id);
    return res.status(data.STATUS_CODE).json(data);
  };

  exports.updateAuthorizationTraining = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await FormsService.updateAuthorizationTraining(req, id);
  
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


  //Boiler Registration
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
    try {
        const userId  = req?.user?.id;
        const response = await FormsService.getBoilerRegistrationByUserId(userId);
        res.status(response.STATUS_CODE).json(response);
    } catch (error) {
        console.error("Error fetching boiler registrations:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
            STATUS: false,
            MESSAGE: "Error fetching boilers registrations.",
        });
    }
  };

  exports.getBoilerRegistrationById = async (req, res) => {
    const { id } = req.params;
    const data = await FormsService.getBoilerRegistrationsById(id);
    return res.status(data.STATUS_CODE).json(data);
  };

  exports.updateBoilerRegistration = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await FormsService.updateBoilerRegistration(req, id);
  
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

exports.getCompetencyCertificationLiftOperatorByUserId = async (req, res) => {
  const userId = req?.user?.id
  const data = await FormsService.getCompetencyCertificationLiftOperatorByUserId(userId);
  return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
  });
};


exports.getCompetencyCertifcationLiftOperatorById = async (req, res) => {
const { id } = req.params;
const data = await FormsService.getCompetencyCertificationLiftOperatorFormById(id);
return res.status(data.STATUS_CODE).json({
  status: data.STATUS,
  message: data.MESSAGE,
  data: data.DATA,
});
};

exports.updateCompetencyCertifcationLiftOperator = async (req, res) => {
const { id } = req.params;
const data = await FormsService.updateCompetencyCertificationLiftOperator(req, id);
return res.status(data.STATUS_CODE).json({
  status: data.STATUS,
  message: data.MESSAGE,
  data: data.DATA,
});
};

// exports.deleteCompetencyCertifcationLiftOperator = async (req, res) => {
// const { id } = req.params;
// const data = await FormsService.deleteCompetencyCertifcationLiftOperator(id);
// return res.status(data.STATUS_CODE).json({
//   status: data.STATUS,
//   message: data.MESSAGE,
// });
// };


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

exports.getRenewalFormByUserId= async (req, res) => {
    try {
        const userId  = req?.user?.id;
        const response = await FormsService.getRenewalFormByUserId(userId);
        res.status(response.STATUS_CODE).json(response);
    } catch (error) {
        console.error("Error fetching renewal forms:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
            STATUS: false,
            MESSAGE: "Error fetching renewal forms.",
        });
    }
  };


exports.getRenewalFormById = async (req, res) => {
  const { id } = req.params;
  const response = await FormsService.getRenewalFormId(id);
  res.status(response.STATUS_CODE).json(response);
};

exports.updateRenewalForm = async (req, res) => {
  const { id } = req.params;
  const response = await FormsService.updateRenewalForm(req, id);
  res.status(response.STATUS_CODE).json(response);
};



//create operator certification
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

exports.getCompetencyCertificationLiftingByUserId= async (req, res) => {
    try {
        const userId  = req?.user?.id;
        const response = await FormsService.getCompetencyCertificationLiftingByUserId(userId);
        res.status(response.STATUS_CODE).json(response);
    } catch (error) {
        console.error("Error fetching competency certificate lifting:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
            STATUS: false,
            MESSAGE: "Error fetching competency certificate lifting.",
        });
    }
  };

exports.getCompetencyCertificationLiftingById = async (req, res) => {
  const { id } = req.params;
  const response = await FormsService.getCompetencyCertificationLiftingById(id);
  res.status(response.STATUS_CODE).json(response);
};
exports.updateCompetencyCertificationLifting = async (req, res) => {
  const { id } = req.params;
  const response = await FormsService.updateCompetencyCertificationLifting(req, id);
  res.status(response.STATUS_CODE).json(response);
};



// CompetencyCertificationInspection Controller Functions
exports.createCompetencyCertificationInspection = async (req, res) => {
  const response = await FormsService.createCompetencyCertificationInspection(req);
  res.status(response.STATUS_CODE).json(response);
};

exports.getAllCompetencyCertificationInspection = async (req, res) => {
  const response = await FormsService.getAllCompetencyCertificationInspection()
  res.status(response.STATUS_CODE).json(response);
};
exports.getCompetencyCertificationInspectionById = async (req, res) => {
  const { id } = req.params;
  const response = await FormsService.getCompetencyCertificationInspectionById(id);
  res.status(response.STATUS_CODE).json(response);
};
exports.getAllCompetencyCertificationInspectionByUserId = async (req, res) => {
    try {
      const userId = req.user.id;
      const response = await FormsService.getCompetencyCertificationInspectionByUserId(userId);
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

exports.updateCompetencyCertificationInspection = async (req,res)=>{
  const { id } = req.params;
  const response = await FormsService.updateCompetencyCertificationInspection(req, id);
  console.log(response);
  res.status(response.STATUS_CODE).json(response);
}



// CompetencyCertificationInspection Controller Functions
exports.createCompetencyCertificationBoiler = async (req, res) => {
  const response = await FormsService.createCompetencyCertificationBoiler(req);
  res.status(response.STATUS_CODE).json(response);
};

exports.getAllCompetencyCertificationBoiler = async (req, res) => {
  const response = await FormsService.getAllCompetencyCertificationBoiler()
  res.status(response.STATUS_CODE).json(response);
};

exports.getAllCompetencyCertificationBoilerByUserId= async (req, res) => {
    try {
        const userId  = req?.user?.id;
        const response = await FormsService.getCompertencyCertificationBoilerByUserId(userId);
        res.status(response.STATUS_CODE).json(response);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
            STATUS: false,
            MESSAGE: "Error fetching data.",
        });
    }
  };


exports.getAllCompetencyCertificationBoilerById = async (req, res) => {

  const {id} = req.params
  try {
    
    const response = await FormsService.getCompertencyCertificationBoilerById(id);
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
exports.updateCompetencyCertificationBoiler = async (req,res)=>{
  const { id } = req.params;
  const response = await FormsService.updateCompetencyCertificationBoiler(req, id);
  console.log(response);
  res.status(response.STATUS_CODE).json(response);
}
// CompetencyCertificationwelder Controller Functions
exports.createCompetencyCertificationwelder = async (req, res) => {
  const response = await FormsService.createCompetencyCertificationWelder(req);
  res.status(response.STATUS_CODE).json(response);
};

exports.getAllCompetencyCertificationWelder = async (req, res) => {
  const response = await FormsService.getAllCompetencyCertificationWelder()
  res.status(response.STATUS_CODE).json(response);
};

exports.getCompetencyCertificationWelderById = async (req, res) => {

  const {id} = req.params
  try {
    const response = await FormsService.getCompetencyCertificationWelderById(id);
    res.status(response.STATUS_CODE).json(response);
  } catch (error) {
    console.error("Error fetching competency forms by ID:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Error fetching competency forms by user ID",
      });
  }
};
exports.getAllCompetencyCertificationWelderByUserId = async (req, res) => {
  try {
    const userId = req?.user?.id;
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
exports.updateCompetencyCertificationWelder = async (req,res)=>{
  const { id } = req.params;
  const response = await FormsService.updateCompetencyCertificationWelder(req, id);
  console.log(response);
  res.status(response.STATUS_CODE).json(response);
}


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

exports.updateLiftingEquipmentRegistration = async (req,res)=>{
  const { id } = req.params;
  const response = await FormsService.updateLiftingEquipmentRegistration(req, id);
  console.log(response);
  res.status(response.STATUS_CODE).json(response);
}
exports.getLiftingEquipmentRegistrationById = async (req, res) => {

  const {id} = req.params
  try {
    const response = await FormsService.getLiftingEquipmentRegistrationById(id);
    res.status(response.STATUS_CODE).json(response);
  } catch (error) {
    console.error("Error fetching equpment registration forms by ID:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
        STATUS: false,
        MESSAGE: "Error fetching fetching equpment registration  forms by user ID",
      });
  }
};


//report controller logic
// Report Controller Functions
exports. createReport = async (req, res) => {
  try {
    const report = await FormsService.createReport(req);
    res.status(201).json(report);
  } catch (error) {
    console.error("Error in controller creating report:", error);
    res.status(500).json({ message: "Failed to create report", error: error.message });
  }
};

exports.getReportByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await FormsService.getReportByUserId(userId);
    return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
    });
  } catch (error) {
    console.error("Error in getReportByUserId controller:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await FormsService.getAllReports();
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error in controller fetching all reports:", error);
    res.status(500).json({ message: "Failed to fetch reports", error: error.message });
  }
};

exports.getReportById = async (req, res) => {
    try {
      const report = await FormsService.getReportId(req);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.status(200).json(report);
    } catch (error) {
      console.error("Error in controller fetching report by ID:", error);
      res.status(500).json({ message: "Failed to fetch report", error: error.message });
    }
  };
  exports.updateUserReport = async (req, res) => {
    const data = await FormsService.updateUserReport(req);
  
    return res.status(data.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
    });
  };
exports.updateReport = async (req, res) => {
  try {
    const report = await FormsService.updateReport(req);
    res.status(200).json({ message: "Report updated successfully", report });
  } catch (error) {
    console.error("Error in controller updating report:", error);
    res.status(500).json({ message: "Failed to update report", error: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    await FormsService.deleteReport(req.params.id);
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error in controller deleting report:", error);
    res.status(500).json({ message: "Failed to delete report", error: error.message });
  }
};

exports.createFeedback = async (req, res) => {
  const data = await FormsService.createFeedback(req.body, req.user.id,req.user?.email); 
  return res.status(data.STATUS_CODE).json(data);
};

exports.getFeedback = async (req, res) => {
  const { formType, formId } = req.params;
  const data = await FormsService.getFeedback(formType, formId);
  return res.status(data.STATUS_CODE).json(data);
};

exports.feedBackRead =async(req,res)=>{
  const {email} = req.params;
  const data = await FormsService.readFeedBack(email);
  return res.status(data.STATUS_CODE).json(data);
}