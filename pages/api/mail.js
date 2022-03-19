const mail = require("@sendgrid/mail");
// mail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default (req, res) => {
  const body = JSON.parse(req.body);

  const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}\r\n
  `;

  const data = {
    to: "jojomangubat@gmail.com",
    from: "jojo_ma@hotmail.co.uk",
    subject: "test email",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
    templateId: "d-bc1ca22796754c4c8a2d177dbe011b88",
    dynamic_template_data: {
      user: {
        profile: {
          firstName: "Rudy",
        },
      },
    },
  };

  mail.send(data);

  res.status(200).json({ status: "Ok" });
};
