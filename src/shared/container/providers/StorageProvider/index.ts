import { container } from 'tsyringe';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

const StorageProvider = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    StorageProvider[process.env.Disk],
);
