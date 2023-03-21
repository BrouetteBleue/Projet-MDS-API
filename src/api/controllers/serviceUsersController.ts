import { Service } from "../models/serviceModel";
import apiResponse  from "../config/utils";
import { HttpStatusCode } from "axios";
import { User } from "../models/userModel";

exports.findAllServicesFromUser = (req, res) => {
    Service.getServicesByUserId(req.params.id,(err: Error, service: Service, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", service);
        }
    });
}

exports.addUserToService = (req, res) => {

    User.addUserToService(req.params.idService, req.params.idUser, (err: Error, result: any, status: HttpStatusCode) => {
        if (err) {
            apiResponse(res, status, err.message);
        } else {
            apiResponse(res, status, "Utilisateur ajouté au service avec succès");
        }
    });
}

exports.removeUserFromService = (req, res) => {
    User.removeUserFromService(req.params.idService, req.params.idUser, (err: Error, status: HttpStatusCode) => {
        if (err) {
            apiResponse(res, status, err.message);
        } else {
            apiResponse(res, status, "Utilisateur supprimé du service avec succès");
        }
    });
}

exports.findAllUsersFromService = (req, res) => {
    User.getUsersByServiceId(req.params.id, (err: Error, users: User, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", users);
        }
    });
}

exports.findUserInService = (req, res) => {
    User.getUserFromService(req.params.idService, req.params.idUser, (err: Error, user: User, status: HttpStatusCode) => {
        if (err) {
            apiResponse(res, status, err.message);
        } else {
            apiResponse(res, status, "", user);
        }
    });
}

