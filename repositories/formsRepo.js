const { AuthorizationApproved } = require("../sequelize/models");
const { AuthorizationManufacturer } = require("../sequelize/models");

exports.create = async (data) => {
  try {
    const response = await AuthorizationApproved.create(update);
    // console.log({response, update})
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
          attributes: ['id', 'name'], // Adjust attributes as needed
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


exports.createAuthorizationManufacturer = async (data) => {
  return AuthorizationManufacturer.create(data);
};

exports.findAllAuthorizationManufacturer = async () => {
  return AuthorizationManufacturer.findAll();
};

exports.findByUserIdAuthorizationManufacturer = async (user_id) => {
  return AuthorizationManufacturer.findAll({ where: { user_id } });
};