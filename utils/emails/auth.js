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
        user: "infodevhorizon@gmail.com", // USER
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
        user: "infodevhorizon@gmail.com", // USER
      },
    });

    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.zoho.com',
    //   port: 465,
    //   secure: true, // true for port 465, false for 587
    //   auth: {
    //     user: 'info@ricinspection.com',
    //     pass: 'YOUR_ZOHO_PASSWORD_OR_APP_PASSWORD', // Use app password if 2FA enabled
    //   },
    // });

    await transporter.sendMail({
      from: '"RIC Inspection" <infodevhorizon@gmail.com>',
      to: email,
      subject: "OTP SENT",
      html: ` <b> Hi </b></br>
              <p>
                 Here is  the otp sent to you to verify yourself: <strong>${OTP}</strong>
              </p>
            
              </br>
              <b>
            
              <p>Best regards,</p>
              <p>RIC Inspection Team </p>
              </b>
            `,
    });

    // exports.signUpOtp = async (email, OTP) => {
    //   try {
    //     await transporter.sendMail({
    //       from: '"RIC Inspection" <info@ricinspection.com>', // Display name + your email
    //       to: email,
    //       subject: 'OTP SENT',
    //       html: `
    //         <b>Hi</b><br/>
    //         <p>
    //           Here is the OTP sent to you to verify yourself: <strong>${OTP}</strong>
    //         </p>
    //         <br/>
    //         <b>
    //           <p>Best regards,</p>
    //           <p>RICIS Team</p>
    //         </b>
    //       `,
    //     });

    //     console.log('Email sent successfully');
    //   } catch (error) {
    //     console.log('Email not sent:', error);
    //   }
    // };
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
        user: "infodevhorizon@gmail.com", // USER
      },
    });
    await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: "WELCOME ONBOARD",
      html: ` <b>  Hi, </b></br>
            <p>
             Account created for you on the RICIS platform kindly login with your email and the temporal password created for you: 
            </p>

            <p>
             Visit https://ricinspection.com/ to login
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
