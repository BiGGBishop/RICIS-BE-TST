const { AuthorizationApproved } = require("../sequelize/models");
const { AuthorizationManufacturer } = require("../sequelize/models");
const { TrainingOrganizationForm } = require("../sequelize/models");
const {BoilerRegistration} = require("../sequelize/models")
const { CompetencyCertificationFormBoiler } = require("../sequelize/models");
const {RenewalForm} = require("../sequelize/models");
const {User} = require("../sequelize/models")
const {Classification} = require("../sequelize/models")
const {OperatorCertification} = require("../sequelize/models")
const {CompetencyCertificationLifting} = require("../sequelize/models");
const {AuthorizedInspectorCertification} = require("../sequelize/models");
const {CompetencyCertificationWelder} = require("../sequelize/models");
const {LiftingEquipmentRegistration} = require("../sequelize/models");
const {CompetencyCertificationFormLiftOperator}= require("../sequelize/models/");
const {Report} = require ("../sequelize/models");
const boilerregistration = require("../sequelize/models/boilerregistration");
const { ClassificationFees, Fee } = require("../sequelize/models");
const { fetchClassifications } = require("../repositories/adminRepo");
const { Op } = require("sequelize");


exports.create = async (data) => {
  try {
    const response = await AuthorizationApproved.create(data);
    console.log("the data ...",response)
    return response;
  } catch (error) {                                                            
    console.error("Error details:", error);
  }                                               
};

exports.findAllAuthorizationApproved = async () => {
  try {
    const response = await AuthorizationApproved.findAll({
      include: [
        {
          model: Classification,
          as: 'classification',
          attributes: ['id', 'classification_name'], // Adjust attributes as needed
        },
      ],
      attributes: { exclude: [] },              
      order: [['createdAt', 'DESC']], // Sort by most recent
    });
    return response;    
  }catch (error) {
    console.error("Error details:", error);
  }                                                                                             
};   

exports.updateAuthorizationApproved = async (id, data) => {
  try {
    const [updatedRows] = await AuthorizationApproved.update(data, {
      where: { id: id },
    });

    if (updatedRows === 0) {
      return null; // Indicate that the record was not found
    }

    return await AuthorizationApproved.findByPk(id);
  } catch (error) {
    console.error("Error updating AuthorizationApproved:", error);
    throw error; 
  }
};

exports.findAuthorizationApprovedById = async (id) => {
  try {
    const response = await AuthorizationApproved.findByPk(id);

    if (!response) return null;

    let { application_type } = response;

    if (application_type === "New Application") {
      application_type = "Fresh Application";
    } else if (application_type === "Re-Application") {
      application_type = "Renewal Application";
    }

    // Fetch Classification Data
    const classificationData = await fetchClassifications({
      id: response.classificationId,
    });

    let incidentalClassifications = [];
    if (response.incidentalIds && response.incidentalIds.length > 0) {
      // Ensure incidentalIds is always treated as an array
      const incidentalIds = Array.isArray(response.incidentalIds) 
        ? response.incidentalIds 
        : [response.incidentalIds];  // Force it to an array even if it's a single ID

      const incidentalRecords = await Classification.findAll({
        where: {
          [Op.or]: [
            { classification_number: { [Op.in]: incidentalIds } },
            { id: { [Op.in]: incidentalIds } },
          ],
        },
        attributes: ["id"],
      });

      const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);

      incidentalClassifications =
        incidentalIdsFromRecords.length > 0
          ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
          : [];
    }

    // Filter classificationIdFees based on application_type
    const classificationIdFees = classificationData.flatMap((classification) =>
      (classification.classificationFees || []).filter((fee) =>
        fee.fee.application_type?.includes(application_type)
      )
    );

    // Fetch incidentalIdsFees without filtering based on application_type
    const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
      classification.classificationFees || []
    );

    // Attach fees separately
    response.dataValues.classificationIdFees = classificationIdFees;
    response.dataValues.incidentalIdsFees = incidentalIdsFees;

    return response;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};

exports.findByUserIdAuthorizationApproved  = async    (userId, options = {}) => {
  console.log("working...")
  return  AuthorizationApproved.findAll({
    where: { user_id: userId },
    ...options,
  });
};

//crate authorization manufacturer

exports.createAuthorizationManufacturer = async (data) => {
  return AuthorizationManufacturer.create(data);                                                            
};

exports.findAllAuthorizationManufacturer = async () => {
  return AuthorizationManufacturer.findAll();
};       

exports.updateAuthorizationManufacturer = async (id, data) => {
  try {
    const [updatedRows] = await AuthorizationManufacturer.update(data, {
      where: { id: id },
    });
   
    if (updatedRows === 0) {
      return null; // Indicate that the record was not found
    }

    return await AuthorizationManufacturer.findByPk(id); 
  } catch (error) {
    console.error("Error updating AuthorizationManufacturer:", error);
    throw error;
  }
};

exports.findAuthorizationManufacturerById = async (id) => {
  try {
    const response = await AuthorizationManufacturer.findByPk(id);
    
    if (!response) return null;

    let { application_type } = response;

    if (application_type === "New Application") {
      application_type = "Fresh Application";
    } else if (application_type === "Re-Application") {
      application_type = "Renewal Application";
    }

    // Fetch Classification Data
    const classificationData = await fetchClassifications({
      id: response.classificationId,
    });

    let incidentalClassifications = [];
    if (response.incidentalIds && response.incidentalIds.length > 0) {
      const incidentalIds = Array.isArray(response.incidentalIds) 
        ? response.incidentalIds 
        : [response.incidentalIds];

      const incidentalRecords = await Classification.findAll({
        where: {
          [Op.or]: [
            { classification_number: { [Op.in]: incidentalIds } },
            { id: { [Op.in]: incidentalIds } },
          ],
        },
        attributes: ["id"],
      });

      const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);

      incidentalClassifications =
        incidentalIdsFromRecords.length > 0
          ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
          : [];
    }

    // Filter classificationIdFees based on application_type
    const classificationIdFees = classificationData.flatMap((classification) =>
      (classification.classificationFees || []).filter((fee) =>
        fee.fee.application_type?.includes(application_type)
      )
    );

    // Fetch incidentalIdsFees without filtering based on application_type
    const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
      classification.classificationFees || []
    );

    // Attach fees separately
    response.dataValues.classificationIdFees = classificationIdFees;
    response.dataValues.incidentalIdsFees = incidentalIdsFees;

    return response;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
}; 

exports.findByUserIdAuthorizationManufacturer = async (userId, options = {}) => {
  return await AuthorizationManufacturer.findAll({
    where: { user_id: userId },
    ...options,
  });
};


//createTraining authorization
exports.createTrainingAuthorization = async (data) => {
  return   TrainingOrganizationForm.create(data);
};        

exports.findAllTrainingAuthorization = async () => {
    return  TrainingOrganizationForm.findAll();
  };


  exports.updateTrainingAuthorization = async(id,data)=>{
    try {
      const [updatedRows] = await TrainingOrganizationForm.update(data,
      {  where: { id: id },
      });
     
      if (updatedRows === 0) {
        return null; // Indicate that the record was not found
      }
  
      return await TrainingOrganizationForm.findByPk(id); 
    } catch (error) {
      console.error("Error updating TrainingOrganizationForm:", error);
      throw error;
    }
  };

exports.findByUserIdTrainingAuthorization = async (userId ,options = {}) => {
  return await TrainingOrganizationForm.findAll({
    where: { user_id: userId },
    ...options,
  });
};

exports.findTrainingAuthorizationById = async (id) => {
  try {
    const response = await TrainingOrganizationForm.findByPk(id);
    
    if (!response) return null;

    let { application_type } = response;

    if (application_type === "New Application") {
      application_type = "Fresh Application";
    } else if (application_type === "Re-Application") {
      application_type = "Renewal Application";
    }

    // Fetch Classification Data
    const classificationData = await fetchClassifications({
      id: response.classificationId,
    });

    let incidentalClassifications = [];
    if (response.incidentalIds && response.incidentalIds.length > 0) {
      const incidentalIds = Array.isArray(response.incidentalIds) 
        ? response.incidentalIds 
        : [response.incidentalIds];

      const incidentalRecords = await Classification.findAll({
        where: {
          [Op.or]: [
            { classification_number: { [Op.in]: incidentalIds } },
            { id: { [Op.in]: incidentalIds } },
          ],
        },
        attributes: ["id"],
      });

      const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);

      incidentalClassifications =
        incidentalIdsFromRecords.length > 0
          ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
          : [];
    }

    // Filter classificationIdFees based on application_type
    const classificationIdFees = classificationData.flatMap((classification) =>
      (classification.classificationFees || []).filter((fee) =>
        fee.fee.application_type?.includes(application_type)
      )
    );

    // Fetch incidentalIdsFees without filtering based on application_type
    const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
      classification.classificationFees || []
    );

    // Attach fees separately
    response.dataValues.classificationIdFees = classificationIdFees;
    response.dataValues.incidentalIdsFees = incidentalIdsFees;

    return response;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};

  //Boier registration
exports.createBoilerRegistrationRepo = async (data) => {
    return  await BoilerRegistration.create(data);
  };
  
  exports.findAllBoilerRegistrationRepos = async () => {
      return await BoilerRegistration.findAll();
  };
  
  exports.findByUserIdBoilerRegistrationRepos = async (userId, options={}) => {
      return  await BoilerRegistration.findAll({ where: { user_id: userId},
        ...options
       });
  };

  exports.updateBoilerRegistration = async(id,data)=>{
    try {
      const [updatedRows] = await BoilerRegistration.update(data,{
        where: { id: id },
     } );
     
      if (updatedRows === 0) {
        return null; // Indicate that the record was not found
      }
  
      return await BoilerRegistration.findByPk(id); 
    } catch (error) {
      console.error("Error updating TrainingOrganizationForm:", error);
      throw error;
    }
  };

  exports.findBoilerRegistrationById = async (id) => {
    return BoilerRegistration.findByPk(id);
  }


  //competencyFormLiftOperationCertification
  exports.createCompetencyCertificationLiftOperator= async(data)=>{
    return CompetencyCertificationFormLiftOperator.create(data);
  };

  exports.findAllCompetencyCertificationLiftOperator= async()=>{
    return CompetencyCertificationFormLiftOperator.findAll();
  };

  exports.findByUserIdCompetencyCertificationLiftOperator= async(userId,options = {}) => {
    return await CompetencyCertificationFormLiftOperator.findAll({
      where: { user_id: userId },
      ...options,
    });
  };

  exports.findCompetencyCertificationLiftFormById = async (id) => {
    try {
      const response = await CompetencyCertificationFormLiftOperator.findByPk(id);
  
      if (!response) return null;
  
      let { application_type } = response;
  
      if (application_type === "New Application") {
        application_type = "Fresh Application";
      } else if (application_type === "Re-Application") {
        application_type = "Renewal Application";
      }
  
      // Fetch Classification Data
      const classificationData = await fetchClassifications({
        id: response.classificationId,
      });
  
      let incidentalClassifications = [];
      if (response.incidentalIds && response.incidentalIds.length > 0) {
        const incidentalIds = Array.isArray(response.incidentalIds) 
          ? response.incidentalIds 
          : [response.incidentalIds];
  
        const incidentalRecords = await Classification.findAll({
          where: {
            [Op.or]: [
              { classification_number: { [Op.in]: incidentalIds } },
              { id: { [Op.in]: incidentalIds } },
            ],
          },
          attributes: ["id"],
        });
  
        const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);
  
        incidentalClassifications =
          incidentalIdsFromRecords.length > 0
            ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
            : [];
      }
  
      // Filter classificationIdFees based on application_type
      const classificationIdFees = classificationData.flatMap((classification) =>
        (classification.classificationFees || []).filter((fee) =>
          fee.fee.application_type?.includes(application_type)
        )
      );
  
      // Fetch incidentalIdsFees without filtering based on application_type
      const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
        classification.classificationFees || []
      );
  
      // Attach fees separately
      response.dataValues.classificationIdFees = classificationIdFees;
      response.dataValues.incidentalIdsFees = incidentalIdsFees;
  
      return response;
    } catch (error) {
      console.error("Error details:", error);
      throw error;
    }
  };  

  exports.updateCompetencyCertificationLiftForm= async (id, data) => {
    try {
      const [updatedRows] = await CompetencyCertificationFormLiftOperator.update(data,{
        where: { id: id },
     } );
     
      if (updatedRows === 0) {
        return null; // Indicate that the record was not found
      }
  
      return await CompetencyCertificationFormLiftOperator.findByPk(id); 
    } catch (error) {
      console.error("Error updating cerification:", error);
      throw error;
    }
  };




  //certififcation form boiler
  exports.createCompetencyCertificationFormBoiler = async (data) => {
    return CompetencyCertificationFormBoiler.create(data);
  };
  
  exports.findAllCompetencyCertificationFormBoiler = async () => {
    return CompetencyCertificationFormBoiler.findAll();
  };
  
  exports.findByUserIdCompetencyCertificationFormBoiler= async (userId,options = {}) => {
    return await CompetencyCertificationFormBoiler.findAll({
      where: { user_id: userId },
      ...options,
    });
  };
   
  exports.findByIdCompetencyCertificationFormBoiler = async (id) => {
    try {
      const response = await CompetencyCertificationFormBoiler.findByPk(id);
  
      if (!response) return null;
  
      let { application_type } = response;
  
      if (application_type === "New Application") {
        application_type = "Fresh Application";
      } else if (application_type === "Re-Application") {
        application_type = "Renewal Application";
      }
  
      // Fetch Classification Data
      const classificationData = await fetchClassifications({
        id: response.classificationId,
      });
  
      let incidentalClassifications = [];
      if (response.incidentalIds && response.incidentalIds.length > 0) {
        const incidentalIds = Array.isArray(response.incidentalIds) 
          ? response.incidentalIds 
          : [response.incidentalIds];
  
        const incidentalRecords = await Classification.findAll({
          where: {
            [Op.or]: [
              { classification_number: { [Op.in]: incidentalIds } },
              { id: { [Op.in]: incidentalIds } },
            ],
          },
          attributes: ["id"],
        });
  
        const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);
  
        incidentalClassifications =
          incidentalIdsFromRecords.length > 0
            ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
            : [];
      }
  
      // Filter classificationIdFees based on application_type
      const classificationIdFees = classificationData.flatMap((classification) =>
        (classification.classificationFees || []).filter((fee) =>
          fee.fee.application_type?.includes(application_type)
        )
      );
  
      // Fetch incidentalIdsFees without filtering based on application_type
      const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
        classification.classificationFees || []
      );
  
      // Attach fees separately
      response.dataValues.classificationIdFees = classificationIdFees;
      response.dataValues.incidentalIdsFees = incidentalIdsFees;
  
      return response;
    } catch (error) {
      console.error("Error details:", error);
      throw error;
    }
  };  
  
  exports.updateCompetencyCertificationFormBoiler= async (id, data) => {
    try {
      const [updatedRows] = await CompetencyCertificationFormBoiler.update(data,{
        where: { id: id },
     } );
     
      if (updatedRows === 0) {
        return null; // Indicate that the record was not found
      }
  
      return await CompetencyCertificationFormBoiler.findByPk(id); 
    } catch (error) {
      console.error("Error updating TrainingOrganizationForm:", error);
      throw error;
    }
  };
  
  exports.deleteCompetencyCertificationFormBoiler= async (id) => {
    return CompetencyCertificationFormBoiler.destroy({ where: { id } });
  };

  // New functions for RenewalForm
exports.createRenewalForm = async (data) => {
  try {
    const response = await RenewalForm.create(data);
    return response;
  } catch (error) {
    console.error("Error creating renewal form:", error);
    throw error; // Re-throw the error to be caught by the service
  }
};


exports.findAllRenewalForms = async () => {
  return RenewalForm.findAll();
};
exports.findRenewalFormsByUserId= async (userId,options = {}) => {
  return await RenewalForm.findAll({
    where: { user_id: userId },
    ...options,
  });
};
 
exports.findRenewalFormsById = async (id) => {
  try {
    const response = await RenewalForm.findByPk(id);

    if (!response) return null;

    let { application_type } = response;

    if (application_type === "New Application") {
      application_type = "Fresh Application";
    } else if (application_type === "Re-Application") {
      application_type = "Renewal Application";
    }

    // Fetch Classification Data
    const classificationData = await fetchClassifications({
      id: response.classificationId,
    });

    let incidentalClassifications = [];
    if (response.incidentalIds && response.incidentalIds.length > 0) {
      const incidentalIds = Array.isArray(response.incidentalIds) 
        ? response.incidentalIds 
        : [response.incidentalIds];

      const incidentalRecords = await Classification.findAll({
        where: {
          [Op.or]: [
            { classification_number: { [Op.in]: incidentalIds } },
            { id: { [Op.in]: incidentalIds } },
          ],
        },
        attributes: ["id"],
      });

      const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);

      incidentalClassifications =
        incidentalIdsFromRecords.length > 0
          ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
          : [];
    }

    // Filter classificationIdFees based on application_type
    const classificationIdFees = classificationData.flatMap((classification) =>
      (classification.classificationFees || []).filter((fee) =>
        fee.fee.application_type?.includes(application_type)
      )
    );

    // Fetch incidentalIdsFees without filtering based on application_type
    const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
      classification.classificationFees || []
    );

    // Attach fees separately
    response.dataValues.classificationIdFees = classificationIdFees;
    response.dataValues.incidentalIdsFees = incidentalIdsFees;

    return response;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};


exports.updateRenewalForms= async (id, data) => {
  try {
    const [updatedRows] = await RenewalForm.update(data,{
      where: { id: id },
   } );
   
    if (updatedRows === 0) {
      return null; // Indicate that the record was not found
    }

    return await RenewalForm.findByPk(id); 
  } catch (error) {
    console.error("Error updating Renewal:", error);
    throw error;
  }
};


// New functions for OperatorCertification07
exports.createOperatorCertification = async (data) => {
  return OperatorCertification.create(data);
};

exports.findAllOperatorCertifications = async () => {
  return OperatorCertification.findAll();
};

exports.findByUserIdOperatorCertificationsByUserId  = async (userId,options = {}) => {
  return await OperatorCertification.findAll({
    where: { user_id: userId },
    ...options,
  });
};

exports.findOperatorCertificationById = async (id) => {
  try {
    const response = await OperatorCertification.findByPk(id);

    if (!response) return null;

    let { application_type } = response;

    if (application_type === "New Application") {
      application_type = "Fresh Application";
    } else if (application_type === "Re-Application") {
      application_type = "Renewal Application";
    }

    // Fetch Classification Data
    const classificationData = await fetchClassifications({
      id: response.classificationId,
    });

    let incidentalClassifications = [];
    if (response.incidentalIds && response.incidentalIds.length > 0) {
      const incidentalIds = Array.isArray(response.incidentalIds) 
        ? response.incidentalIds 
        : [response.incidentalIds];

      const incidentalRecords = await Classification.findAll({
        where: {
          [Op.or]: [
            { classification_number: { [Op.in]: incidentalIds } },
            { id: { [Op.in]: incidentalIds } },
          ],
        },
        attributes: ["id"],
      });

      const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);

      incidentalClassifications =
        incidentalIdsFromRecords.length > 0
          ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
          : [];
    }

    // Filter classificationIdFees based on application_type
    const classificationIdFees = classificationData.flatMap((classification) =>
      (classification.classificationFees || []).filter((fee) =>
        fee.fee.application_type?.includes(application_type)
      )
    );

    // Fetch incidentalIdsFees without filtering based on application_type
    const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
      classification.classificationFees || []
    );

    // Attach fees separately
    response.dataValues.classificationIdFees = classificationIdFees;
    response.dataValues.incidentalIdsFees = incidentalIdsFees;

    return response;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};

exports.updateOperatorCertification = async (id, data) => {
    return OperatorCertification.update(data, { where: { id } });
};

exports.deleteOperatorCertification = async (id) => {
    return OperatorCertification.destroy({ where: { id } });
};



// New functions for LifingOperatorCertification08
exports.createCompetencyCertificationLifting = async (data) => {
  return CompetencyCertificationLifting.create(data);
};

exports.findAllCompetencyCertificationLifting  = async () => {
  return CompetencyCertificationLifting.findAll();
};

exports.findCompetencyCertificationLiftingByUserId  = async (userId,options = {}) => {
  return await CompetencyCertificationLifting.findAll({
    where: { user_id: userId },
    ...options,
  });
};

exports.findCompetencyCertificationLiftingById = async (id) => {
  try {
    const response = await CompetencyCertificationLifting.findByPk(id);

    if (!response) return null;

    let { application_type } = response;

    if (application_type === "New Application") {
      application_type = "Fresh Application";
    } else if (application_type === "Re-Application") {
      application_type = "Renewal Application";
    }

    // Fetch Classification Data
    const classificationData = await fetchClassifications({
      id: response.classificationId,
    });

    let incidentalClassifications = [];
    if (response.incidentalIds && response.incidentalIds.length > 0) {
      const incidentalIds = Array.isArray(response.incidentalIds) 
        ? response.incidentalIds 
        : [response.incidentalIds];

      const incidentalRecords = await Classification.findAll({
        where: {
          [Op.or]: [
            { classification_number: { [Op.in]: incidentalIds } },
            { id: { [Op.in]: incidentalIds } },
          ],
        },
        attributes: ["id"],
      });

      const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);

      incidentalClassifications =
        incidentalIdsFromRecords.length > 0
          ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
          : [];
    }

    // Filter classificationIdFees based on application_type
    const classificationIdFees = classificationData.flatMap((classification) =>
      (classification.classificationFees || []).filter((fee) =>
        fee.fee.application_type?.includes(application_type)
      )
    );

    // Fetch incidentalIdsFees without filtering based on application_type
    const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
      classification.classificationFees || []
    );

    // Attach fees separately
    response.dataValues.classificationIdFees = classificationIdFees;
    response.dataValues.incidentalIdsFees = incidentalIdsFees;

    return response;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};

exports.updateCompetencyCertificationLifting  = async (id, data) => {
    return CompetencyCertificationLifting.update(data, { where: { id } });
};

exports.deleteCompetencyCertificationLifting  = async (id) => {
    return CompetencyCertificationLifting.destroy({ where: { id } });
};


// New functions for competency Certification
exports.createCompetencyCertificationInspection = async (data) => {
  return AuthorizedInspectorCertification.create(data);
};

exports.findAllCompetencyCertificationInspection = async () => {
  return AuthorizedInspectorCertification.findAll();
};

exports.findCompetencyCertificationInspectionById = async (id) => {
  try {
    const response = await AuthorizedInspectorCertification.findByPk(id);

    if (!response) return null;

    let { application_type } = response;

    if (application_type === "New Application") {
      application_type = "Fresh Application";
    } else if (application_type === "Re-Application") {
      application_type = "Renewal Application";
    }

    // Fetch Classification Data
    const classificationData = await fetchClassifications({
      id: response.classificationId,
    });

    let incidentalClassifications = [];
    if (response.incidentalIds && response.incidentalIds.length > 0) {
      const incidentalIds = Array.isArray(response.incidentalIds) 
        ? response.incidentalIds 
        : [response.incidentalIds];

      const incidentalRecords = await Classification.findAll({
        where: {
          [Op.or]: [
            { classification_number: { [Op.in]: incidentalIds } },
            { id: { [Op.in]: incidentalIds } },
          ],
        },
        attributes: ["id"],
      });

      const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);

      incidentalClassifications =
        incidentalIdsFromRecords.length > 0
          ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
          : [];
    }

    // Filter classificationIdFees based on application_type
    const classificationIdFees = classificationData.flatMap((classification) =>
      (classification.classificationFees || []).filter((fee) =>
        fee.fee.application_type?.includes(application_type)
      )
    );

    // Fetch incidentalIdsFees without filtering based on application_type
    const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
      classification.classificationFees || []
    );

    // Attach fees separately
    response.dataValues.classificationIdFees = classificationIdFees;
    response.dataValues.incidentalIdsFees = incidentalIdsFees;

    return response;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};



exports.updateCompetencyCertificationInspection = async (id, data) => {
  console.log("Updating CompetencyCertificationInspection with id:", id);
  try{
    const [updatedRows] = await AuthorizedInspectorCertification.update(data, {
      where: { id },
    });
  if (updatedRows === 0) {
    console.log(`No CompetencyCertificationInspection found with id: ${id}`);
    return { success: false, message: "Record not found" };
  }
  
  // Retry logic for fetching the updated record
  let updatedRecord = null;
  for (let i = 0; i < 3; i++) { // Try up to 3 times
    updatedRecord = await AuthorizedInspectorCertification.findByPk(id);
    if (updatedRecord) {
      break; // Record found, exit the loop
    }
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms before retrying
  }

  if (!updatedRecord) {
    console.log(`Failed to retrieve updated record with id: ${id} after multiple retries`);
    return { success: false, message: "Failed to retrieve updated record" };
  }

  console.log(`Successfully updated CompetencyCertificationInspection with id: ${id}`);
  return { success: true, data: updatedRecord };
}
  catch (error) {
    console.error("Error updating CompetencyCertificationInspection:", error);
    return { success: false, message: "An error occurred while updating the record", error: error.message };
  }
};
exports.findCompetencyCertificationInspectionByUserId  = async (userId ,options = {}) => {
  return  AuthorizedInspectorCertification.findAll({
    where: { user_id: userId },
    ...options,
  });
};

  
exports.findCompetencyCertificationInspectionById = async (id) => {
  try {
    const response = await AuthorizedInspectorCertification.findByPk(id);

    if (!response) return null;

    let { application_type } = response;

    if (application_type === "New Application") {
      application_type = "Fresh Application";
    } else if (application_type === "Re-Application") {
      application_type = "Renewal Application";
    }

    // Fetch Classification Data
    const classificationData = await fetchClassifications({
      id: response.classificationId,
    });

    let incidentalClassifications = [];
    if (response.incidentalIds && response.incidentalIds.length > 0) {
      const incidentalIds = Array.isArray(response.incidentalIds) 
        ? response.incidentalIds 
        : [response.incidentalIds];

      const incidentalRecords = await Classification.findAll({
        where: {
          [Op.or]: [
            { classification_number: { [Op.in]: incidentalIds } },
            { id: { [Op.in]: incidentalIds } },
          ],
        },
        attributes: ["id"],
      });

      const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);

      incidentalClassifications =
        incidentalIdsFromRecords.length > 0
          ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
          : [];
    }

    // Filter classificationIdFees based on application_type
    const classificationIdFees = classificationData.flatMap((classification) =>
      (classification.classificationFees || []).filter((fee) =>
        fee.fee.application_type?.includes(application_type)
      )
    );

    // Fetch incidentalIdsFees without filtering based on application_type
    const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
      classification.classificationFees || []
    );

    // Attach fees separately
    response.dataValues.classificationIdFees = classificationIdFees;
    response.dataValues.incidentalIdsFees = incidentalIdsFees;

    return response;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};

// New functions for LifingOperatorCertification08
exports.createCompetencyCertificationWelder = async (data) => {
  return CompetencyCertificationWelder.create(data);
};

exports.findAllCompetencyCertificationWelder = async () => {
  return CompetencyCertificationWelder.findAll();
};

exports.findCompetencyCertificationWelderByUserId  = async (userId,options={}) => {
    return CompetencyCertificationWelder.findAll({ where: { user_id:userId },
    ...options,
  });
};

exports.findCompetencyCertificationWelderById = async (id) => {
  try {
    const response = await CompetencyCertificationWelder.findByPk(id);

    if (!response) return null;

    let { application_type } = response;

    if (application_type === "New Application") {
      application_type = "Fresh Application";
    } else if (application_type === "Re-Application") {
      application_type = "Renewal Application";
    }

    // Fetch Classification Data
    const classificationData = await fetchClassifications({
      id: response.classificationId,
    });

    let incidentalClassifications = [];
    if (response.incidentalIds && response.incidentalIds.length > 0) {
      const incidentalIds = Array.isArray(response.incidentalIds) 
        ? response.incidentalIds 
        : [response.incidentalIds];

      const incidentalRecords = await Classification.findAll({
        where: {
          [Op.or]: [
            { classification_number: { [Op.in]: incidentalIds } },
            { id: { [Op.in]: incidentalIds } },
          ],
        },
        attributes: ["id"],
      });

      const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);

      incidentalClassifications =
        incidentalIdsFromRecords.length > 0
          ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
          : [];
    }

    // Filter classificationIdFees based on application_type
    const classificationIdFees = classificationData.flatMap((classification) =>
      (classification.classificationFees || []).filter((fee) =>
        fee.fee.application_type?.includes(application_type)
      )
    );

    // Fetch incidentalIdsFees without filtering based on application_type
    const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
      classification.classificationFees || []
    );

    // Attach fees separately
    response.dataValues.classificationIdFees = classificationIdFees;
    response.dataValues.incidentalIdsFees = incidentalIdsFees;

    return response;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};

exports.updateCompetencyCertificationWelder = async (id, data) => {
  console.log("Updating CompetencyCertificationwelder with id:", id);
  try{
    const [updatedRows] = await CompetencyCertificationWelder.update(data, {
      where: { id },
    });
  if (updatedRows === 0) {
    console.log(`No CompetencyCertificationWelder
       found with id: ${id}`);
    return { success: false, message: "Record not found" };
  }
  
  // Retry logic for fetching the updated record
  let updatedRecord = null;
  for (let i = 0; i < 3; i++) { // Try up to 3 times
    updatedRecord = await CompetencyCertificationWelder.findByPk(id);
    if (updatedRecord) {
      break; // Record found, exit the loop
    }
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms before retrying
  }

  if (!updatedRecord) {
    console.log(`Failed to retrieve updated record with id: ${id} after multiple retries`);
    return { success: false, message: "Failed to retrieve updated record" };
  }

  console.log(`Successfully updated CompetencyCertificationWelder with id: ${id}`);
  return { success: true, data: updatedRecord };
}
  catch (error) {
    console.error("Error updating CompetencyCertificationInspection:", error);
    return { success: false, message: "An error occurred while updating the record", error: error.message };
  }
};
                                                                         


// LiftingEquipmentRegistration
exports.createLiftingEquipmentRegistration = async (data) => {
  return LiftingEquipmentRegistration.create(data);
};

exports.findByUserIdLiftingEquipmentRegistration = async (userId,options = {}) => {
  return await LiftingEquipmentRegistration.findAll({
    where: { user_id: userId },
    ...options,
  });
};

exports.findAllLiftingEquipmentRegistration = async () => {
  return LiftingEquipmentRegistration.findAll();
};

exports.findLiftingEquipmentRegistrationById = async (id) => {
  try {
    const response = await LiftingEquipmentRegistration.findByPk(id);

    if (!response) return null;

    let { application_type } = response;

    if (application_type === "New Application") {
      application_type = "Fresh Application";
    } else if (application_type === "Re-Application") {
      application_type = "Renewal Application";
    }

    // Fetch Classification Data
    const classificationData = await fetchClassifications({
      id: response.classificationId,
    });

    let incidentalClassifications = [];
    if (response.incidentalIds && response.incidentalIds.length > 0) {
      const incidentalIds = Array.isArray(response.incidentalIds) 
        ? response.incidentalIds 
        : [response.incidentalIds];

      const incidentalRecords = await Classification.findAll({
        where: {
          [Op.or]: [
            { classification_number: { [Op.in]: incidentalIds } },
            { id: { [Op.in]: incidentalIds } },
          ],
        },
        attributes: ["id"],
      });

      const incidentalIdsFromRecords = incidentalRecords.map((record) => record.id);

      incidentalClassifications =
        incidentalIdsFromRecords.length > 0
          ? await fetchClassifications({ id: { [Op.in]: incidentalIdsFromRecords } })
          : [];
    }

    // Filter classificationIdFees based on application_type
    const classificationIdFees = classificationData.flatMap((classification) =>
      (classification.classificationFees || []).filter((fee) =>
        fee.fee.application_type?.includes(application_type)
      )
    );

    // Fetch incidentalIdsFees without filtering based on application_type
    const incidentalIdsFees = incidentalClassifications.flatMap((classification) =>
      classification.classificationFees || []
    );

    // Attach fees separately
    response.dataValues.classificationIdFees = classificationIdFees;
    response.dataValues.incidentalIdsFees = incidentalIdsFees;

    return response;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};

exports.updateLiftingEquipmentRegsitration= async (id, data) => {
  console.log("Updating Lifting Equipment Registration with id:", id);
  try{
    const [updatedRows] = await LiftingEquipmentRegistration.update(data, {
      where: { id },
    });
  if (updatedRows === 0) {
    console.log(`No Lifting Equipment Registration with id: ${id}`);
    return { success: false, message: "Record not found" };
  }
  
  // Retry logic for fetching the updated record
  let updatedRecord = null;
  for (let i = 0; i < 3; i++) { 
    updatedRecord = await LiftingEquipmentRegistration.findByPk(id);
    if (updatedRecord) {
      break; 
    }
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms before retrying
  }

  if (!updatedRecord) {
    console.log(`Failed to retrieve updated record with id: ${id} after multiple retries`);
    return { success: false, message: "Failed to retrieve updated record" };
  }

  console.log(`Successfully updated CompetencyCertificationWelder with id: ${id}`);
  return { success: true, data: updatedRecord };
}
  catch (error) {
    console.error("Error updating CompetencyCertificationInspection:", error);
    return { success: false, message: "An error occurred while updating the record", error: error.message };
  }
};
      


//report functions
exports.createReport = async (data) => {
  try {
    const response = await Report.create(data);
    return response;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};

exports.findAllReports = async () => {
  try {
    const response = await Report.findAll({
      order: [['createdAt', 'DESC']],
    });
    return response;
  } catch (error) {
    console.error("Error fetching all reports:", error);
    throw error;
  }
};
exports.findReportByUserId = async (userId) => {
  try {
    const response = await Report.findAll({ where: { user_id: userId } });
    return response;
  } catch (error) {
    console.error("Error fetching report by user ID:", error);
    throw error; // Re-throw the error to be caught by the service
  }
};

exports.findReportById = async (id) => {
    try {
      const response = await Report.findByPk(id);
      return response;
    } catch (error) {
      console.error("Error fetching report by ID:", error);
      throw error;
    }
  };

exports.updateReport = async (id, update) => {
  try {
    const response = await Report.update(update, { where: { id } });
    return response;
  } catch (error) {
    console.error("Error updating report:", error);
    throw error;
  }
};

exports.deleteReport = async (id) => {
  try {
    const response = await Report.destroy({ where: { id } });
    return response;
  } catch (error) {
    console.error("Error deleting report:", error);
    throw error;
  }
};

exports.countReports = async () => {
  const { Report } = require("../sequelize/models");
  return await Report.count();
};