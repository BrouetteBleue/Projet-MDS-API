// function to return api response with parameters

import { HttpStatusCode } from "axios";
import { Response } from "express";

// pour declarer un parametre optionnel, on met un ? apres le nom du parametre puis son type

export default function apiResponse(res: Response, status: HttpStatusCode, message: string, data?: Object) {
    const response = {
        status: status,
        message: message,
        data: data
    };
    res.status(status).json(response);
}