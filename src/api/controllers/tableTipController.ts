import { TableTip } from "../models/tableTipModel";
import { Table } from "../models/tableModel";
import { exit } from "process";
import apiResponse from "../config/utils";

exports.list_all_tableTips = (req, res) => {
    TableTip.getAllTableTips((err, tableTip: TableTip) => {
        // if(err){
        //     console.log(err);
        //     apiResponse(res, 500, "Erreur Serveur.");
        // }
        // else{
        //     apiResponse(res, 200, "", tableTip);
        // }
        err ? apiResponse(res, 500, "Erreur Serveur.")  : apiResponse(res, 200, "", tableTip);

    });
}

exports.create_a_tableTip = (req, res) => {
    let new_tableTip = new TableTip(req.body);

  
        //!new_tableTip.tips ?  res.status(400).json({message: "Montant du pourboire requis."}) : !Number.isInteger(new_tableTip.tips) ? res.status(400).json({message: "Veuillez indiquer un nombre entier."}) : null;
        console.log(req.body); 
        
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


        TableTip.createTableTip(new_tableTip, (err, tableTip: TableTip) => {
            if(err){
                console.log(err);
                apiResponse(res, 500, "Erreur Serveur.");
            }
            else{
                apiResponse(res, 201, "Pourboire inséré avec succès", new_tableTip);
            }

        });
     
}

exports.read_a_tableTip = (req, res) => {
    TableTip.getOneTableTip(req.params.id, (err, tableTip: TableTip) => {
        if(err){
            res.status(500);
            console.log(err);
            res.json({message: "Erreur Serveur."});
        }
        else{
            res.status(200);
            res.json(tableTip);
        }

    });
}

exports.update_a_tableTip = (req, res) => {
    TableTip.updateTableTip(req.params.id, new TableTip(req.body), (err, tableTip: TableTip) => {
        if(err){
            res.status(500);
            console.log(err);
            res.json({message: "Erreur Serveur."});
        }
        else{
            res.status(200);
            res.json(tableTip);
        }

    });
}

exports.delete_a_tableTip = (req, res) => {
    TableTip.deleteTableTip(req.params.id, (err, tableTip: TableTip) => {
        if(err){
            res.status(500);
            console.log(err);
            res.json({message: "Erreur Serveur."});
        }
        else{
            res.status(200);
            res.json({ message: 'TableTip successfully deleted' });
        }

    });
}

