import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import Routes from './routes';

import AppError from './erros/AppError';
import swaggerFile from './swagger.json';

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(Routes);

server.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                err: err.statusCode,
                message: err.message,
            });
        }

        return response.status(500).json({ status: err, message: err.message });
    },
);

server.listen(3333, () => {
    console.log('🚀 server is running');
});
