/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
    tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(16).toString('hex');
            const SpaceWhiteRemoved = file.originalname.replace(/\s/g, '');
            const filename = `${fileHash}-${SpaceWhiteRemoved}`;

            return callback(null, filename);
        },
    }),
};
