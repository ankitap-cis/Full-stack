import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction } from 'express';


export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        console.log('Request...0');
        next();
    }
}