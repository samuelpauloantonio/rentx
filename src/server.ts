import './database';
import 'reflect-metadata';
import './shared/container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import expressSwagger from 'express-swagger-generator';
import Routes from './routes';

import swaggerFile from './swagger.json';
import { AppError } from './erros/AppError';

const server = express();

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

expressSwagger(server);

server.use(Routes);

server.use(
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

const port = 3337;
server.listen(port, () => {
    console.log(`🚀 server is running ${port}`);
});
