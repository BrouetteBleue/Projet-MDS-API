import apiResponse from "../config/utils";
import { HttpStatusCode } from "axios";
import { TableTip } from "../models/tableTipModel";
import { TipPayment } from "../models/tipPaymentModel";

// get sum of all tips 
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

// get sum of all tips 
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

// get sum of all tips for a user
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

//get Available tips for a month
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

