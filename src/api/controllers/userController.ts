import { User } from '../models/userModel';

exports.list_all_services = (req, res) => {

    User.getAllUsers((err: any, user: User) => {
        if (err) {
            res.status(500);
            console.log(err);
            res.json({ message: "Erreur Serveur." });
        }
        else {
            res.status(200);
            res.json(user);
        }

    });


}

exports.list

exports.create_a_user = (req, res) => {
    const new_user = new User(req.body);

    User.createUser(new_user, (err: any, user: User) => {
        if (err) {
            res.status(500);
            console.log(err);
            res.json({ message: "Erreur Serveur." });
        }
        else {
            res.status(200);
            res.json(new_user);
        }

    });
}

exports.update_a_user = (req, res) => {
    const old_user = new User(req.body);

    User.updateUser(old_user, (err: any, user: User) => {
        if (err) {
            res.status(500);
            console.error(err);
            res.json({ message: "Erreur Serveur." });
        }
        else {
            res.status(200);
            res.json(`Utilisateur ${old_user} modifié avec enormement de succes : ${user}`);
        }

    });

}


exports.delete_a_user = (req, res) => {
    const user = new User(req.body);

    User.deleteUser(user.id, (err: any, user: User) => {
        if (err) {
            res.status(500);
            console.error(err);
            res.json({ message: "Erreur Serveur." });
        }
        else {
            res.status(200);
            res.json(`L'utilisateur a bien été supprimé`);
        }

    });
}
