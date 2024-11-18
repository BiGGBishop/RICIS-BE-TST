const {
  Categories,
  SubCategories,
  Application,
  Classification,
} = require("../sequelize/models"); // Importing from the index file
const StatusCodes = require("../utils/statusCodes");

//add
exports.addCategories = async (req, res) => {
  for (const name of req.body.name) {
    const object = {
      name: name,
      application_type: req.body.application_type
    };
    await Categories.create(object);
  }

  return res.status(StatusCodes.OK).json({
    status: true,
    message: "updated",
  });
};

exports.addSubCategories = async (req, res) => {
  const { name, categoryId } = req.body;
  await SubCategories.create({
    name,
    categoryId,
  });
  // }
  return res.status(StatusCodes.OK).json({
    status: true,
    message: "updated",
  });
};

//get

exports.getCategories = async (req, res) => {
  const data = await Categories.findAll({
    order: [["createdAt", "DESC"]],
  });

  return res.status(StatusCodes.OK).json({
    status: true,
    data: data,
  });
};

exports.getCategoriesUser = async (req, res) => {
    const { application_type } = req.query;

    if (!application_type) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: "Application type is required.",
      });
    }

    const data = await Categories.findAll({
      where: { application_type },
      order: [["createdAt", "DESC"]],
    });

    return res.status(StatusCodes.OK).json({
      status: true,
      data: data,
    });
};


exports.getSubCategories = async (req, res) => {
  const data = await SubCategories.findAll({
    where: { categoryId: req.params.catId },
    include: [
      {
        model: Categories, // Include the associated Role
        as: "categories",
        attributes: ["name"], // Specify which fields of the Role to include
      },
    ],
    //   order: [["createdAt", "DESC"]],
  });

  return res.status(StatusCodes.OK).json({
    status: true,
    data: data,
  });
};

exports.getAllSubCategories = async (req, res) => {
  const data = await SubCategories.findAll({
    where: {},
    include: [
      {
        model: Categories, // Include the associated Role
        as: "categories",
        attributes: ["name"], // Specify which fields of the Role to include
      },
    ],
    //   order: [["createdAt", "DESC"]],
  });

  return res.status(StatusCodes.OK).json({
    status: true,
    data: data,
  });
};

exports.updateSubCategories = async (req, res) => {
  const update = {
    name: req.body.subcategory,
  };

  const filter = {
    id: req.params.subCatId,
  };

  await SubCategories.update(update, { where: filter });

  const newResult = await SubCategories.findOne({
    where: filter,
  });

  return res.status(StatusCodes.OK).json({
    status: true,
    message: "subcategory udpated successfully",
    data: newResult,
  });
};

exports.updateCategories = async (req, res) => {
  const update = {
    name: req.body.category,
    application_type: req.body.application_type

  };

  const filter = {
    id: req.params.catId,
  };

  await Categories.update(update, { where: filter });

  const newResult = await Categories.findOne({
    where: filter,
  });

  return res.status(StatusCodes.OK).json({
    status: true,
    message: "category udpated successfully",
    data: newResult,
  });
};

exports.deleteCategory = async (req, res) => {
  const filter = {
    id: req.params.catId,
  };

  // Set subCategoryId to NULL in all dependent tables
  await Application.update(
    { categoryId: null },
    { where: { categoryId: req.params.catId } }
  );
  await SubCategories.update(
    { categoryId: null },
    { where: { categoryId: req.params.catId } }
  );
  await Classification.update(
    { categoryId: null },
    { where: { categoryId: req.params.catId } }
  );

  //removing categpry
  await Categories.destroy({ where: filter });

  return res.status(StatusCodes.OK).json({
    status: true,
    message: "category deleted successfully",
    // data: findTO,
  });
};

exports.deleteSubCategories = async (req, res) => {
  const filter = {
    id: req.params.subCatId,
  };

  console.log({ filter });

  // Set subCategoryId to NULL in all dependent tables
  await Application.update(
    { subcategoryId: null },
    { where: { subcategoryId: req.params.subCatId } }
  );
  await Classification.update(
    { categoryId: null },
    { where: { categoryId: req.params.subCatId } }
  );

  //removing categpry
  await SubCategories.destroy({ where: filter });

  await SubCategories.destroy({ where: filter });

  return res.status(StatusCodes.OK).json({
    status: true,
    message: "Subcategory deleted successfully",
    // data: newResult,
  });
};
