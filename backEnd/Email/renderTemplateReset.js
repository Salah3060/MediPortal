const render = (template, options) => {
  const html = `
          <!doctype html>
          <html lang="en">
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <title>Reset Password</title>
              <style>
                body {
                  font-family: 'Helvetica', sans-serif;
                  font-size: 16px;
                  line-height: 1.5;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .header h1 {
                  font-size: 24px;
                  color: #333333;
                }
                .content {
                  font-size: 16px;
                  color: #555555;
                  margin-bottom: 20px;
                }
                .verification-code {
                  font-size: 22px;
                  font-weight: bold;
                  color: #0867ec;
                  background: #f0f8ff;
                  padding: 10px;
                  text-align: center;
                  border-radius: 4px;
                  margin: 20px 0;
                }
                .footer {
                  font-size: 14px;
                  text-align: center;
                  color: #999999;
                  margin-top: 20px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Reset Your Password</h1>
                </div>
                <div class="content">
                  <p>Hi ${options.firstName},</p>
                  <p>We received a request to reset your password. Please use the code below to proceed with resetting your password:</p>
                  <div class="verification-code">
                    ${options.code}
                  </div>
                  <p>This code is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
                </div>
                <div class="footer">
                  <p>Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</p>
                  <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
                </div>
              </div>
            </body>
          </html>
        `;
  return html;
};

export default render;
