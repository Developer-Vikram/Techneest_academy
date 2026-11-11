const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ============================================================
   🎨 BRAND CONFIG (TechNeest logo colors)
   ============================================================ */
const BRAND = {
  name: "Techneest Academy",
  siteUrl: "https://techneestacademy.com",
  loginUrl: "https://techneestacademy.com/login",
  // Email me image hamesha public https URL se hi chalti hai (localhost / relative path nahi)
  logoUrl:
    process.env.EMAIL_LOGO_URL || "https://techneestacademy.com/logo.png",
  navy: "#0b1437", // "Tech" text color
  blue: "#1d6bff", // "Neest" blue
  cyan: "#22d3ee", // icon cyan
  purple: "#5b2be0", // "Neest" purple end
  pink: "#e11d9a", // icon magenta
  orange: "#f59e0b", // icon orange
  bg: "#f1f5ff",
  text: "#334155",
  muted: "#64748b",
};

const GRADIENT = `linear-gradient(90deg, ${BRAND.cyan}, ${BRAND.blue}, ${BRAND.purple})`;

/* ============================================================
   📧 COMMON EMAIL WRAPPER (LOGO THEME)
   ============================================================ */
const emailWrapper = (title, subtitle, bodyHTML) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <style>
    @media (max-width:600px){
      .container{width:100%!important}
      .content{padding:22px!important}
    }
  </style>
</head>

<body style="margin:0;padding:0;background:${BRAND.bg};font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 10px;">
        <table class="container" width="600" cellpadding="0" cellspacing="0" style="
          background:#ffffff;
          border-radius:16px;
          overflow:hidden;
          box-shadow:0 12px 40px rgba(29,107,255,0.15);
        ">

          <!-- GRADIENT TOP BAR -->
          <tr>
            <td style="
              height:6px;
              line-height:6px;
              font-size:0;
              background-color:${BRAND.blue};
              background-image:${GRADIENT};
            ">&nbsp;</td>
          </tr>

          <!-- LOGO -->
          <tr>
            <td align="center" style="padding:26px 30px 6px;background:#ffffff;">
              <a href="${BRAND.siteUrl}" style="text-decoration:none;">
                <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="180"
                  style="display:block;border:0;outline:none;width:180px;max-width:100%;height:auto;" />
              </a>
            </td>
          </tr>

          <!-- TITLE -->
          <tr>
            <td style="padding:10px 30px 24px;text-align:center;background:#ffffff;">
              <h1 style="margin:0;color:${BRAND.navy};font-size:26px;font-weight:700;">${title}</h1>
              <p style="margin:8px 0 0;color:${BRAND.muted};font-size:14px;">
                ${subtitle}
              </p>
              <div style="
                width:60px;
                height:4px;
                margin:16px auto 0;
                border-radius:4px;
                background-color:${BRAND.blue};
                background-image:${GRADIENT};
              "></div>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td class="content" style="padding:0 30px 30px;color:${BRAND.text};font-size:15px;line-height:1.6;">
              ${bodyHTML}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="
              text-align:center;
              padding:20px;
              font-size:12px;
              color:#94a3b8;
              background:#f8faff;
              border-top:1px solid #e5e7eb;
            ">
              If you did not sign up for this account, you can safely ignore this email.<br/><br/>
              © ${new Date().getFullYear()} <strong style="color:${BRAND.navy};">Tech</strong><strong style="color:${BRAND.blue};">Neest</strong> Academy. All rights reserved.
            </td>
          </tr>

          <!-- GRADIENT BOTTOM BAR -->
          <tr>
            <td style="
              height:6px;
              line-height:6px;
              font-size:0;
              background-color:${BRAND.purple};
              background-image:${GRADIENT};
            ">&nbsp;</td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/* ============================================================
   1️⃣ ACCOUNT VERIFICATION OTP
   ============================================================ */
exports.sendAccountVerificationOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Verify Your ${BRAND.name} Account`,
      html: emailWrapper(
        "Verify Your Account",
        "Complete your signup to get instant access 🚀",
        `
        <p>Hi there,</p>
        <p>Use the OTP below to verify your account:</p>

        <div style="
          margin:24px 0;
          padding:18px;
          background:#f5f8ff;
          border-radius:12px;
          border:2px dashed ${BRAND.blue};
          text-align:center;
        ">
          <h2 style="
            margin:0;
            font-size:32px;
            letter-spacing:8px;
            color:${BRAND.navy};
          ">${otp}</h2>
        </div>

        <p style="font-size:13px;color:${BRAND.muted};">
          ⏱ OTP valid for 5 minutes
        </p>
        `,
      ),
    });
    return true;
  } catch (err) {
    console.log("Verification OTP Error:", err);
    return false;
  }
};

/* ============================================================
   2️⃣ RESET PASSWORD OTP
   ============================================================ */
exports.sendResetPasswordOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: emailWrapper(
        "Password Reset",
        "Secure your account access 🔐",
        `
        <p>You requested a password reset. Use the OTP below:</p>

        <div style="
          margin:24px 0;
          padding:18px;
          background:#fff5fb;
          border-radius:12px;
          border:2px dashed ${BRAND.pink};
          text-align:center;
        ">
          <h2 style="
            margin:0;
            font-size:32px;
            letter-spacing:8px;
            color:${BRAND.purple};
          ">${otp}</h2>
        </div>

        <p style="font-size:13px;color:${BRAND.muted};">
          ⚠ If this wasn't you, ignore this email
        </p>
        `,
      ),
    });
    return true;
  } catch (err) {
    console.log("Reset OTP Error:", err);
    return false;
  }
};

/* ============================================================
   3️⃣ GENERAL EMAIL
   ============================================================ */
exports.sendGeneralEmail = async ({ email, subject, message }) => {
  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: emailWrapper(
        subject,
        `Important update from ${BRAND.name}`,
        `<p>${message}</p>`,
      ),
    });
    return true;
  } catch (err) {
    console.log("General Email Error:", err);
    return false;
  }
};

/* ============================================================
   4️⃣ LOGIN CREDENTIALS (AFTER PAYMENT)
   ============================================================ */
exports.sendLoginCredentials = async (email, password) => {
  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to ${BRAND.name}`,
      html: emailWrapper(
        `Welcome to ${BRAND.name}`,
        "Your learning journey starts now 🚀",
        `
        <p>Hi there,</p>

        <p>
          Your account has been successfully created. Use the credentials below
          to login to your dashboard:
        </p>

        <div style="
          margin:22px 0;
          padding:18px;
          background:#f5f8ff;
          border-radius:12px;
          border:1px solid #dbe5ff;
          border-left:4px solid ${BRAND.blue};
        ">
          <p style="margin:0 0 8px;">
            <strong style="color:${BRAND.navy};">Email:</strong>
            <a href="mailto:${email}" style="color:${BRAND.blue};text-decoration:none;">
              ${email}
            </a>
          </p>
          <p style="margin:0;">
            <strong style="color:${BRAND.navy};">Password:</strong> ${password}
          </p>
        </div>

        <p style="font-size:14px;">
          Please login at
          <a href="${BRAND.loginUrl}" style="color:${BRAND.blue};">
            ${BRAND.loginUrl}
          </a>
          and change your password immediately after first login.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <a href="${BRAND.loginUrl}"
            style="
              background-color:${BRAND.blue};
              background-image:${GRADIENT};
              color:#ffffff;
              padding:14px 36px;
              text-decoration:none;
              font-weight:600;
              border-radius:999px;
              display:inline-block;
            ">
            Login to Your Account
          </a>
        </div>
        `,
      ),
    });
    return true;
  } catch (err) {
    console.log("Login Credential Error:", err);
    return false;
  }
};
