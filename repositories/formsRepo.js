const { AuthorizationApproved } = require("../sequelize/models");
const { AuthorizationManufacturer } = require("../sequelize/models");
const { TrainingOrganizationForm } = require("../sequelize/models");
const {BoilerRegistration} = require("../sequelize/models")
const { CompetencyCertificationForm } = require("../sequelize/models");
const {RenewalForm} = require("../sequelize/models");
const {User} = require("../sequelize/models")
const {Classification} = require("../sequelize/models")
const {OperatorCertification} = require("../sequelize/models")
const {CompetencyCertificationLifting} = require("../sequelize/models")

exports.create = async (data) => {
  try {
    const response = await AuthorizationApproved.create(data);
    console.log("the data ...",response)
    return response;
  } catch (error) {
    console.error("Error details:", error);
  }
};

exports.findAll = async () => {
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

exports.findByUserId = async (userId) => {
  return await AuthorizationApproved.findAll({ where: { user_id: userId } });
};

//crate authorization manufacturer

exports.createAuthorizationManufacturer = async (data) => {
  return AuthorizationManufacturer.create(data);
};

exports.findAllAuthorizationManufacturer = async () => {
  return AuthorizationManufacturer.findAll();
};

exports.findByUserIdAuthorizationManufacturer = async (user_id) => {
  return AuthorizationManufacturer.findAll({ where: { user_id } });
};


//createTraining authorization
exports.createTrainingAuthorization = async (data) => {
  return await TrainingOrganizationForm.create(data);
};

exports.findAllTrainingAuthorization = async () => {
    return await TrainingOrganizationForm.findAll();
  };

exports.findByUserIdTrainingAuthorization = async (userId) => {
    return await TrainingOrganizationForm.findAll({ where: { userId } });
  };

  //Boier registration
exports.createBoilerRegistrationRepo = async (data) => {
    return  await BoilerRegistration.create(data);
  };
  
  exports.findAllBoilerRegistrationRepos = async () => {
      return await BoilerRegistration.findAll();
  };
  
  exports.findBoilerRegistrationReposByUserId = async (userId) => {
      return await BoilerRegistration.findAll({ where: { user_id: userId } });
  };


  //competencyForm
  exports.createCompetencyForm = async (data) => {
    return CompetencyCertificationForm.create(data);
  };
  
  exports.findAllCompetencyForms = async () => {
    return CompetencyCertificationForm.findAll();
  };
  
  exports.findCompetencyFormByUserId = async (userId) => {
      return CompetencyCertificationForm.findAll({ where: { userId } });
  };
  
  exports.findCompetencyFormById = async (id) => {
    return CompetencyCertificationForm.findByPk(id);
  };
  
  exports.updateCompetencyForm = async (id, update) => {
    return CompetencyCertificationForm.update(update, { where: { id } });
  };
  
  exports.deleteCompetencyForm = async (id) => {
    return CompetencyCertificationForm.destroy({ where: { id } });
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

exports.findRenewalFormByUserId = async (userId) => {
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

exports.findOperatorCertificationsByUserId = async (userId) => {
    return OperatorCertification.findAll({ where: { userId } });
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

exports.findCompetencyCertificationLiftingByUserId  = async (userId) => {
    return CompetencyCertificationLifting.findAll({ where: { userId } });
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