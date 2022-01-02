import { SendEmailDTO } from '@shared/container/providers/EmailProvider/dto/sendEmailDTO';

export interface IEmailProvider {
    sendEmail({ to, subject, path, variables }: SendEmailDTO): Promise<void>;
}
