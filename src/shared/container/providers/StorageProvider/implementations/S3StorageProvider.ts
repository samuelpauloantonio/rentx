import { getType } from 'mime';
import { S3 } from 'aws-sdk';
import fs from 'fs';
import { resolve } from 'path';
import upload from '@config/upload';
import { IStorageProvider } from '../IStorageProvider';

export class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    async save(file: string, folder: string): Promise<string> {
        const fileOriginalName = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(fileOriginalName);

        const fileContentType = getType(fileOriginalName);

        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: fileContentType,
            })
            .promise();

        await fs.promises.unlink(fileOriginalName);
        return file;
    }

    async delete(file: string, folder: any): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
            })
            .promise();
    }
}
