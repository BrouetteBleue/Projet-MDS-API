import { User } from '../models/userModel';

exports.list_all_services = (req, res) => {

    User.getAllUsers((err: any, user: User) => {
        if(err){
            res.status(500);
            console.log(err);
            res.json({message: "Erreur Serveur."});
        }
        else{
            res.status(200);
            res.json(user);
        }

    });


}

exports.create_a_user = (req, res) => {
    const new_user = new User(req.body);

    User.createUser(new_user, (err: any, user: User) => {
        if(err){
            res.status(500);
            console.log(err);
            res.json({message: "Erreur Serveur."});
        }
        else{
            res.status(200);
            res.json(new_user);
        }

    });
}


