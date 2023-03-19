import apiResponse from "../config/utils";
import { HttpStatusCode } from "axios";
import { TableTip } from "../models/tableTipModel";

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
