import { AppError } from '@shared/erros/AppError';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import { clientRedis } from '@shared/infra/redis';

export default async function rateLimiterMiddleware(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const rateLimiter = new RateLimiterRedis({
            storeClient: clientRedis,
            keyPrefix: 'rateLimiterMiddleware',
            points: 15,
            duration: 5,
        });
        await rateLimiter.consume(request.ip);

        next();
    } catch (error) {
        console.log(error.message);
        throw new AppError('Too many request', 429);
    }
}
