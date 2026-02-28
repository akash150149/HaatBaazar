import nodemailer from "nodemailer";

export async function sendReceiptEmail(userEmail, order) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials not configured. Skipping email.");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail", // You can change this to your preferred service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const itemsHtml = order.items
        .map(
            (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.title}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${item.price}</td>
    </tr>
  `
        )
        .join("");

    const mailOptions = {
        from: `"HaatBaazar" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Order Confirmation - ${order.orderId}`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #333;">Thank you for your order!</h2>
        <p>Order ID: <strong>${order.orderId}</strong></p>
        <p>Transaction ID: <strong>${order.transactionId || "N/A"}</strong></p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f8f8f8;">
              <th style="text-align: left; padding: 8px;">Product</th>
              <th style="text-align: left; padding: 8px;">Qty</th>
              <th style="text-align: left; padding: 8px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <div style="margin-top: 20px; border-top: 2px solid #333; padding-top: 10px;">
          <h3 style="text-align: right;">Total: ₹${order.subtotal}</h3>
        </div>
        <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
          Your order will be delivered to: <br>
          <em>${order.shippingAddress}</em>
        </p>
      </div>
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
