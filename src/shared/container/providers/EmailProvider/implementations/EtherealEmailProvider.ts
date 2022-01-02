import { IEmailProvider } from '@shared/container/providers/EmailProvider/IEmailProvider';
import { SendEmailDTO } from '@shared/container/providers/EmailProvider/dto/sendEmailDTO';

import nodeMailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

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

    async sendEmail({ to: email, subject, body }: SendEmailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: 'Sender Name <sender@example.com>',
            to: `Recipient  ${email}`,
            subject,
            text: body,
            html: body,
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(message));
    }
}
