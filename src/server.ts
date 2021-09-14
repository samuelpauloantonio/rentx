import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import expressSwagger from 'express-swagger-generator';
import Routes from './routes';

import AppError from './erros/AppError';
import swaggerFile from './swagger.json';

const server = express();
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

expressSwagger(server);

const options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3336',
        basePath: '/v1',
        produces: ['application/json', 'application/xml'],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: '',
            },
        },
    },
    basedir: __dirname, // app absolute path
    files: ['./routes/*.ts'], // Path to the API handle folder
};

server.use(Routes);

server.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                err: err.statusCode,
                message: err.message,
            });
        }

        return response.status(500).json({ status: err, message: err.message });
    },
);

server.listen(3336, () => {
    console.log('🚀 server is running');
});
