const { signUpOtp, sendCredentails } = require("../utils/emails/auth");
const StatusCodes = require("../utils/statusCodes");
const {
  generateToken,
  generateOTP,
  generateDefaultPassword,
  generateRefNumber,
} = require("../utils/AunthenticateUser");
const bcrypt = require("bcrypt");
const UserRepo = require("../repositories/userRepo");
const AdminRepo = require("../repositories/adminRepo");
const { Op } = require("sequelize");
const { Transaction } = require("../sequelize/models");

const { Classification,ClassificationFees,Fee, ClassificationMerge,ClassificationIncidentalMerge,Categories,SubCategories } = require('../sequelize/models'); 


exports.getOTP = async (req) => {
  const { email } = req.body;
  const OTP = await generateOTP();
  const otpObject = {
    email: email,
    code: OTP,
    type: "Signup",
    otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
  };
  try {
    const savedOtp = await UserRepo.createOTP(otpObject);
    await signUpOtp(email, OTP);
    return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "OTP has been sent to your email.",
    };
  } catch (error) {
    return {
      STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
      STATUS: false,
      MESSAGE: "An error occurred while generating the OTP.",
    };
  }
};

exports.resendOTP = async (req) => {
  const { email } = req.body;

  const otpExist = await UserRepo.findOneOTP({ email: email });

  const filter = {
    email: otpExist?.email,
  };

  await UserRepo.deleteAllOTP(filter);

  const OTP = await generateOTP();

  const otpObject = {
    email: email,
    code: OTP,
    type: "Signup",
    otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
  };

  try {
    await UserRepo.createOTP(otpObject);
  } catch (e) {
    console.error("Failed to create OTP:", e);
  }

  /** send mail  **/
  await signUpOtp(email, OTP);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "OTP resent",
  };
};

exports.validateOTP = async (req) => {
  const { otp } = req.body;

  const otpExist = await UserRepo.findOneOTP({
    email: req.body.email,
    code: otp,
    otpExpiresAt: { [Op.gt]: new Date() },
  });

  if (otpExist == null) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid OTP",
    };
  }

  /* delete OTP after verifying */
  await UserRepo.deleteOneOTP({ code: otp });

  const role = await UserRepo.findRole({ name: "user" });

  const userObject = {
    completion_percent: 50,
    email: req.body.email,
  };
  // console.log({ userObject });

  const createdUser = await UserRepo.createUser(userObject);

  console.log({ createdUser: createdUser.id });
  let token;
  if (createdUser) {
    const tokenObject = {
      user: createdUser.id,
      email: createdUser.email,
    };

    token = await generateToken(tokenObject);
  }

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "email verified",
    DATA: {
      user: createdUser,
      token,
    },
  };
};

exports.signUpUsers = async (req) => {
  const { password } = req.body;

  const filter = {
    id: req?.user?.id,
  };

  // console.log(filter)

  const userExist = await UserRepo.findOne(filter);
  if (!userExist) {
    // from the flow users would have verified their email first, and at thie verification and  acoount is created though without a password

    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "no record",
      DATA: null,
    };
  }

  const role = await UserRepo.findRole({ name: "user" });

  const userObject = {
    userroleId: role?.id,
    completion_percent: 100,
    ...req.body,
  };

  await UserRepo.findUserAndUpdate(filter, userObject);

  // Encrypt the password before saving
  const salt = await bcrypt.genSaltSync(10);

  userExist.password = await bcrypt.hash(password, salt); // Encrypt the password
  await userExist.save(); // Save the changes

  let token;

  const tokenObject = {
    user: userExist.id,
    email: userExist.email,
  };
  token = await generateToken(tokenObject);

  const fetchUser = await UserRepo.findUser(filter);

  // Convert the instance to a plain object
  const user = fetchUser.get({ plain: true });
  // remove the password field
  delete user.password;

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "User registered successfully!",
    DATA: {
      user,
      token,
    },
  };
};

exports.signIn = async (req) => {
  const { email, password } = req.body;

  const filter = {
    email: email,
  };
  const userExist = await UserRepo.findOne(filter);

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  /*ELSE*/
  const passwordMatches = await bcrypt.compare(password, userExist.password);

  if (!passwordMatches) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  // Convert the instance to a plain object
  const user = userExist.get({ plain: true });
  // remove the password field
  delete user.password;

  /*JWT*/

  const tokenObject = {
    user: userExist.id,
    email: userExist.email,
  };
  const token = await generateToken(tokenObject);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "welcome to RICIS",
    DATA: {
      user: user,
      token,
    },
  };
};

// for forgot password for both Users and staffs
exports.recoveryOtp = async (req) => {
  const user_type = req.query.user_type;

  console.log(user_type);

  const userExist = await UserRepo.findUser({
    email: req.body.email,
  });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const filter = {
    email: req.body.email,
  };

  const otpExist = await UserRepo.findOneOTP(filter);

  /* delete created OTP before generating other*/
  if (otpExist != null) {
    await UserRepo.deleteAllOTP(filter);
  }

  const OTP = await generateOTP();

  const otpObject = {
    email: req.body.email,
    code: OTP,
    type: "ForgotPassword",
    otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000) // 2mins
  };

  await UserRepo.createOTP(otpObject);

  /*then send otp to the user mail */
  await signUpOtp(req.body.email, OTP);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "OTP sent",
    // DATA: null,
  };
};

// for forgot password
exports.verifyRecoveryOTP = async (req) => {
  const { otp } = req.body;

  const otpExist = await UserRepo.findOneOTP({
    code: otp,
    otpExpiresAt: { [Op.gt]: new Date() },
  });

  /**Check OTP */
  if (otpExist == null)
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid OTP",
    };

  /**
   * delete otp after verifying
   */

  await UserRepo.deleteOneOTP({ code: otp });

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "email verified",
    // DATA: createUser,
  };
};

exports.resetForgotPassword = async (req) => {
  const user_type = req.query.user_type;
  const { password } = req.body;

  // for users
  if (user_type === "user") {
    const userExist = await UserRepo.findUser({
      email: req.body.email,
    });

    if (!userExist)
      return {
        STATUS_CODE: StatusCodes.BAD_REQUEST,
        STATUS: false,
        MESSAGE: "Invalid Credentials",
      };

    // userExist.password = req.body.password;
    // await userExist.save();

    // Encrypt the password before saving
    const salt = await bcrypt.genSaltSync(10);

    userExist.password = await bcrypt.hash(password, salt); // Encrypt the password
    await userExist.save(); // Save the changes

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "password reset Successful!",
    };
  }

  // for admin

  if (user_type === "admin-staff") {
    const adminExist = await UserRepo.findAdminUser({
      email: req.body.email,
    });

    if (!adminExist)
      return {
        STATUS_CODE: StatusCodes.BAD_REQUEST,
        STATUS: false,
        MESSAGE: "Invalid Credentials",
      };

    // Encrypt the password before saving
    const salt = await bcrypt.genSaltSync(10);

    adminExist.password = await bcrypt.hash(password, salt); // Encrypt the password
    await adminExist.save(); // Save the changes

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "password reset Successful!",
    };
  }

  return {
    STATUS_CODE: StatusCodes.BAD_REQUEST,
    STATUS: false,
    MESSAGE: "user type not found!",
  };
};

exports.resetUserPassword = async (req) => {
  const user_type = req.query.user_type;
  const { new_password, current_password } = req.body;

  console.log({ user_type });

  if (user_type === "user") {
    const userExist = await UserRepo.findUser({
      id: req.user?.id,
    });

    console.log({ userExist });

    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.BAD_REQUEST,
        STATUS: false,
        MESSAGE: "Invalid Credentials",
      };
    }

    console.log({ userExist: userExist.password });

    /*ELSE*/

    const passwordMatches = await bcrypt.compare(
      current_password,
      userExist.password
    );

    console.log({ passwordMatches });

    if (!passwordMatches) {
      return {
        STATUS_CODE: StatusCodes.BAD_REQUEST,
        STATUS: false,
        MESSAGE: "Invalid Credentials",
      };
    }

    // Encrypt the password before saving
    const salt = await bcrypt.genSaltSync(10);

    userExist.password = await bcrypt.hash(new_password, salt); // Encrypt the password
    await userExist.save(); // Save the changes

    // Convert the instance to a plain object
    const user = userExist.get({ plain: true });
    // remove the password field
    delete user.password;

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "password reset Successfully!",
    };
  }

  if (user_type === "admin-staff") {
    const adminExist = await UserRepo.findAdminUser({
      id: req.user?.id,
    });

    if (!adminExist) {
      return {
        STATUS_CODE: StatusCodes.BAD_REQUEST,
        STATUS: false,
        MESSAGE: "user not found",
      };
    }

    /*ELSE*/
    const passwordMatches = await bcrypt.compare(
      current_password,
      adminExist.password
    );

    if (!passwordMatches) {
      return {
        STATUS_CODE: StatusCodes.BAD_REQUEST,
        STATUS: false,
        MESSAGE: "Invalid Credentials",
      };
    }

    // Encrypt the password before saving
    const salt = await bcrypt.genSaltSync(10);

    adminExist.password = await bcrypt.hash(new_password, salt); // Encrypt the password
    await adminExist.save(); // Save the changes

    // Convert the instance to a plain object
    const user = adminExist.get({ plain: true });
    // remove the password field
    delete user.password;

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "password reset Successfully!",
    };
  }
  // else

  return {
    STATUS_CODE: StatusCodes.BAD_REQUEST,
    STATUS: false,
    MESSAGE: "user type not found!",
  };
};

exports.getUsers = async () => {
  const user = await UserRepo.findUsers({});

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: user,
  };
};

exports.getUserDetails = async (req) => {
  const userExist = await UserRepo.findUser({ email: req.user?.email });
  const filter = {
    email: req.user?.email,
  };

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: userExist?.userroleId });
  // console.log({ userExistRole: role });


  if (role?.name != "user") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      DATA: "Not a user",
    };
  
  }
    // console.log({ userExist: role?.name });

    let user = await UserRepo.findUser(filter);

    // Convert the instance to a plain object
    user = user.get({ plain: true });
    // remove the password field
    delete user.password;
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  

};


exports.getUser = async (req) => {
  const filter = {
    id: req.params.id,
  };
  const user = await UserRepo.findUser(filter);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: user,
  };
};

exports.registerStaffAndAdmin = async (req) => {
  const filter = {
    id: req?.user?.id,
  };

  console.log({ filter });

  const adminExist = await UserRepo.findAdminUser(filter);

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credetials..", //@admin not found
    };
  }

  const role = await UserRepo.findRole({ id: adminExist?.userroleId });

  if (role?.name !== "admin") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Admin",
    };
  }

  const userToBeAddedExist = await UserRepo.findAdminUser({
    email: req.body.email,
  });

  if (userToBeAddedExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "This user has been registered and already exists",
    };
  }

  /* generate pasword */
  const defaultPassword = await generateDefaultPassword();
  const refnumber = await generateRefNumber();

  // Encrypt the password before saving
  const salt = await bcrypt.genSaltSync(10);

  const password = await bcrypt.hash(defaultPassword, salt); // Encrypt the password

  const userObject = {
    email: req.body.email,
    full_name: req.body.full_name,
    password: password,
    userroleId: req.body.role,
    ref_number: `APP_${refnumber}`,
  };

  // console.log({ defaultPassword });

  await UserRepo.createAdminUser(userObject);

  /*send email notification to the created user */
  await sendCredentails(req.body.email, defaultPassword);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "account registered and email sent to user successfully !",
    // DATA: null,
  };
};

exports.staffLogin = async (req) => {
  const filter = {
    email: req.body.email,
  };
  // debugger
  const adminExist = await UserRepo.findAdminUser(filter);
  // console.log(userExist);

  if (!adminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials.", //@admin not exist
    };
  }

  const role = await UserRepo.findRole({ id: adminExist?.userroleId });

  console.log({ role: role?.id, name: role?.name });

  const password_match = await bcrypt.compare(
    req.body.password,
    adminExist.password
  );

  if (!password_match)
    return {
      STATUS_CODE: StatusCodes.NOT_FOUND,
      STATUS: false,
      MESSAGE: "Invalid  Credentials..",
    };
  /**Only admin and staff can loggin */
  if (role?.name !== "admin" && role?.name !== "staff") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, admin or staff only",
    };
  }

  /**Only admin and staff whose status is not pending can login that is to say untill approved you cannot login*/

  // if (adminExist?.user_status !== "approved") {
  //   return {
  //     STATUS_CODE: StatusCodes.BAD_REQUEST,
  //     STATUS: false,
  //     MESSAGE: "Access denied, Your Account is yet to be approved",
  //   };
  // }

  // Convert the instance to a plain object
  const user = adminExist.get({ plain: true });
  // remove the password field
  delete user.password;

  const tokenObject = {
    user: user.id,
    email: user.email,
  };
  const token = await generateToken(tokenObject);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "User logged in  successfully!",
    DATA: {
      user,
      token,
    },
  };
};

exports.createApplication = async (req) => {


  const applications = req.body.applications;
  const userId = req?.user?.id;
  const save_as_draft = req.body.save_as_draft

  const userExist = await UserRepo.findUser({
    id: req.user?.id,
  });

  // console.log({ userExist });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  try{


  const applicationPromises = applications.map((application) => {
    const object = {
      save_as_draft,
      userId,
      application_category: req.body.application_category,
      application_type: req.body.application_type,
      categoryId: req.body.category, 
      subcategoryId: req.body.sub_category, 
      classificationId: req.body.classificationId,

      //for authorization
      company_tin :  application.company_tin,
      company_type :  application.company_type,
      company_rc_number :  application.company_rc_number,
      company_phone :  application.company_phone,
      representative_name :  application.representative_name,
      representative_phone :  application.representative_phone,
      comapany_address :  application.comapany_address,
      email :  application.email,
      website :  application.website,

      // for certification
      company_name:application.company_name,
      name:  application.name,
      address:  application.address,
      phone_number:  application.phone_number,
    

      // for registration
      equipment_name: application.equipment_name,
      construction_code: application.construction_code,
      place_of_manufacture: application.place_of_manufacture,
      year_of_manufacture: application.year_of_manufacture,
      intended_use_of_equipment: application.intended_use_of_equipment,
      new_or_used: application.new_or_used,
      inspection_agency: application.inspection_agency,
      aia_authorization: application.aia_authorization,
      date_of_hydro_test: application.date_of_hydro_test,
      hydro_test_pressure: application.hydro_test_pressure,
      design_presure: application.design_presure,
      mawp_or_mdmt: application.mawp_or_mdmt,
      equipment_type: application.equipment_type,
      equipment_distinctive: application.equipment_distinctive,
      operating_medium: application.operating_medium,
      equipment_category: application.equipment_category,
      equipment_sub_category: application.equipment_sub_category,
      equipment_classification: application.equipment_classification,
      equipment_line: application.equipment_line,
      equipment_incidental: application.equipment_incidental,
      equipment_owner: application.equipment_owner,

    };
    console.log({object})
    return UserRepo.createApp(object);
  });

  const createApps = await Promise.all(applicationPromises);

  // console.log({ createApps });



  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "application created successfully",
    DATA: createApps,
  };

}
catch(error){

  console.error("Error saving applications:", error);

  return {
    STATUS_CODE: StatusCodes.SERVER_ERROR,
    STATUS: false,
    MESSAGE: "an error occured while saving application",
  };
}
};

exports.getUsersApplication = async (req) => {
  const filter = {
    userId: req.user?.id,
  };
  
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const user = await UserRepo.findAllApplication(filter, page, limit);

  // You can also send the total count of records for pagination metadata.
  if (!user || user.length === 0) {
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "No applications found for this user.",
      DATA: [],
      totalCount: 0,
      totalPages: 0,
    };
  }

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: user,
    totalCount: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    page,
    limit,
  };
};


exports.getUsersSingleApplication = async (req) => {
  const filter = {
    userId: req.user?.id,
    id: req.params.appId,
  };
  const user = await UserRepo.findApplication(filter);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: user,
  };
};

exports.addMsgToApplication = async (req) => {
  const userExist = await UserRepo.findUser({
    id: req.user?.id,
  });

  if (!userExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: userExist?.userroleId });

  if (role?.name !== "user") {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Access denied, Strictly for Users",
    };
  }

  const appExist = await UserRepo.findApplication({
    id: req.body.applicationId,
  });

  if (!appExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "application reecord not found",
    };
  }

  const msgObj = {
    applicationId: req.body.applicationId,
    userId: req.user?.id,
    message: req.body.message,
  };
  const addMsg = await AdminRepo.addAppMsg(msgObj);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: `msg sent successfully`,
    DATA: addMsg,
  };
};



//getting merge clasification with classification Number and application type
// exports.getClassificationsWithMerges = async (classification_number, application_type) => {
//   try {
//     const primaryClassification = await Classification.findOne({
//       where: { classification_number: classification_number },
//       include: [
//         {
//           model:Categories,
//           as: "category",
//         },
//         {
//           model: SubCategories,
//           as: "subcategory",
//         },
//         {
//           model: Fee,
//           as: "fee",
//           through: {
//             model: ClassificationFees,
//             attributes: ["amount"],
//           },
//           where: application_type ? { application_type: { [Op.contains]: [application_type] } } : {},
//         },
//       ],
//     });

//     if (!primaryClassification) {
//       return {
//         STATUS_CODE: 404,
//         STATUS: false,
//         MESSAGE: "Primary classification not found",
//         DATA: null,
//       };
//     }
//     const classificationMerge = await ClassificationMerge.findOne({
//       where: { classificationId: primaryClassification.id },
//       include: [
//         {
//           model: Classification,
//           as: "incidentalClassification",
//           through: {
//             model: ClassificationIncidentalMerge,
//             as: "incidentalClassifications"
//           },
//           include: [
//             {
//               model: Categories,
//               as: "category",
//             },
//             {
//               model: SubCategories,
//               as: "subcategory",
//             },
//             {
//               model: Fee,
//               as: "fee",
//               through: {
//                 model: ClassificationFees,
//                 attributes: ["amount"],
//               },
//               where: application_type ? { application_type: { [Op.contains]: [application_type] } } : {},
//             },
//           ],
//         },
//       ],
//     });

//     if (!classificationMerge) {
//       return {
//         STATUS_CODE: 404,
//         STATUS: false,
//         MESSAGE: "Classification merge not found",
//         DATA: null,
//       };
//     }

//     const formattedIncidentalClassifications =
//       classificationMerge.incidentalClassifications.map(
//         (incidentalMerge) => {
//           const incidental = incidentalMerge.incidentalClassification;
//           return {
//             classification_name: incidental.classification_name,
//             category: incidental.category ? {
//               id: incidental.category.id,
//               name: incidental.category.name,
//             } : null,
//             subcategory: incidental.subcategory ? {
//               id: incidental.subcategory.id,
//               name: incidental.subcategory.name,
//             } : null,
//             form_type: incidental.form_type,
//             fee: incidental.fee.map(fee => ({
//               fee_type: fee.fee_type,
//               amount: fee.ClassificationFees.amount,
//             })),
//           };
//         }
//       );

//     const response = {
//       primaryClassification: {
//         classification_name: primaryClassification.classification_name,
//         category: primaryClassification.category ? {
//           id: primaryClassification.category.id,
//           name: primaryClassification.category.name,
//         } : null,
//         subcategory: primaryClassification.subcategory ? {
//           id: primaryClassification.subcategory.id,
//           name: primaryClassification.subcategory.name,
//         } : null,
//         form_type: primaryClassification.form_type,
//         fee: primaryClassification.fee.map(fee => ({
//           fee_type: fee.fee_type,
//           amount: fee.ClassificationFees.amount,
//         })),
//       },
//       incidentalClassifications: formattedIncidentalClassifications,
//     };

//     return {
//       STATUS_CODE: 200,
//       STATUS: true,
//       MESSAGE: "Classification merge data retrieved successfully",
//       DATA: response,
//     };
//   } catch (error) {
//     console.error("Error in getClassificationsWithMerge:", error);
//     return {
//       STATUS_CODE: 500,
//       STATUS: false,
//       MESSAGE: "An error occurred while processing the request",
//       DATA: null,
//     };
//   }
// };

// exports.getClassificationsWithMerges = async (classification_number) => {
//   try {
//     const primaryClassification = await Classification.findOne({
//       where: { classification_number:classification_number },
//     });

//     console.log(primaryClassification);
//     if (!primaryClassification) {
//       return null; // Or throw an error, depending on your needs
//     }

//     const classificationMerge = await ClassificationMerge.findOne({
//       where: { classificationId: primaryClassification.id },
//     });
//     console.log(classificationMerge)
//     if (!classificationMerge) {
//       return null; // Or throw an error, depending on your needs
//     }

//     const getIncidentalClassifications = await ClassificationIncidentalMerge.findAll({
//       where: { classificationMergeId: classificationMerge.id },
//     });
//     const incidentalClassifications = [];
//     for (let i = 0; i < getIncidentalClassifications.length; i++) {
//       const incidentalClassificationRecord = await Classification.findByPk(
//         getIncidentalClassifications[i].incidentalClassificationId
//       );
//       incidentalClassifications.push({
//         classification_name: incidentalClassificationRecord.classification_name,
//         categoryId: incidentalClassificationRecord.categoryId,
//         subcategoryId: incidentalClassificationRecord.subcategoryId,
//         form_type: incidentalClassificationRecord.form_type,
//       });
//     }
   

//     const response = {
//       primaryClassification: {
//         classification_name: primaryClassification.classification_name,
//         categoryId: primaryClassification.categoryId,
//         subcategoryId: primaryClassification.subcategoryId,
//         form_type: primaryClassification.form_type,
//       },
//       incidentalClassifications: incidentalClassifications,
//     };

//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };
// exports.getClassificationsWithMerges = async (classification_number, application_type) => {
//   try {
//     const primaryClassification = await Classification.findOne({
//       where: { classification_number: classification_number },
//       include: [
//         {
//           model: ClassificationFees,
//           as: "classificationFees",
//           include: [
//             {
//               model: Fee,
//               as: "fee",
//               where: {
//                 application_type: {
//                   [Op.contains]: [application_type],
//                 },
//               },
//             },
//           ],
//         },
//         {
//           model: Categories,
//           as: "category",
//         },
//         {
//           model: SubCategories,
//           as: "subcategory",
//         },
//       ],
//     });

//     if (!primaryClassification) {
//       return null;
//     }

//     const classificationMerge = await ClassificationMerge.findOne({
//       where: { classificationId: primaryClassification.id },
//     });

//     if (!classificationMerge) {
//       return null;
//     }

//     const getIncidentalClassifications = await ClassificationIncidentalMerge.findAll({
//       where: { classificationMergeId: classificationMerge.id },
//     });

//     const incidentalClassifications = [];
//     for (let i = 0; i < getIncidentalClassifications.length; i++) {
//       const incidentalClassificationRecord = await Classification.findOne({
//         where: { id: getIncidentalClassifications[i].incidentalClassificationId },
//         include: [
//           {
//             model: ClassificationFees,
//             as: "classificationFees",
//             include: [
//               {
//                 model: Fee,
//                 as: "fee",
//                 where: {
//                   application_type: {
//                     [Op.contains]: [application_type],
//                   },
//                 },
//               },
//             ],
//           },
//           {
//             model: Categories,
//             as: "category",
//           },
//           {
//             model: SubCategories,
//             as: "subcategory",
//           },
//         ],
//       });

//       if (incidentalClassificationRecord) {
//         incidentalClassifications.push({
//           classification_name: incidentalClassificationRecord.classification_name,
//           categoryId: incidentalClassificationRecord.categoryId,
//           subcategoryId: incidentalClassificationRecord.subcategoryId,
//           form_type: incidentalClassificationRecord.form_type,
//           fee: incidentalClassificationRecord.classificationFees[0]?.fee
//             ? {
//                 amount: incidentalClassificationRecord.classificationFees[0].amount,
//                 fee_type: incidentalClassificationRecord.classificationFees[0].fee.fee_type,
//                 category_name: incidentalClassificationRecord.category?.name,
//                 subcategory_name: incidentalClassificationRecord.subcategory?.name,
//               }
//             : null,
//         });
//       }
//     }

//     const response = {
//       primaryClassification: {
//         classification_name: primaryClassification.classification_name,
//         categoryId: primaryClassification.categoryId,
//         subcategoryId: primaryClassification.subcategoryId,
//         form_type: primaryClassification.form_type,
//         fee: primaryClassification.classificationFees[0]?.fee
//           ? {
//               amount: primaryClassification.classificationFees[0].amount,
//               fee_type: primaryClassification.classificationFees[0].fee.fee_type,
//               category_name: primaryClassification.category?.name,
//               subcategory_name: primaryClassification.subcategory?.name,
//             }
//           : null,
//       },
//       incidentalClassifications: incidentalClassifications,
//     };

//     return response;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// exports.getClassificationsWithMerges = async (classification_number) => {
//   try {
//     const primaryClassification = await Classification.findOne({
//       where: { classification_number: classification_number },
//       include: [
//         {
//           model: Categories,
//           as: "category",
//           attributes: ["name"],
//         },
//         {
//           model: SubCategories,
//           as: "subcategory",
//           attributes: ["name"],
//         },
//         {
//           model: ClassificationFees,
//           as: "classificationFees",
//           include: [
//             {
//               model: Fee,
//               as: "fee",
//               attributes: ["amount"],
//             },
//           ],
//         },
//       ],
//     });

//     if (!primaryClassification) {
//       return null;
//     }

//     const classificationMerge = await ClassificationMerge.findOne({
//       where: { classificationId: primaryClassification.id },
//     });

//     if (!classificationMerge) {
//       return null;
//     }

//     const getIncidentalClassifications = await ClassificationMerge.findAll({
//       where: { classificationId: classificationMerge.classificationIncidentalId },
//       include: [
//         {
//           model: Classification,
//           as: "incidentalClassification",
//           include: [
//             {
//               model: Categories,
//               as: "category",
//               attributes: ["name"],
//             },
//             {
//               model: SubCategories,
//               as: "subcategory",
//               attributes: ["name"],
//             },
//             {
//               model: ClassificationFees,
//               as: "classificationFees",
//               include: [
//                 {
//                   model: Fee,
//                   as: "fee",
//                   attributes: ["amount"],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });

//     const incidentalClassifications = getIncidentalClassifications.map(
//       (item) => {
//         const incidentalClassification = item.incidentalClassification;
//         return {
//           classification_name: incidentalClassification.classification_name,
//           categoryId: incidentalClassification.categoryId,
//           subcategoryId: incidentalClassification.subcategoryId,
//           form_type: incidentalClassification.form_type,
//           category_name: incidentalClassification.category?.name,
//           subcategory_name: incidentalClassification.subcategory?.name,
//           amount:
//             incidentalClassification.classificationFees &&
//             incidentalClassification.classificationFees[0]?.fee?.amount,
//         };
//       }
//     );

//     const response = {
//       primaryClassification: {
//         classification_name: primaryClassification.classification_name,
//         categoryId: primaryClassification.categoryId,
//         subcategoryId: primaryClassification.subcategoryId,
//         form_type: primaryClassification.form_type,
//         category_name: primaryClassification.category?.name,
//         subcategory_name: primaryClassification.subcategory?.name,
//         amount:
//           primaryClassification.classificationFees &&
//           primaryClassification.classificationFees[0]?.fee?.amount,
//       },
//       incidentalClassifications: incidentalClassifications,
//     };

//     return response;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

exports.getClassificationsWithMerges = async (classification_number,application_type) => {
  try {
    const primaryClassification = await Classification.findOne({
      where: { classification_number: classification_number },
      include: [
        {
          model: Categories,
          as: "category",
          attributes: ["name"],
        },
        {
          model: SubCategories,
          as: "subcategory",
          attributes: ["name"],
        },
        {
          model: ClassificationFees,
          as: "classificationFees",
          attributes: ["amount"], // Access amount from ClassificationFees
          include: [
            {
              model: Fee,
              as: "fee",
              where: {
                application_type: {
                  [Op.contains]: [application_type],
                },
            },
          }
          ],
        },
      ],
    });

    if (!primaryClassification) {
      return null;
    }

    const classificationMerge = await ClassificationMerge.findOne({
      where: { classificationId: primaryClassification.id },
    });

    if (!classificationMerge) {
      return null;
    }

    const getIncidentalClassifications = await ClassificationIncidentalMerge.findAll({
      where: { classificationMergeId: classificationMerge.id },
      include: [
        {
          model: Classification,
          as: "incidentalClassification",
          include: [
            {
              model: Categories,
              as: "category",
              attributes: ["name"],
            },
            {
              model: SubCategories,
              as: "subcategory",
              attributes: ["name"],
            },
            {
              model: ClassificationFees,
              as: "classificationFees",
              attributes: ["amount"], // Access amount from ClassificationFees
              include: [
                {
                  model: Fee,
                  as: "fee",
                  application_type: {
                    [Op.contains]: [application_type],
                  },
                },
              ],
            },
          ],
        },
      ],
    });

console.log(getIncidentalClassifications)
    if (!getIncidentalClassifications) {
        return {
            primaryClassification: {
                classification_name: primaryClassification.classification_name,
                categoryId: primaryClassification.categoryId,
                subcategoryId: primaryClassification.subcategoryId,
                form_type: primaryClassification.form_type,
                category_name: primaryClassification.category?.name,
                subcategory_name: primaryClassification.subcategory?.name,
                amount:
                  primaryClassification.classificationFees &&
                  primaryClassification.classificationFees.map(
                    fee => fee.amount
                  ),
                  fee: primaryClassification.classificationFees &&
                  primaryClassification.classificationFees.map(
                    fee => fee.fee
                  ),
              },
              incidentalClassifications: [],
        }
    }
  

  const incidentalClassifications = getIncidentalClassifications.map(item => {
    return {
          classification_id:item.incidentalClassification?.id,
          classification_name: item.incidentalClassification?.classification_name,
          categoryId: item.incidentalClassification?.categoryId,
          subcategoryId: item.incidentalClassification?.subcategoryId,
          form_type: item.incidentalClassification?.form_type,
          category_name: item.incidentalClassification?.category?.name,
          subcategory_name: item.incidentalClassification?.subcategory?.name,
          amount: item.incidentalClassification?.classificationFees?.map(
            fee => fee.amount
          ),
          fee: item.incidentalClassification?.classificationFees?.map(
            fee => fee.fee
          ),
      }
  })
    const response = {
      primaryClassification: {
        classification_id:primaryClassification?.id,
        classification_name: primaryClassification.classification_name,
        categoryId: primaryClassification.categoryId,
        subcategoryId: primaryClassification.subcategoryId,
        form_type: primaryClassification.form_type,
        category_name: primaryClassification.category?.name,
        subcategory_name: primaryClassification.subcategory?.name,
        amount:
          primaryClassification.classificationFees &&
          primaryClassification.classificationFees?.map(
            fee => fee.amount
          ),
          fee: primaryClassification.classificationFees?.map(
            fee => fee.fee
          ),
      },
      incidentalClassifications: incidentalClassifications,
    };

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


exports.getClassificationWithIncidental = async (classification_number) => {


  try {
    // Step 1: Fetch the classification by classification_number
    const classification = await AdminRepo.fetchAClassification({
      classification_number,
    });

    if (!classification) {
      return {
        STATUS_CODE: 404,
        STATUS: false,
        MESSAGE: "Classification not found",
        DATA: null,
      };
    }

    // Step 2: Fetch the classification merge record (use findOne to fetch a single record)
    const classificationMerge = await AdminRepo.fetchClassificationMerge({
      classificationId: classification.id,
    });

    if (!classificationMerge || classificationMerge.length === 0) {
      return {
        STATUS_CODE: 404,
        STATUS: false,
        MESSAGE: "Classification merge not found for this classification",
        DATA: null,
      };
    }

    const incidentalClassificationId = classificationMerge[0].classificationIncidentalId; // Get the first result

    // Step 3: Fetch the incidental classification details
    const incidentalClassification = await AdminRepo.fetchAClassification({
      id: incidentalClassificationId,
    });

    if (!incidentalClassification) {
      return {
        STATUS_CODE: 404,
        STATUS: false,
        MESSAGE: "Incidental classification not found",
        DATA: null,
      };
    }

    // Step 4: Return both classifications
    return {
      STATUS_CODE: 200,
      STATUS: true,
      MESSAGE: "Classification and incidental classification fetched successfully",
      DATA: {
        classification,
        incidentalClassification,
      },
    };
  } catch (error) {
    console.error("Error in getClassificationWithIncidental service:", error);
    return {
      STATUS_CODE: 500,
      STATUS: false,
      MESSAGE: "An error occurred while fetching classification details",
      DATA: null,
    };
  }
};

exports.findTransactionByUserAndForm = async (req) => {
  const userId = req.user?.id || null;
  const formId = req.body?.form_id || null;

  if (!userId || !formId) return null;

  return await Transaction.findOne({
    where: {
      user_id: userId,
      form_id: formId,
      rrr: { [Op.ne]: null }
    },
    // order: [['createdAt', 'DESC']]
  });
};