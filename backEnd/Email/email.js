import nodemailer from "nodemailer";
import render from "./renderTemplate.js";
import renderReset from "./renderTemplateReset.js";

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

  async send(template, subject, code, reset) {
    //1) Render HTML
    try {
      let html;
      if (reset) {
        html = renderReset(template, {
          firstName: this.firstName,
          code,
          id: this.id,
          subject,
        });
      } else {
        console.log(this);
        html = render(template, {
          firstName: this.firstName,
          code,
          id: this.id,
          subject,
        });
      }

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
    await this.send("Explore...", "Welcome to the MediPortal family!");
  }
  async sendVerification(code) {
    await this.send(
      "verify",
      "Use the button below to verify to your MediPortal account..",
      code
    );
  }
  async sendVerificationReset(code) {
    await this.send("Reset", "Reset MediPortal account Password..", code, 1);
  }
}
export default Email;
