const nodemailer = require("nodemailer");
const { PASSMAILER, MAIL_FROM } = require("../../config/envConfig");

exports.userSignUpMsg = async (email) => {
  console.log(email, PASSMAILER);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        pass: PASSMAILER,
        user: "noreply@ricinspection.com", // USER
      },
    });

    await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: "ACCOUNT CREATION",
      html: ` <b> Hi </b></br>
            <p>
               Your account has been succesfully created....................
            </p>
          
            </br>
            <b>
          
            <p>Best regards,</p>
            <p>RESIDA Team </p>
            </b>
          `,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

exports.signUpOtp = async (email, OTP) => {
  // console.log(email, PASSMAILER);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        pass: PASSMAILER,
        user: "noreply@ricinspection.com", // USER
      },
    });

    await transporter.sendMail({
      from: "noreply",
      to: email,
      subject: "OTP SENT",
      html: ` <b> Hi </b></br>
              <p>
                 Here is  the otp sent to you to verify yourself ${OTP}....................
              </p>
            
              </br>
              <b>
            
              <p>Best regards,</p>
              <p>RICIS Team </p>
              </b>
            `,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

exports.sendCredentails = async (email, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        pass: PASSMAILER,
        user: "noreply@ricinspection.com", // USER
      },
    });
    await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: "WELCOME ONBOARD",
      html: ` <b>  Hi, </b></br>
            <p>
             account created for you on the RICIS platform kindly login with your email and the temporal password created for you: 
            </p>

            <p>
            ${password}
            </p>
    
            </br>
            <b>
          
            <p>Best regards,</p>
            <p>RICIS Team </p>
            </b>
          `,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
