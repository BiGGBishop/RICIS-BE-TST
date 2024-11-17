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

exports.getOTP = async (req) => {
  const { email } = req.body;

  console.log({ body: req.body });

  const OTP = await generateOTP();
  console.log(OTP);

  const otpObject = {
    email: email,
    code: OTP,
    type: "Signup",
    otpExpiresAt: Date.now() + 5 * 60 * 1000, // 5mins
  };

  await UserRepo.createOTP(otpObject);
  //  const user =  await User.create(otpObject);

  /**
   * send mail
   */
  await signUpOtp(email, OTP);

  return {
    STATUS_CODE: StatusCodes.CREATED,
    STATUS: true,
    MESSAGE: "OTP has been sent to your email.",
    // DATA:user
  };
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
    otpExpiresAt: Date.now() + 5 * 60 * 1000, // 1mins
  };

  await UserRepo.createOTP(otpObject);

  /**
   * send mail
   */
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
    userroleId: role.id,
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
    otpExpiresAt: Date.now() + 5 * 60 * 1000, // 2mins
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
  
  const userOrAdminExist =
    (await UserRepo.findUser({ id: req.user?.id })) ||
    (await AdminRepo.findAdminUser({ id: req.user?.id }));

  const filter = {
    id: req.user?.id,
  };

  if (!userOrAdminExist) {
    return {
      STATUS_CODE: StatusCodes.BAD_REQUEST,
      STATUS: false,
      MESSAGE: "Invalid Credentials",
    };
  }

  const role = await AdminRepo.findRole({ id: userOrAdminExist?.userroleId });
  console.log({ userExist: role });

  if (role?.name == "user") {
    console.log({ userExist: role?.name });

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
  }

  if (role.name == "admin" || role.name == "staff") {
    console.log("staff admin");

    let user = await AdminRepo.findAdminUser(filter);

    // Convert the instance to a plain object
    user = user.get({ plain: true });
    // remove the password field
    delete user.password;
    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      DATA: user,
    };
  }
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
  const {
    save_as_draft,
    category,
    sub_category,
    equipment_incidental,
    type_of_facility,
    code_of_construction,
    year_of_manufacturer,
    place_of_manufacture,
    hydro_test_pressure,
    date_of_hydro_test,
    inspection_agency,
    aia_authorization,
    equipment_distinctive,
    mawp_or_mdmt,
    equipment_category,
    equipment_type,
    design_presure,
    operating_medium,
    equipment_line,
    equipment_classification,
    equipment_sub_category,
    manufacturer,
    new_or_used,
    intended_use_of_equipment,
    object_use,
    installation_start_date,
    installation_complete_date,
    installer_name,
    installer_physical_address,
    quality_cert_of_installer_comppany,
    installer_authorization,
    installer_contact_person,
    installer_telephone,
    installer_email,
    name_of_occupier_or_owner,
    nature_of_manufacturing_process,
    owner_factory_reg,
    owner_quality_cert_of_company,
    owner_email,
    owner_telephone,
    contact_person,
  } = req.body;

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

  const appObject = {
    userId: req.user?.id,
    save_as_draft,

    categoryId: category,
    subcategoryId: sub_category,
    ///////////////////////
    equipment_incidental,
    type_of_facility,
    code_of_construction,
    year_of_manufacturer,
    place_of_manufacture,
    hydro_test_pressure,
    date_of_hydro_test,
    inspection_agency,
    aia_authorization,
    equipment_distinctive,
    equipment_type,
    mawp_or_mdmt,
    equipment_category,
    design_presure,
    operating_medium,
    equipment_line,
    equipment_classification,
    equipment_sub_category,
    manufacturer,
    new_or_used,
    intended_use_of_equipment,
    object_use,
    installation_start_date,
    installation_complete_date,
    installer_name,
    installer_physical_address,
    quality_cert_of_installer_comppany,
    installer_authorization,
    installer_contact_person,
    installer_telephone,
    installer_email,
    name_of_occupier_or_owner,
    nature_of_manufacturing_process,
    owner_factory_reg,
    owner_quality_cert_of_company,
    owner_email,
    owner_telephone,
    contact_person,
  };
  console.log({ appObject });

  const createApp = await UserRepo.createApp(appObject);
  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    MESSAGE: "application created successfully",
    DATA: createApp,
  };
};

exports.getUsersApplication = async (req) => {
  const filter = {
    userId: req.user?.id,
  };
  // console.log({filter})
  const user = await UserRepo.findAllApplication(filter);

  return {
    STATUS_CODE: StatusCodes.OK,
    STATUS: true,
    DATA: user,
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
