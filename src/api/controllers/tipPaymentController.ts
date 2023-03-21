import { TipPayment } from "../models/tipPaymentModel";
import apiResponse from "../config/utils";
import { HttpStatusCode } from "axios";

exports.findAll = (req, res) => {
    TipPayment.getAllTipPayments((err: Error, TipPayments, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", TipPayments);
        }
       // err ? apiResponse(res, status, err.message)  : apiResponse(res, status, "", TipPayment.table = new Table(TipPayment.table));

    });
}

exports.create = (req, res) => {
    let amount = req.body.amount;
    let user = req.body.user;
    
    if(!amount){
        apiResponse(res, 400, "Montant du pourboire requis.");
        return;
    } 
    TipPayment.createTipPayment(amount , user , (err: Error, TipPayment: TipPayment, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "Pourboire inséré avec succès");
        }
    });
}

// update function
exports.update = (req, res) => {
    let amount = req.body.amount;
    let user = req.body.user;
    let updated_TipPayment= new TipPayment(null);

    TipPayment.updateTipPayment(req.params.id, amount, user, (err: Error, result: TipPayment, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            
            TipPayment.getOneTipPayment(req.params.id, (err: Error, TipPayment: TipPayment, status: HttpStatusCode) => {
                if(err){
                    apiResponse(res, status, err.message);
                }
                else{
                    updated_TipPayment = TipPayment;
                    apiResponse(res, status, "Pourboire modifié avec succès", updated_TipPayment);
                }
            });
        }
    });
}


exports.findOne = (req, res) => {
    TipPayment.getOneTipPayment(req.params.id, (err: Error, TipPayment: TipPayment, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", TipPayment);
        }

    });
}

exports.delete = (req , res) => {
    TipPayment.deleteTipPayment(req.params.id, (err: Error, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "Pourboire supprimé avec succès");
        }

    });
}

