const nodemailer = require("nodemailer");
const { PASSMAILER, SERVICE } = require("../../config/envConfig");

exports.contactUsMsg = async (email, first_name) => {
  console.log(email, PASSMAILER);
  try {
    const transporter = nodemailer.createTransport({
      service: SERVICE,
      secure: true,
      auth: {
        pass: PASSMAILER,
        user: "farmsagora@gmail.com",
      },
    });

    await transporter.sendMail({
      from: "farmsagora@gmail.com",
      to: email,
      subject: "Resida Contact",
      html: ` 
             <p>  Hello, ${first_name} </p></br>
  
        <p> 
          Thank you for reaching out to RESIDA!
        </p></br>
  
       
  
  
         <p> 
          We appreciate your message and will attend to it shortly. 
          In the meantime, stay tuned for exclusive updates, early access opportunities, 
          and exciting offers.
         </p>
  
         <p> 
          Stay connected with us on: 
        </p>
  
  
        
  
        <p> 
        Facebook: https://www.facebook.com/
        <p>
        Twitter: https://x.com/
        </p>
         <p>
        Instagram: https://www.instagram.com/
        </p>
         <p>
        LinkedIn: https://www.linkedin.com/
        </p>
  
        <p>  
         We look forward to embarking on this transformative journey with you!
        </p>
  
  
            
  
              <b>
              <p>Best regards,</p>
              <p>The RESIDA Team</p>
              <p>+234 xxx-xxx-xxxx</p>
              </b>
          `,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
