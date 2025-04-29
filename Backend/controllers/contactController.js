// controllers/contactController.js
import { transporter } from '../config/nodemailer.js';

export const contactUs = async (req, res) => {
  const { name, phone, email, message } = req.body;

  // Validate fields
  if (!name || !email || !message) {
    return res.status(400).json({ status: 'error', message: 'All fields are required' });
  }

  // Optional: Validate phone number (if provided)
  const phoneRegex = /^[0-9]{10}$/; 
  if (phone && !phoneRegex.test(phone)) {
    return res.status(400).json({ status: 'error', message: 'Invalid phone number' });
  }

  // Set up email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, 
    subject: `BidNest - Message from ${name}`,
    text: `
      Name: ${name}
      Phone: ${phone || 'N/A'}
      Email: ${email}
      Message: ${message}
    `,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 80%;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h2 {
              text-align: center;
              color: #333;
            }
            .content {
              font-size: 16px;
              color: #555;
              line-height: 1.6;
            }
            .content p {
              margin: 10px 0;
            }
            .highlight {
              font-weight: bold;
              color: #2C3E50;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              text-align: center;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>New BidNest Message</h2>
            <div class="content">
              <p><span class="highlight">Name:</span> ${name}</p>
              <p><span class="highlight">Phone:</span> ${phone || 'N/A'}</p>
              <p><span class="highlight">Email:</span> ${email}</p>
              <p><span class="highlight">Message:</span> ${message}</p>
            </div>
            <div class="footer">
              <p>Thank you for reaching out to BidNest!</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: 'ok', message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to send message' });
  }
};
