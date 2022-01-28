import 'dotenv/config';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import cors from 'cors';
import connectionDb from '@shared/infra/typeorm';
import 'reflect-metadata';
import '@shared/container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import expressSwagger from 'express-swagger-generator';
import { AppError } from '@shared/erros/AppError';
import upload from '@config/upload';
import Routes from './routes';

import swaggerFile from '../../../swagger.json';
import rateLimiterMiddleware from './middlewares/rateLimiter';

connectionDb();
const app = express();

app.use(rateLimiterMiddleware);

// Sentry
Sentry.init({
    dsn: process.env.SENTRY_DNS,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/avatar/', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars/', express.static(`${upload.tmpFolder}/cars`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

expressSwagger(app);

app.use(Routes);
app.use(Sentry.Handlers.errorHandler());
app.use(
    cors({
        origin: '*',
    }),
);

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
