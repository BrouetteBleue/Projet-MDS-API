import apiResponse from "../config/utils";
import { HttpStatusCode } from "axios";
import { TableTip } from "../models/tableTipModel";
import { TipPayment } from "../models/tipPaymentModel";

exports.getSumTips = (req, res) => {
    TableTip.getSumOfTips((err: Error, sumTips, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", sumTips);
        }
    });
}

exports.getSumTipsByMonth = (req, res) => {
    TableTip.getSumOfTipsByMonth(req.params.month ,(err: Error, sumTips, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", sumTips);
        }
    });
}

exports.getSumTipsByUser = (req, res) => {
    TipPayment.getSumTipsForUser(req.params.id ,(err: Error, sumTips, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", sumTips);
        }
    });
}

exports.getAvailableTipsByMonth = (req, res) => {
    TableTip.getAvailableTipsByMonth(req.params.month ,(err: Error, sumTips, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", sumTips);
        }
    });
}

exports.getSumTipsByService = (req, res) => {
    TableTip.getSumOfTipsByService(req.params.id ,(err: Error, sumTips, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", sumTips);
        }
    });
}
