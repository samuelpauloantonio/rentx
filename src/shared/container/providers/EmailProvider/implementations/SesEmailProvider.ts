import { IEmailProvider } from '@shared/container/providers/EmailProvider/IEmailProvider';
import { SendEmailDTO } from '@shared/container/providers/EmailProvider/dto/sendEmailDTO';
import { SES } from 'aws-sdk';
import nodeMailer, { Transporter } from 'nodemailer';

import fs from 'fs';
import handleBars from 'handlebars';

export class SesEmailProvider implements IEmailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodeMailer.createTransport({
            SES: new SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_SES_REGION,
            }),
        });
    }

    async sendEmail({
        to: email,
        subject,
        variables,
        path,
    }: SendEmailDTO): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8');
        const templateParse = handleBars.compile(templateFileContent);
        const templateHTML = templateParse(variables);

        await this.client.sendMail({
            from: 'Rentx <rentx@samuelpauloantonio.tech>',
            to: `Recipient  ${email}`,
            subject,
            html: templateHTML,
        });
    }
}
