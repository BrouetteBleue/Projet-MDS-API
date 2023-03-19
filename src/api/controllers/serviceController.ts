import { HttpStatusCode } from 'axios';
import apiResponse from '../config/utils';
import { Service } from '../models/serviceModel';
import { User } from '../models/userModel';

exports.findAll = (req, res) => {

    Service.getAllServices((err: Error, service: Service, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", service);
        }
    });
}

exports.findOne = (req, res) => {
    Service.getServiceById(req.params.id, (err: Error, service: Service, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", service);
        }
    });
}

exports.create = (req, res) => {
    const new_service = new Service(req.body);

    Service.createService(new_service, (err: Error, service: Service, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "Service créé avec succès", new_service);
        }
    });
}

exports.update = (req, res) => {
    const new_service = new Service(req.body);

    Service.updateService(req.params.id,new_service, (err: Error, service: Service, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "Service modifié avec succès", new_service);
        }

    });

}

exports.delete = (req, res) => {
    Service.deleteService(req.params.id, (err: Error, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "Service supprimé avec succès");
        }
    });
}
