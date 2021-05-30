import express from 'express';

export const loggerMiddleware = (logger: any) => {
    const onRequest: express.RequestHandler = (req, res, next) => {
        const start = new Date().getTime();
        res.on('finish', () => {
            logger.info('info', {
                httpMethod: req.method,
                url: req.url,
                parameter: req.query || '',
                statusCode: res.statusCode,
                date: new Date().toISOString(),
                latency: new Date().getTime() - start,
            });
        });
        next();
    };
    return onRequest;
};
