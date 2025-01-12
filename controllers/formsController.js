const FormsService = require("../services/formsServices");


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
    const data = await FormsService.createAuthorizationTraining(req);
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

  exports.getAuthorizationTrainingByUserId = async (req, res) => {
    const { userId } = req.params;
    const data = await FormsService.getAuthorizationTrainingByUserId(userId);
    return res.status(200).json({ status: true, message: "Fetched successfully", data });
  };
