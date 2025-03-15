const nodemailer = require("nodemailer");
const { PASSMAILER, MAIL_FROM } = require("../../config/envConfig");

exports.sendFeedbackNotification = async (email, feedbackDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "infodevhorizon@gmail.com",
        pass: PASSMAILER,
      },
    });

    const mailOptions = {
      from: MAIL_FROM,
      to: email,
      subject: "New Feedback Received",
      html: `
        <p><b>Hi,</b></p>
        <p>You have received new feedback on the <b>RICIS</b> platform.</p>
        <p><b>Feedback Details:</b></p>
        <p>${feedbackDetails.message}</p>
        <br>
        <p><a href="${feedbackDetails.url}" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">View Feedback</a></p>
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
