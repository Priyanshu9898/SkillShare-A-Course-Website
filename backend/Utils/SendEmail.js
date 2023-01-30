import { createTransport } from "nodemailer";

export const sendEmail = async (to, subject, text) => {
    var transporter = createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5a99fc9a28d8f8",
          pass: "7d4ba9b9f4982c"
        }
      });
    

    await transporter.sendMail({to, subject, text})
}