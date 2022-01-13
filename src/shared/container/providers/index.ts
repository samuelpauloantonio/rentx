import { container } from 'tsyringe';
import { IDateProviders } from '@shared/container/providers/DateDayjsProvides/IDateProviders';
import { IEmailProvider } from '@shared/container/providers/EmailProvider/IEmailProvider';
import { EtherealEmailProvider } from '@shared/container/providers/EmailProvider/implementations/EtherealEmailProvider';
import { DayjsProvider } from '@shared/container/providers/DateDayjsProvides/implementations/dayjs';
import { IStorageProvider } from './StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

container.registerSingleton<IDateProviders>('DayJsDateProvider', DayjsProvider);

container.registerInstance<IEmailProvider>(
    'EtherealEmailProvider',
    new EtherealEmailProvider(),
);

const StorageProvider = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    StorageProvider[process.env.Disk],
);
