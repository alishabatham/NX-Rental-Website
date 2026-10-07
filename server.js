import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://alishabatham2_db_user:alishabatham2004@cluster0.upabs4c.mongodb.net/nx-rental?appName=Cluster0';

mongoose
  .connect(MONGODB_URI, { dbName: 'nx-rental' })
  .then(() => console.log('✅ Connected to MongoDB Atlas - Collection: nx-rental'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Mongoose Schema for nx-rental collection
const rentalInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    interest: { type: String, default: 'General Inquiry' },
    message: { type: String, trim: true, default: '' },
    vehicleType: { type: String, default: '' },
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'New' }
  },
  { collection: 'nx-rental', timestamps: true }
);

const RentalInquiry = mongoose.models.RentalInquiry || mongoose.model('RentalInquiry', rentalInquirySchema, 'nx-rental');

// Nodemailer Transporter
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'alisha021004@gmail.com';
const SENDER_PASS = process.env.SENDER_PASS || 'wqeb kdvw agyp zdhy';
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || 'nexisparkxofficial@nexisparkx.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASS
  }
});

// Verify SMTP Connection on Startup
transporter.verify((error) => {
  if (error) {
    console.error('❌ Nodemailer Transporter Error:', error);
  } else {
    console.log('✅ Nodemailer Transporter Ready to send emails from:', SENDER_EMAIL);
  }
});

// API Routes

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    collection: 'nx-rental',
    timestamp: new Date()
  });
});

// 2. Submit Contact / Booking Inquiry
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, interest, message, vehicleType } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const customerName = name || email.split('@')[0];
    const userInterest = interest || 'I need to find a vehicle';
    const userMessage = message || 'No additional details provided.';
    const userPhone = phone || 'N/A';

    // 1. Save document to MongoDB collection: nx-rental
    const newInquiry = new RentalInquiry({
      name: customerName,
      email,
      phone: userPhone,
      interest: userInterest,
      message: userMessage,
      vehicleType: vehicleType || '',
      submittedAt: new Date()
    });

    const savedDoc = await newInquiry.save();
    console.log('📌 Saved document in nx-rental collection:', savedDoc._id);

    // 2. Send email notification to RECEIVER_EMAIL (nexisparkxofficial@nexisparkx.com)
    const adminMailOptions = {
      from: `"NX Rental System" <${SENDER_EMAIL}>`,
      to: RECEIVER_EMAIL,
      replyTo: email,
      subject: `🚘 New Rental Inquiry from ${customerName} [${userInterest}]`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #1e293b;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #334155;">
            <h1 style="color: #f97316; margin: 0; font-size: 24px; letter-spacing: -0.5px;">NX RENTAL</h1>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">New Contact & Vehicle Booking Request</p>
          </div>
          
          <div style="padding: 20px 0;">
            <p style="font-size: 15px; color: #e2e8f0;">You have received a new inquiry from the NX Rental website:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; background: #1e293b; border-radius: 8px; overflow: hidden;">
              <tr>
                <td style="padding: 12px 16px; color: #94a3b8; font-size: 13px; font-weight: bold; width: 30%;">Full Name:</td>
                <td style="padding: 12px 16px; color: #ffffff; font-size: 14px;">${customerName}</td>
              </tr>
              <tr style="border-top: 1px solid #334155;">
                <td style="padding: 12px 16px; color: #94a3b8; font-size: 13px; font-weight: bold;">Email Address:</td>
                <td style="padding: 12px 16px; color: #38bdf8; font-size: 14px;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-top: 1px solid #334155;">
                <td style="padding: 12px 16px; color: #94a3b8; font-size: 13px; font-weight: bold;">Phone Number:</td>
                <td style="padding: 12px 16px; color: #ffffff; font-size: 14px;">${userPhone}</td>
              </tr>
              <tr style="border-top: 1px solid #334155;">
                <td style="padding: 12px 16px; color: #94a3b8; font-size: 13px; font-weight: bold;">Interest / Role:</td>
                <td style="padding: 12px 16px; color: #f97316; font-size: 14px; font-weight: bold;">${userInterest}</td>
              </tr>
              ${vehicleType ? `
              <tr style="border-top: 1px solid #334155;">
                <td style="padding: 12px 16px; color: #94a3b8; font-size: 13px; font-weight: bold;">Vehicle Preferred:</td>
                <td style="padding: 12px 16px; color: #ffffff; font-size: 14px;">${vehicleType}</td>
              </tr>
              ` : ''}
              <tr style="border-top: 1px solid #334155;">
                <td style="padding: 12px 16px; color: #94a3b8; font-size: 13px; font-weight: bold;">Message:</td>
                <td style="padding: 12px 16px; color: #ffffff; font-size: 14px; line-height: 1.5;">${userMessage}</td>
              </tr>
              <tr style="border-top: 1px solid #334155;">
                <td style="padding: 12px 16px; color: #94a3b8; font-size: 13px; font-weight: bold;">Submitted At:</td>
                <td style="padding: 12px 16px; color: #cbd5e1; font-size: 13px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="border-top: 1px solid #334155; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
            <p style="margin: 0;">This email was automatically generated by NX Rental Platform.</p>
          </div>
        </div>
      `
    };

    // 3. Send automated confirmation email to user
    const userMailOptions = {
      from: `"NX Rental Team" <${SENDER_EMAIL}>`,
      to: email,
      subject: `Thank you for contacting NX Rental!`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1e293b; padding: 32px; border-radius: 12px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; padding-bottom: 24px; border-bottom: 2px solid #f97316;">
            <h2 style="color: #0f172a; margin: 0; font-size: 26px;">NX <span style="color: #f97316;">RENTAL</span></h2>
            <p style="color: #64748b; margin: 6px 0 0 0; font-size: 14px;">Vehicle Management & Rental Marketplace</p>
          </div>
          
          <div style="padding: 24px 0;">
            <h3 style="color: #0f172a; margin-top: 0;">Hello ${customerName},</h3>
            <p style="font-size: 15px; color: #334155; line-height: 1.6;">
              Thank you for reaching out to <strong>NX Rental</strong>. We have received your inquiry regarding <strong>"${userInterest}"</strong> and our team will get back to you shortly.
            </p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316; margin: 20px 0;">
              <p style="margin: 0; font-size: 13px; color: #64748b; text-transform: uppercase; font-weight: bold;">Your Inquiry Summary:</p>
              <p style="margin: 8px 0 4px 0; font-size: 14px; color: #0f172a;"><strong>Interest:</strong> ${userInterest}</p>
              <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Message:</strong> "${userMessage}"</p>
            </div>
            
            <p style="font-size: 14px; color: #64748b; line-height: 1.5;">
              If you need immediate assistance, please feel free to email us directly at <a href="mailto:${RECEIVER_EMAIL}" style="color: #f97316; text-decoration: none; font-weight: bold;">${RECEIVER_EMAIL}</a>.
            </p>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
            <p style="margin: 0;">© ${new Date().getFullYear()} NX Rental. All rights reserved.</p>
          </div>
        </div>
      `
    };

    // Send emails concurrently
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log(`📧 Notification email sent to ${RECEIVER_EMAIL} and user confirmation sent to ${email}`);

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been successfully submitted! Check your email for confirmation.',
      data: {
        id: savedDoc._id,
        name: savedDoc.name,
        email: savedDoc.email,
        interest: savedDoc.interest
      }
    });
  } catch (error) {
    console.error('❌ Error processing /api/contact request:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process inquiry. Please try again later.',
      error: error.message
    });
  }
});

// 3. Fetch Inquiries List (For live preview / dashboard)
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await RentalInquiry.find().sort({ submittedAt: -1 }).limit(50);
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 NX Rental Express Backend running on http://localhost:${PORT}`);
});
