const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envConfig");
const otpGenerator = require("otp-generator");
const StatusCodes  = require("../utils/statusCodes");


exports.generateToken = async (user) => {
  console.log(user)
  const token = jwt.sign(
    {
      id: user.user,
      email: user.email,
      phone: user.phone,
    },
    JWT_SECRET,
    {
      // expiresIn: 60, // is 7 days no too much max 3 days min 24 hrs
      expiresIn: "3d",
    }
  );
  return token;
};

exports.generateOTP = async () => {
  const OTP = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return OTP;
};

exports.authToken = (req, res, next) => {
  try {
    if (req.headers.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET )
      req.user = decoded;

      // console.log(user)

      next();
      return;
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: "failed",
      error: "Access Denied",
    });
  } catch (error) {
    console.log(error)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: "failed",
      error: "Session Ended Please Login!",
    });
  }
};

exports.generateDefaultPassword = async () => {
  const password = otpGenerator.generate(9, {
    lowerCaseAlphabets: true,
    upperCaseAlphabets: false,
    specialChars: true,
  });
  return password;
};


exports.generateRefNumber =  async() =>{
  const refno = otpGenerator.generate(5, {
      lowerCaseAlphabets: false, 
      upperCaseAlphabets: false,
      specialChars: false,
    });
    return refno
}