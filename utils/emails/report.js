const nodemailer = require("nodemailer");
const { PASSMAILER, MAIL_FROM } = require("../../config/envConfig");

exports.sendReportNotification = async (email, reportDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "noreply@ricinspection.com",
        pass: PASSMAILER,
      },
    });

    const mailOptions = {
      from: MAIL_FROM,
      to: email,
      subject: "Report Certiicate Notifcation",
      html: `
        <p><b>Hi,</b></p>
        <p>You have received new report update on the <b>RICIS</b> platform.</p>
        <p><b>Report Status:</b></p>
        <p>${reportDetails.status}</p>
        <br>
        <p><a href="${reportDetails.url}" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">View Report</a></p>
        <br>
        <p>Best regards,</p>
        <p><b>RICIS Team</b></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Feedback email sent successfully to", email,mailOptions.html);
  } catch (error) {
    console.error("Error sending feedback email:", error);
  }
};
