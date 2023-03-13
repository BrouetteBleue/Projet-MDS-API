import { Service } from '../models/serviceModel';

exports.list_all_services = (req, res) => {

    Service.getAllServices((err, service: Service) => {
        if(err){
            res.status(500);
            console.log(err);
            res.json({message: "Erreur Serveur."});
        }
        else{
            res.status(200);
            res.json(service);
        }

    });



}

