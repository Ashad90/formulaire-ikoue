/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

type Data = {
  success: boolean
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { name, email, message }: { name: string; email: string; message: string } = req.body
    const msg = {
      to: 'predemona@gmail.com',
      from: 'redemonachrist@gmail.com',
      subject: `${name.toUpperCase()} Notre message de soutient`,
      text: `Email => ${email}`,
      html: `<strong>${message}</strong>`,
    }
    try {
      await sgMail.send(msg)
      res.status(200).json({ success: true })
    } catch (error) {
      console.error('Erreur lors de l"envoie d"Email :', error)
      res.status(500).json({ success: false })
    }
  }
}

