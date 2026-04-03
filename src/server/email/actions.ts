'use server'

import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }
  return transporter
}

export interface EmailPayload {
  from?: string
  subject: string
  html?: string
  text?: string
}

export const sendEmail = async (data: EmailPayload) => {
  try {
    await getTransporter().sendMail({
      from: data.from ?? process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_INBOX,
      subject: data.subject,
      text: data.text,
      html: data.html,
    })
  } catch (error) {
    console.error('Email transport error:', error)
    throw new Error('Failed to send email.')
  }
}
