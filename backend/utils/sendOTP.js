const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "spendsenseteam@gmail.com",
    pass: "pekacoybmsmbmwjx",
  },
});
const sendOTP = async (email, otp) => {
  var mailOptions = {
    from: "spendsenseteam@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "spendsenseteam@gmail.com",
//     pass: "TechnologyInnovation123*",
//   },
// });

// const sendOTP = async (email, otp) => {
//   const mailOptions = {
//     from: "spendsenseteam@gmail.com",
//     to: email,
//     subject: "Password Reset OTP",
//     text: `Your OTP for password reset is: ${otp}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("OTP email sent successfully!");
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//   }
// };

module.exports = sendOTP;
