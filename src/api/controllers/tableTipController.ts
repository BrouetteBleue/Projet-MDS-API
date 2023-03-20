import { TableTip } from "../models/tableTipModel";
import apiResponse from "../config/utils";
import { HttpStatusCode } from "axios";

exports.findAll = (req, res) => {
    TableTip.getAllTableTips((err: Error, tableTips, status: HttpStatusCode) => {
        if(err){
            console.log(err);
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "", tableTips);
        }
       // err ? apiResponse(res, status, err.message)  : apiResponse(res, status, "", tableTip.table = new Table(tableTip.table));

    });
}

exports.create = (req, res) => {
    let new_tableTip = new TableTip(req.body);
    
        if(!new_tableTip.tips){
            apiResponse(res, 400, "Montant du pourboire requis.");
            return;
        } 

        if(!Number.isInteger(new_tableTip.tips)){
            apiResponse(res, 400, "Veuillez indiquer un nombre entier.", {tips: new_tableTip.tips});
            return;
        } 
        if(!new_tableTip.table){
            apiResponse(res, 400, "Veuillez indiquer sur quelle table le pourboire à été donné.");
            return;
        }
        if(!new_tableTip.service){
            apiResponse(res, 400, "Veuillez indiquer dans quel service le pourboire à été donné.");
            return;
        }


        TableTip.createTableTip(new_tableTip, (err: Error, status: HttpStatusCode) => {
            if(err){
                console.log(err);
                apiResponse(res, status, err.message);
            }
            else{
                apiResponse(res, status, "Pourboire inséré avec succès", new_tableTip);
            }

        });
     
}

exports.findOne = (req, res) => {
    TableTip.getOneTableTip(req.params.id, (err: Error, tableTip: TableTip, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
            console.log(err.message);
        }
        else{
            apiResponse(res, status, "", tableTip);
        }

    });
}

exports.update = (req, res) => {
    let updated_tableTip: TableTip = new TableTip(req.body);

    TableTip.updateTableTip(req.params.id, updated_tableTip, (err: Error, tableTip: TableTip, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
                // si la modif est ok, on renvoie le nouveau pourboire modifié avec le bon format de données
            TableTip.getOneTableTip(req.params.id, (err: Error, tableTip: TableTip, status: HttpStatusCode) => {
                if(err){
                    apiResponse(res, status, err.message);
                }
                else{
                    updated_tableTip = tableTip;
                    apiResponse(res, status, "Pourboire modifié avec succès", updated_tableTip);
                }
            });
        }
    });
}

exports.delete = (req , res) => {
    TableTip.deleteTableTip(req.params.id, (err: Error, tableTip: TableTip, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            apiResponse(res, status, "Pourboire supprimé avec succès");
        }

    });
}
