import nodemailer from "nodemailer";
import render from "./renderTemplate.js";

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstname;
    this.from = `MediPortal <${process.env.EMAIL_FROM}>`;
    this.url = url;
    this.id = user.userid;
  }
  newTransporter() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      // logger: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject, code) {
    //1) Render HTML
    try {
      const html = render(template, {
        firstName: this.firstName,
        code,
        id: this.id,
      });

      //2) Defining the mail options
      const emailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
      };

      //3) Creating a transporter and sending the email
      await this.newTransporter().sendMail(emailOptions);
    } catch (err) {
      console.log(err);
    }
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the MediPortal family!");
  }
  async sendVerification(code) {
    await this.send(
      "verify",
      "Use the code below to verify to your MediPortal account..",
      code
    );
  }
}
export default Email;
