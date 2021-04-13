import { IStoreData } from "../vaccineSpotter/VaccineSpotter";
import nodemailer from 'nodemailer';

/**
 * Fires off an email via gmail with vaccine appointment data as well as a link to their search criteria in https://www.vaccinespotter.org
 * @param state 
 * @param zipCode 
 * @param radius 
 * @param storesWithVaccines 
 */
export function sendEmail(state:string, zipCode:string, radius:number, storesWithVaccines:IStoreData[]): void{
    let subject =`https://www.vaccinespotter.org/${state}/?zip=${zipCode}&radius=${radius} \n \n \n`;
    for(const store of storesWithVaccines){
        subject = subject + `------------------------------------\n`
        subject = subject + `NAME: ${store.properties.name}\nADDRESS: ${store.properties.address}\nURL: ${store.properties.url} \n \n`
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NOTIFICATION_SENDER_EMAIL,
          pass: process.env.NOTIFICATION_SENDER_EMAIL_PASSWORD
        }
      });
      
      const mailOptions = {
        from: process.env.NOTIFICATION_SENDER_EMAIL,
        to: process.env.DESTINATION_EMAIL,
        text: `${subject}`,
        subject: `[${storesWithVaccines.length}] New Covid 19 vaccines are available`
      };
      
      transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}