import { IEmailProvider } from '@shared/container/providers/EmailProvider/IEmailProvider';
import { SendEmailDTO } from '@shared/container/providers/EmailProvider/dto/sendEmailDTO';

export class MailProviderInMemory implements IEmailProvider {
    EmailBox: SendEmailDTO[] = [];

    async sendEmail({
        to,
        subject,
        path,
        variables,
    }: SendEmailDTO): Promise<void> {
        this.EmailBox.push({
            to,
            subject,
            path,
            variables,
        });
    }
}
