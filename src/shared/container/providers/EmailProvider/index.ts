import { container } from 'tsyringe';
import { IEmailProvider } from './IEmailProvider';
import { EtherealEmailProvider } from './implementations/EtherealEmailProvider';
import { SesEmailProvider } from './implementations/SesEmailProvider';

const emailProvider = {
    ethereal: container.resolve<IEmailProvider>(EtherealEmailProvider),
    ses: container.resolve<IEmailProvider>(SesEmailProvider),
};

container.registerInstance<IEmailProvider>(
    'MailProvider',
    emailProvider[process.env.MAIL_PROVIDER],
);
