import { IEmailProvider } from '@shared/container/providers/EmailProvider/IEmailProvider';
import { SendEmailDTO } from '@shared/container/providers/EmailProvider/dto/sendEmailDTO';

import nodeMailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import fs from 'fs';
import handleBars from 'handlebars';

@injectable()
export class EtherealEmailProvider implements IEmailProvider {
    private client: Transporter;

    constructor() {
        nodeMailer
            .createTestAccount()
            .then(account => {
                this.client = nodeMailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });
            })
            .catch(err => console.error(err));
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

        const message = await this.client.sendMail({
            from: 'Sender Name <sender@example.com>',
            to: `Recipient  ${email}`,
            subject,
            html: templateHTML,
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(message));
    }
}
