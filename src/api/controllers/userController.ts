import { User } from '../models/userModel';
import apiResponse from '../config/utils';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';

exports.findAll = (req: Request, res: Response) => {

    User.getAllUsers((err: Error, user: User, status: HttpStatusCode) => {
        if (err) {
            apiResponse(res, status, err.message);
        }
        else {
            apiResponse(res, status, "", user);
        }
    });
}

exports.findOne = (req: Request, res: Response) => {
    User.getUserById(req.params.id, (err: Error, user: User, status: HttpStatusCode) => {
        if (err) {
            apiResponse(res, status, err.message);
        }
        else {
            apiResponse(res, status, "", user);
        }
    });
}

exports.create = (req: Request, res: Response) => {
    const new_user = new User(req.body);

    User.createUser(new_user, (err: Error, user: User, status: HttpStatusCode) => {
        if (err) {
            apiResponse(res, status, err.message);
        }
        else {
            apiResponse(res, status, "Utilisateur créé avec succès", new_user);
        }
    });
}

exports.update = (req: Request, res: Response) => {
    const new_user = new User(req.body);

    User.updateUser(req.params.id,new_user, (err: Error, user: User, status: HttpStatusCode) => {
        if (err) {
            apiResponse(res, status, err.message);
        }
        else {
            apiResponse(res, status, "Utilisateur modifié avec succès", new_user);
        }

    });

}


exports.delete = (req: Request, res: Response) => {
    User.deleteUser(req.params.id, (err: Error, status: HttpStatusCode) => {
        if (err) {
            apiResponse(res, status, err.message);
        }
        else {
            apiResponse(res, status, "Utilisateur supprimé avec succès");
        }

    });
}
