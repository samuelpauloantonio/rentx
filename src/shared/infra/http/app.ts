import 'dotenv/config';
import connectionDb from '@shared/infra/typeorm';
import 'reflect-metadata';
import '@shared/container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import expressSwagger from 'express-swagger-generator';
import { AppError } from '@shared/erros/AppError';
import Routes from './routes';

import swaggerFile from '../../../swagger.json';

connectionDb();
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

expressSwagger(app);

app.use(Routes);

app.use(
    (err: Error, resquest: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }
        return response.status(500).json({
            status: { error: 'error', err },
            message: `Internal server Error ${err}`,
        });
    },
);

export { app };
