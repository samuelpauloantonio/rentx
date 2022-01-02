import { container } from 'tsyringe';
import { IDateProviders } from '@shared/container/providers/DateDayjsProvides/IDateProviders';
import { IEmailProvider } from '@shared/container/providers/EmailProvider/IEmailProvider';
import { EtherealEmailProvider } from '@shared/container/providers/EmailProvider/implementations/EtherealEmailProvider';
import { DayjsProvider } from '@shared/container/providers/DateDayjsProvides/implementations/dayjs';

container.registerSingleton<IDateProviders>('DayJsDateProvider', DayjsProvider);

container.registerInstance<IEmailProvider>(
    'EtherealEmailProvider',
    new EtherealEmailProvider(),
);
