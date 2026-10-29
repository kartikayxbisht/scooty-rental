import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SITE_CONFIG } from '@/lib/data';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      bookingId,
      scooterName,
      customerName,
      customerPhone,
      customerEmail,
      licenseNumber,
      pickupLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      totalPrice,
    } = data;

    const ownerEmail = 'Ra1899490@gmail.com';
    const ownerWhatsApp = '9286535286';

    const plainTextBody = `
=============================================
NEW BOOKING RECEIVED - REHAN BIKE RENTAL
=============================================
Booking ID: #${bookingId}
Vehicle: ${scooterName}

CUSTOMER DETAILS:
- Name: ${customerName}
- Phone: ${customerPhone}
- Email: ${customerEmail}
- Driving License: ${licenseNumber}

BOOKING SCHEDULE:
- Pickup Location: ${pickupLocation}
- Shop Address: ${SITE_CONFIG.address}
- Pickup Date & Time: ${pickupDate} at ${pickupTime}
- Return Date & Time: ${returnDate} at ${returnTime}
- Total Price: ₹${totalPrice}
=============================================
`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #12334A; color: white; padding: 18px 24px; border-radius: 8px 8px 0 0; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">🛵 New Booking Notification</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #f97316;">${SITE_CONFIG.name} · Haldwani & Kathgodam</p>
        </div>
        
        <div style="padding: 24px;">
          <div style="background-color: #fff7ed; border: 1px solid #fed7aa; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; color: #9a3412;">
              <strong>Booking ID:</strong> #${bookingId} | <strong>Vehicle:</strong> ${scooterName}
            </p>
          </div>

          <h3 style="color: #12334A; margin-top: 0; font-size: 16px; border-bottom: 2px solid #f97316; padding-bottom: 6px;">Customer Information</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 140px;">Customer Name:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #111827;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Phone Number:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #111827;">
                <a href="tel:${customerPhone}" style="color: #f97316; text-decoration: none;">${customerPhone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Email Address:</td>
              <td style="padding: 8px 0; color: #111827;">${customerEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Driving License:</td>
              <td style="padding: 8px 0; font-family: monospace; font-weight: bold; color: #111827;">${licenseNumber}</td>
            </tr>
          </table>

          <h3 style="color: #12334A; margin-top: 0; font-size: 16px; border-bottom: 2px solid #f97316; padding-bottom: 6px;">Rental Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 140px;">Pickup Location:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #111827;">${pickupLocation}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Shop Address:</td>
              <td style="padding: 8px 0; color: #374151;">${SITE_CONFIG.address}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Pickup Time:</td>
              <td style="padding: 8px 0; color: #111827;">${pickupDate} at ${pickupTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Return Time:</td>
              <td style="padding: 8px 0; color: #111827;">${returnDate} at ${returnTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Total Amount:</td>
              <td style="padding: 8px 0; font-size: 18px; font-weight: bold; color: #f97316;">₹${totalPrice}</td>
            </tr>
          </table>

          <div style="background-color: #f3f4f6; padding: 12px; border-radius: 8px; text-align: center; font-size: 12px; color: #6b7280;">
            Sent automatically to ${ownerEmail} & WhatsApp ${ownerWhatsApp}
          </div>
        </div>
      </div>
    `;

    // WhatsApp Message Text
    const whatsappMessage = `*NEW BOOKING - REHAN BIKE RENTAL*
━━━━━━━━━━━━━━━━━━━
*Booking ID:* #${bookingId}
*Vehicle:* ${scooterName}

*Customer Details:*
• *Name:* ${customerName}
• *Phone:* ${customerPhone}
• *Email:* ${customerEmail}
• *License:* ${licenseNumber}

*Rental Schedule:*
• *Pickup:* ${pickupLocation}
• *From:* ${pickupDate} at ${pickupTime}
• *To:* ${returnDate} at ${returnTime}
• *Total Rent:* ₹${totalPrice}

*Shop:* ${SITE_CONFIG.address}
━━━━━━━━━━━━━━━━━━━`;

    const whatsappUrl = `https://wa.me/91${ownerWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;
    const mailtoUrl = `mailto:${ownerEmail}?subject=${encodeURIComponent(`New Booking #${bookingId} - ${customerName} (${scooterName})`)}&body=${encodeURIComponent(plainTextBody)}`;

    let emailSent = false;
    let emailError: string | null = null;

    // Check if SMTP is configured in environment variables
    const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Rehan Bike Rental" <${smtpUser}>`,
          to: ownerEmail,
          subject: `🛵 New Booking #${bookingId} - ${customerName} (${scooterName})`,
          text: plainTextBody,
          html: htmlBody,
        });

        emailSent = true;
        console.log(`[EMAIL DISPATCH] Successfully sent booking notification to ${ownerEmail}`);
      } catch (err: unknown) {
        emailError = err instanceof Error ? err.message : 'Failed to send via SMTP';
        console.error('[EMAIL ERROR] SMTP dispatch failed:', emailError);
      }
    } else {
      console.log(`[BOOKING NOTIFICATION] Email prepared for ${ownerEmail}. SMTP credentials not set; client mailto & WhatsApp links provided.`);
    }

    return NextResponse.json({
      success: true,
      bookingId,
      ownerEmail,
      ownerWhatsApp,
      emailSent,
      emailError,
      whatsappUrl,
      mailtoUrl,
    });
  } catch (error) {
    console.error('[BOOKING API ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to process booking notification' },
      { status: 500 }
    );
  }
}
