import { createTransport } from "nodemailer";

const sendMail = async ({ email, subject, html }) => {
  const transport = createTransport({
    host: smtp.gmail.com,
    port: 465,
    auth: {
      user: "jlkaldkls",
      pass: "kjskjka",
    },
  });

  await transport.sendMail({
    from: "kksjsjdk",
    to: email,
    subject,
    html,
  });
};

export default sendMail;
