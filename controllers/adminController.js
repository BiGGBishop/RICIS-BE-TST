const AdminService = require("../services/adminServices");
const UserService = require("../services/userServices");
const UserRepo = require("../repositories/userRepo");
const AdminRepo = require("../repositories/adminRepo")
const { ClassificationMerge, Classification } = require("../sequelize/models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Assuming you are using JWT
const { uploadSingleFile } = require('../utils/cloudinary');

//Super admin Login do not touch
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.superLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await AdminRepo.findAdminUser({email:email, userroleId: 1 });

  if (!admin) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);
  console.log(passwordMatch)

  if (!passwordMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email, role: 'admin' }, 'your-secret-key', { expiresIn: '10h' }); // Replace 'your-secret-key' with a secure secret

  res.status(200).json({ token });
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getAdminDetails = async (req, res) => {
  const data = await AdminService.getAdminDetails(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.fetchStaffs = async (req, res) => {
  const data = await AdminService.fetchStaffs(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.fetchStaff = async (req, res) => {
  const data = await AdminService.fetchStaff(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.deleteStaff = async (req, res) => {
  const data = await AdminService.deleteStaff(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.actionOnStaff = async (req, res) => {
  const data = await AdminService.actionOnStaff(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.fetchAllUsers = async (req, res) => {
  const data = await UserService.getUsers(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.fetchUser = async (req, res) => {
  const data = await UserService.getUser(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.addClassification = async (req, res) => {
  const data = await AdminService.addClassification(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getClassifications = async (req, res) => {
  const data = await AdminService.getClassifications(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getAClassifications = async (req, res) => {
  const classificationNumber = req.params.classification_number; // The classification_number from the URL
  const userId = req.user?.id;                                   // The user ID from the authenticated user

  const data = await AdminService.getAClassifications(classificationNumber, userId); // Pass classificationNumber

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};


  exports.getClassificationMerge = async (req, res) => {
    try {
     const merges = await AdminService.getClassificationMerge(req)
     
      return res.status(200).json({
        status: true,
        message: "Classification merges retrieved successfully",
        data: merges,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };

  

exports.getClassificationsNoIncidental = async (req, res) => {
  try {
    const userOrAdminExist =
      (await UserRepo.findUser({ id: req.user?.id })) ||
      (await AdminRepo.findAdminUser({ id: req.user?.id }));

    if (!userOrAdminExist) {
      return res.status(400).json({
        status: false,
        message: "Invalid Credentials",
      });
    }

    const role = await AdminRepo.findRole({ id: userOrAdminExist?.userroleId });
    console.log({ userExist: role });

    let filter = { has_incidental: false };


    const classifications = await AdminRepo.fetchClassificationsNoIncidental(
      filter
    );

    return res.status(200).json({
      status: true,
      data: classifications,
    });
  } catch (error) {
    console.error("Error fetching classifications:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

exports.getClassificationsYesIncidental = async (req, res) => {
  console.log("working...")
  try {
    const userOrAdminExist =
      (await UserRepo.findUser({ id: req.user?.id })) ||
      (await AdminRepo.findAdminUser({ id: req.user?.id }));
      console.log(userOrAdminExist)

    if (!userOrAdminExist) {
      return res.status(400).json({
        status: false,
        message: "Invalid Credentials",
      });
    }

    const role = await AdminRepo.findRole({ id: userOrAdminExist?.userroleId });
    console.log({ userExist: role });

    let filter = { has_incidental: true };


    const classifications = await AdminRepo.fetchClassificationsNoIncidental(
      filter
    );

    return res.status(200).json({
      status: true,
      data: classifications,
    });
  } catch (error) {
    console.error("Error fetching classifications:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

exports.updateClassifications = async (req, res) => {
  const data = await AdminService.updateClassifications(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.deleteClassifications = async (req, res) => {
  const data = await AdminService.deleteClassifications(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.restrictClassifications = async (req, res) => {
  const data = await AdminService.restrictClassifications(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.addClassificationMerge = async (req, res) => {
  const data = await AdminService.addClassificationMerge(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.updateClassificationMerge = async (req, res) => {
  const data = await AdminService.updateClassificationMerge(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.deleteClassificationMerge = async (req, res) => {
  const data = await AdminService.deleteClassificationMerge(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.updateClassificationMerge = async (req, res) => {
  const data = await AdminService.updateClassificationMerge(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.deleteClassificationMerge = async (req, res) => {
  const data = await AdminService.deleteClassificationMerge(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getAllApplications = async (req, res) => {
  const data = await AdminService.getAllApplications(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getSingleApplication = async (req, res) => {
  const data = await AdminService.getSingleApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.actionOnApplication = async (req, res) => {
  const data = await AdminService.actionOnApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.filterApplication = async (req, res) => {
  const data = await AdminService.filterApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.addMsgToApplication = async (req, res) => {
  const data = await AdminService.addMsgToApplication(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.addFees = async (req, res) => {
  const data = await AdminService.addFees(req);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.fetchFees = async (req, res) => {
  const data = await AdminService.fetchFees(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.updateFees = async (req,res) => {
  const data = await AdminService.updateFees(req);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.deleteFee = async (req, res) => {
  const data = await AdminService.deleteFee(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.getClassificationWithIncidental = async (req, res) => {
  const data = await AdminService.getClassificationWithIncidental(req, res);

  return res.status(data.STATUS_CODE).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};


exports.getAllUsersForms = async (req, res) => {
  const data = await AdminService.getAllUsersForms(req, res);

  return res.status(200).json({
    status: data.STATUS,
    message: data.MESSAGE,
    data: data.DATA,
  });
};

exports.createBlog = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return {
        STATUS_CODE: userId.STATUS,
        STATUS: false,
        MESSAGE: "Unauthorized: User ID is required.",
      };
    }

    const { title, description, image, status, published } = req.body;
  
    // Check if an image is provided, and upload it if so
    let uploadedImageUrl = null;
    if (image) {
      uploadedImageUrl = await uploadSingleFile(image);  // Upload and get the image URL
    }

    // Optional: Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        STATUS: false,
        MESSAGE: "Title and description are required.",
      });
    }

    // Create the blog
    const blog = await AdminRepo.createBlog(userId, {
      title,
      description,
      image: uploadedImageUrl,  // Use the uploaded image URL
      status,
      published,
    });

    return res.status(200).json({
      status: 200,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      STATUS: false,
      MESSAGE: "Internal server error",
    });
  }
};

exports.getAllBlogs = async(req,res)=>{
  try {
    const blogs = await AdminRepo.getAllBlogs();
    return res.status(200).json({
      status: 200,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      STATUS_CODE: 500,
      STATUS: false,
      MESSAGE: "Internal server error",
    };
  }
}

exports.getBlogById = async(req,res)=>{
  try {
    const { id } = req.params;
    const blog = await AdminRepo.getBlogById(id);
    if (!blog) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      STATUS_CODE: 500,
      STATUS: false,
      MESSAGE: "Internal server error",
    };
  }
};

exports.updateBlog = async(req,res)=>{
  try{
    const { id } = req.params;
    const { title, description, image, status, published } = req.body;

    let uploadedImageUrl = image ? await uploadSingleFile(image) : null;

    const blog = await AdminRepo.updateBlog(id, {
      title,
      description,
      image: uploadedImageUrl,
      status,
      published,
    });

    if (!blog) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Blog updated successfully",
      data: blog,
    });
    } catch (error) {
      console.error("Error updating blog:", error);
      return {
        STATUS_CODE: 500,
        STATUS: false,
        MESSAGE: "Internal server error",
      };
  }
}

exports.deleteBlog = async(req,res)=>{
  try{
    const { id } = req.params;
    const deletedBlog = await AdminRepo.deleteBlog(id);
    if (!deletedBlog) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return {
      STATUS_CODE: 500,
      STATUS: false,
      MESSAGE: "Internal server error",
    };
  }
}