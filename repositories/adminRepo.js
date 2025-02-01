// const otpModel = require("../models/otp");
const { User } = require("../sequelize/models"); // Importing from the index file
const { UserRole } = require("../sequelize/models"); // Importing from the index file
const { AdminStaff } = require("../sequelize/models"); // Importing from the index file
const { Classification } = require("../sequelize/models"); // Importing from the index file
const { ClassificationMerge } = require("../sequelize/models"); // Importing from the index file

const {ClassificationIncidentalMerge} = require("../sequelize/models");
const { Categories } = require("../sequelize/models"); // Importing from the index file
const { SubCategories } = require("../sequelize/models"); // Importing from the index file
const { Conversation } = require("../sequelize/models"); // Importing from the index file
const { Fee } = require("../sequelize/models"); // Importing from the index file
const { ClassificationFees } = require("../sequelize/models"); // Importing from the index file

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

//Admin
exports.findAdminUser = async (filter) => {
  const response = await AdminStaff.findOne({ where: filter });
  return response;
};

exports.findAdminUsers = async (filter) => {
  const response = await AdminStaff.findAll({
    where: filter,
  });
  return response;
};

exports.createAdminUser = async (update) => {
  const response = await AdminStaff.create(update);
  console.log({response, update})
  return response;
};

exports.deleteStaff = async (update) => {
  const response = await AdminStaff.destroy({ where: update });
  // console.log({response, update})
  return response;
};

exports.addClassification = async (update) => {
  try {
    const response = await Classification.create(update);
    // console.log({response, update})
    return response;
  } catch (error) {
    console.error("Error details:", error);
  }
};


exports.addClassificationMerge = async (update) => {
  const { classificationId, incidentalClassificationIds } = update;

  try {
    const classificationMerge = await ClassificationMerge.create({
      classificationId,
    });

    for (const incidentalClassificationId of incidentalClassificationIds) {
      await ClassificationIncidentalMerge.create({
        classificationMergeId: classificationMerge.id,
        incidentalClassificationId,
      });
    }

    const primaryClassification = await Classification.findOne({
      where: { id: classificationId },
    });

    const incidentalClassifications = await Classification.findAll({
      where: { id: incidentalClassificationIds },
    });

    const formattedIncidentalClassifications = incidentalClassifications.map(
      (incidental) => ({
        classification_name: incidental.classification_name,
        categoryId: incidental.categoryId,
        subcategoryId: incidental.subcategoryId,
        form_type: incidental.form_type,
      })
    );

    const response = {
      primaryClassification: {
        classification_name: primaryClassification.classification_name,
        categoryId: primaryClassification.categoryId,
        subcategoryId: primaryClassification.subcategoryId,
        form_type: primaryClassification.form_type,
      },
      incidentalClassifications: formattedIncidentalClassifications,
    };

    return response
  } catch (error) {
    console.error(error);
    return error
  }
};

exports.addClassificationFees = async (update) => {
  try {
    const response = await ClassificationFees.bulkCreate(update);
    // console.log({response, update})
    return response;
  } catch (error) {
    console.error("Error details:", error);
  }
};

exports.fetchAClassification = async (filter) => {
  const response = await Classification.findOne({
    where: filter, // Use classification_number passed from the service
    include: [
      {
        model: Categories,
        as: "category",
        attributes: ["name"],
        required: false,
      },
      {
        model: SubCategories,
        as: "subcategory",
        attributes: ["name"],
        required: false,
      },
      {
        model: ClassificationFees,
        as: "classificationFees",
        attributes: ["feeId", "amount"],
        include: [
          {
            model: Fee,
            as: "fee",
            attributes: ["fee_type", "application_category"],
          },
        ],
      },
    ],
  });
  return response;
};

exports.fetchClassificationMerge = async (filter) => {
  try {
    const response = await ClassificationMerge.findOne({
      filter, // Ensure we only get one record
    });
    return response;
  } catch (error) {
    console.error("Error fetching classification merge:", error);
    throw error;
  }
};

exports.fetchClassificationsNoIncidental = async (filter) => {
  const response = await Classification.findAll({
    where: filter,
    has_incidental:false,
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
        model: ClassificationFees, // Include associated ClassificationFees
        as: "classificationFees", // Alias should match the association alias if you set one
        attributes: ["feeId", "amount"], // Specify fields of ClassificationFees
        include: [
          {
            model: Fee, // Include Fee details within ClassificationFees
            as: "fee",
            attributes: ["fee_type", "application_category"], // Specify which fields of Fee to include
          },
        ],
      },
    ],
  });
  // console.log({response, update})
  return response;
};

exports.fetchClassificationsYesIncidental = async (filter) => {
  const response = await Classification.findAll({
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
        model: ClassificationFees, // Include associated ClassificationFees
        as: "classificationFees", // Alias should match the association alias if you set one
        attributes: ["feeId", "amount"], // Specify fields of ClassificationFees
        include: [
          {
            model: Fee, // Include Fee details within ClassificationFees
            as: "fee",
            attributes: ["fee_type", "application_category"], // Specify which fields of Fee to include
          },
        ],
      },
    ],
  });
  // console.log({response, update})
  return response;
};

exports.findClassificationFees = async (filter) => {
  try {
    const response = await ClassificationFees.findAll({
      where: filter,
    });
    // console.log({response, update})
    return response;
  } catch (error) {
    console.error("Error details:", error);
  }
};

exports.fetchClassifications = async (filter) => {
  const response = await Classification.findAll({
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
        model: ClassificationFees, // Include associated ClassificationFees
        as: "classificationFees", // Alias should match the association alias if you set one
        attributes: ["feeId", "amount"], // Specify fields of ClassificationFees
        include: [
          {
            model: Fee, // Include Fee details within ClassificationFees
            as: "fee",
            attributes: ["fee_type", "application_category"], // Specify which fields of Fee to include
          },
        ],
      },
    ],
  });
  // console.log({response, update})
  return response;
};

exports.findAndUpdateClassification = async (filter, update) => {
  const response = await Classification.update(update, { where: filter });
  return response;
};

exports.findAndUpdateClassificationMerge = async (filter, update) => {
  const response = await ClassificationMerge.update(update, { where: filter });
  return response;
};

exports.deleteClassification = async (update) => {
  const response = await Classification.destroy({ where: update });
  // console.log({response, update})
  return response;
};

exports.deleteClassificationMerge = async (update) => {
  const response = await ClassificationMerge.destroy({ where: update });
  // console.log({response, update})
  return response;
};

exports.addAppMsg = async (update) => {
  const response = await Conversation.create(update);
  return response;
};

exports.addFee = async (update) => {
  const response = await Fee.create(update);
  return response;
};

exports.findFee = async (filter) => {
  try {
    const response = await Fee.findOne({ where: filter });
    return response;
  } catch (error) {
    console.error("Error details:", error);
  }
};

exports.findFees = async (filter) => {
  try {
    const response = await Fee.findAll({ where: filter });
    return response;
  } catch (error) {
    console.error("Error details:", error);
  }
}

exports.findAndUpdateFee = async (filter, update) => {
  const response = await Fee.update(update, { where: filter });
  return response;
};

exports.deleteFee = async (update) => {
    try {
      const response = await Fee.destroy({ where: update });
      console.log({response, update})
      return response;
    } catch (error) {
      console.error("Error details:", error);
    }
};

