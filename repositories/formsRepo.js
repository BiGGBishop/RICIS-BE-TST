
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
exports.findByUserIdAuthorizationApproved  = async    (userId, options = {}) => {
  return await TrainingOrganizationForm.findAll({
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
    return await TrainingOrganizationForm.findAll();
  };

exports.findByUserIdTrainingAuthorization = async (userId) => {
    return  TrainingOrganizationForm.findAll({ where: { user_id: userId } });
  };

  //Boier registration
exports.createBoilerRegistrationRepo = async (data) => {
    return  await BoilerRegistration.create(data);
  };
  
  exports.findAllBoilerRegistrationRepos = async () => {
      return await BoilerRegistration.findAll();
  };
  
  exports.findByUserIdBoilerRegistrationRepos = async (userId) => {
      return await BoilerRegistration.findAll({ where: { user_id: userId } });
  };


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
   
  exports.findByIdCompetencyCertificationFormBoiler = async (id) =>   {
    return CompetencyCertificationFormBoiler.findByPk(id);
  };
  
  exports.updateCompetencyCertificationFormBoiler= async (id, update) => {
    return CompetencyCertificationFormBoiler.update(update, { where: { id } });
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
  try {
    const response = await RenewalForm.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'first_name', 'last_name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return response;
  } catch (error) {
    console.error("Error fetching renewal forms:", error);
    throw error;
  }
};

exports.findByUserIdRenewalForm = async (userId) => {
  try {
    const response = await RenewalForm.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'first_name', 'last_name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return response;
  } catch (error) {
    console.error("Error fetching renewal forms by user ID:", error);
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
    return OperatorCertification.findByPk(id);
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

exports.findCompetencyCertificationLiftingById  = async (id) => {
    return CompetencyCertificationLifting.findByPk(id);
};

exports.CompetencyCertificationLifting  = async (id, data) => {
    return CompetencyCertificationLifting.update(data, { where: { id } });
};

exports.CompetencyCertificationLifting  = async (id) => {
    return CompetencyCertificationLifting.destroy({ where: { id } });
};


// New functions for competency Certification
exports.createCompetencyCertificationInspection = async (data) => {
  return AuthorizedInspectorCertification.create(data);
};

exports.findAllCompetencyCertificationInspection = async () => {
  return AuthorizedInspectorCertification.findAll();
};

exports.findCompetencyCertificationInspectionByUserId  = async (userId) => {
    return AuthorizedInspectorCertification.findAll({ where: { userId } });
};

exports.findCompetencyCertificationInspectionById  = async (id) => {
    return AuthorizedInspectorCertification.findByPk(id);
};


// New functions for LifingOperatorCertification08
exports.createCompetencyCertificationWelder = async (data) => {
  return CompetencyCertificationWelder.create(data);
};

exports.findAllCompetencyCertificationWelder = async () => {
  return CompetencyCertificationWelder.findAll();
};

exports.findCompetencyCertificationWelderByUserId  = async (userId) => {
    return CompetencyCertificationWelder.findAll({ where: { userId } });
};
                                                                         


// LiftingEquipmentRegistration
exports.createLiftingEquipmentRegistration = async (data) => {
  return LiftingEquipmentRegistration.create(data);
};

exports.findByUserIdLiftingEquipmentRegistration = async (userId,options = {}) => {
  return await TrainingOrganizationForm.findAll({
    where: { user_id: userId },
    ...options,
  });
};

exports.findAllLiftingEquipmentRegistration = async () => {
  return LiftingEquipmentRegistration.findAll();
};