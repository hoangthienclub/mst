import sgMail from '@sendgrid/mail';
import { sendgridApiKey } from '../helpers/constant.js';
sgMail.setApiKey(sendgridApiKey);

export const sendMail = async (config) => {
  try {
    const { to, from, subject, html } = config;
    await sgMail.send({ to, from, subject, html });
  } catch (err) {
    if (err.response) {
      console.error(err.response.body);
    }
  }
};
