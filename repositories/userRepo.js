// const otpModel = require("../models/otp");
const { User } = require("../sequelize/models"); // Importing from the index file
const { Otp } = require("../sequelize/models"); // Importing from the index file
const { UserRole } = require("../sequelize/models"); // Importing from the index file
const { AdminStaff } = require("../sequelize/models"); // Importing from the index file
const { Application } = require("../sequelize/models"); // Importing from the index file
const { Categories } = require("../sequelize/models"); // Importing from the index file
const { SubCategories } = require("../sequelize/models"); // Importing from the index file
const { Conversation } = require("../sequelize/models"); // Importing from the index file

exports.createOTP = async (data) => {
  const response = await Otp.create(data);
  return response;
};

exports.findOneOTP = async (filter) => {
  const response = await Otp.findOne({ where: filter });
  return response;
};

exports.deleteOneOTP = async (filter) => {
  const response = await Otp.destroy({ where: filter });
  return response;
};

exports.deleteAllOTP = async (filter) => {
  const response = await Otp.destroy({ where: filter });
  return response;
};

exports.findOne = async (filter) => {
  const response = await User.findOne({ where: filter });
  return response;
};

exports.findUser = async (filter) => {
  const response = await User.findOne({ where: filter });
  return response;
};

exports.findUsers = async (filter) => {
  const response = await User.findAll({
    where: filter,
    include: [
      {
        model: UserRole, // Include the associated Role
        as: "userrole",
        attributes: ["name"], // Specify which fields of the Role to include
        required: false,
      },
    ],
  });
  return response;
};

exports.createUser = async (update) => {
  const response = await User.create(update);
  // console.log({response, update})
  return response;
};

exports.findUserAndUpdate = async (filter, update) => {
  const response = await User.update(update, { where: filter });
  return response;
};

exports.findRole = async (filter) => {
  const response = await UserRole.findOne({ where: filter });
  return response;
};

//applicatations
exports.createApp = async (update) => {
  try {
    const response = await Application.create(update);
    // console.log({response, update})
    return response;
  } catch (error) {
    console.error("Error details:", error);
  }
};

exports.findAllApplication = async (filter, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const response = await Application.findAll({
      where: filter,
      limit: limit,
      offset: offset,
      /*include: [
        {
          model: Categories, // Include the associated category
          as: "category",
          attributes: ["name"], // Specify which fields of the category to include
          required: false,
        },

        {
          model: SubCategories, // Include the associated category
          as: "subcategory",
          attributes: ["name"], // Specify which fields of the category to include
          required: false,
        },

        {
          model: User, // Include the associated category
          as: "user",
          attributes: ["email", "first_name", "last_name"], // Specify which fields of the category to include
          required: false,
        },
        {
          model: Conversation,
          as: "conversations",
          include: [
            {
              model: User,
              as: "userdetails",
              attributes: ["email", "first_name"],
              required: false,
            },
            {
              model: AdminStaff,
              as: "admindetails",
              attributes: ["email", "full_name"],
              required: false,
            },
          ],
        },
      ]*/
    });
    const totalCount = await Application.count({
      where: filter,
    });
    return { response, totalCount };
    // console.log({response, update})
    return response;
  } catch (error) {
    console.error("Error details:", error);
  }
};

exports.findApplication = async (filter) => {
  try {
    const response = await Application.findOne({
      where: filter,
      include: [
        {
          model: Categories, // Include the associated category
          as: "category",
          attributes: ["name"], // Specify which fields of the category to include
          required: false,
        },

        {
          model: SubCategories, // Include the associated category
          as: "subcategory",
          attributes: ["name"], // Specify which fields of the category to include
          required: false,
        },

        {
          model: User, // Include the associated category
          as: "user",
          attributes: ["email", "first_name", "last_name"], // Specify which fields of the category to include
          required: false,
        },
        {
          model: Conversation,
          as: "conversations",
          include: [
            {
              model: User,
              as: "userdetails",
              attributes: ["email", "first_name"],
              required: false,
            },
            {
              model: AdminStaff,
              as: "admindetails",
              attributes: ["email", "full_name"],
              required: false,
            },
          ],
        },
      ],
    });
    // console.log({response, update})
    return response;
  } catch (error) {
    console.error("Error details:", error);
  }
};

//Admin
exports.findAdminUser = async (filter) => {
  const response = await AdminStaff.findOne({ where: filter });
  return response;
};

exports.createAdminUser = async (update) => {
  const response = await AdminStaff.create(update);
  // console.log({response, update})
  return response;
};
