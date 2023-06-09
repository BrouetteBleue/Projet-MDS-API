import { db } from '../config/database'
import { Service } from './serviceModel'

class User {

    // properties
    private _id: number | null
    private _created: Date | null
    private _modified: Date | null
    private _firstname: string | null
    private _lastname: string | null
    private _status: boolean | null
    private _active: boolean | null


    constructor(d: User | null) {
        if (d == null) {
            this._id = null
            this._created = null
            this._modified = null
            this._firstname = null
            this._lastname = null
            this._status = null
            this._active = null
        } else {
            this._id = d.id
            this.created = d.created
            this._modified = d.modified
            this._firstname = d.firstname
            this._lastname = d.lastname
            this._status = d.status
            this._active = d.active
        }
    }

    // getters
    get id(): number | null {
        return this._id
    }
    get created(): Date | null {
        return this._created
    }
    get modified(): Date | null {
        return this._modified
    }
    get firstname(): string | null {
        return this._firstname
    }
    get lastname(): string | null {
        return this._lastname
    }
    get status(): boolean | null {
        return this._status
    }
    get active(): boolean | null {
        return this._active
    }


    // setters (x = value)
    set id(x: number | null) {
        this._id = x
    }
    set created(x: Date | null) {
        this._created = x
    }
    set modified(x: Date | null) {
        this._modified = x
    }
    set firstname(x: string | null) {
        this._firstname = x
    }
    set lastname(x: string | null) {
        this._lastname = x
    }
    set status(x: boolean | null) {
        this._status = x
    }
    set active(x: boolean | null) {
        this._active = x
    }



    // methods

    static getAllUsers(callback: Function) {

        db.query('SELECT * FROM users', (err, result) => {
            if (err) {
                callback(err, null,500)
            } else {
                callback(null, result,200)
            }
        })

    }

    static getUserById = async (id: number, callback: Function) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
            if(err){
                callback(err, null,500)
            }
            else if(result.length == 0) {
                callback(new Error("Utilisateur introuvable"), null, 404)
            }
            else{
                callback(null, result,200)
            }
        })
    }

    static createUser(user: User, callback: Function) {
        db.query('INSERT INTO users (firstname, lastname, status, active) VALUES (?, ?, ?, ?)', [user.firstname, user.lastname, user.status, user.active], (err, result) => {
            if (err) {
                callback(err, null,500)
            } else {
                callback(null, result,201)
            }
        })

    }

    static updateUser(id: number , updatedUser: User, callback: Function) {
        db.query('UPDATE users SET firstname = ?, lastname = ?, status = ?, active = ? WHERE id = ?', [updatedUser._firstname, updatedUser._lastname, updatedUser._status, updatedUser._active, id], (err, result) => {
            if(err) {
                callback(err, null,500)
            }
            else if(result.affectedRows == 0) {
                callback(new Error("Utilisateur introuvable"), null, 404)
            }
            else{
                callback(null, result,200)
            }
        })
    }

    // static deleteUser(id: number, callback: Function) {
    //     db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    //         if(err){
    //             callback(err,500)
    //         }
    //         else if(result.affectedRows == 0) {
    //             callback(new Error("Utilisateur introuvable"), 404)
    //         }
    //         else{
    //             callback(null,200)
    //         }
    //     })
    // }

    static getUsersByServiceId(id: number, callback: Function) {
        db.query('SELECT U.* FROM users U INNER JOIN serviceusers SU ON U.id = SU.id_user WHERE SU.id_service = ?', [id], (err, result) => {
            if (err) {
                callback(err, null, 500);
            }
            else if (result.length == 0) {
                callback(new Error("Aucun utilisateur trouvé"), null, 404);
            }
            else {
                callback(null, result, 200);
            }
        });
    }

    static addUserToService(serviceId: number, userId: number, callback: Function) {
    
        User.userExists(userId, (err, userExists: Boolean, result) => {
            if (err) {
                callback(err, null, 500);
            }
            else if (!userExists) {
                callback(new Error("L'utilisateur n'existe pas"), null, 400);
            }
            else { 
                Service.isUserAssignedToService(serviceId, userId, (err,isAssigned: Boolean, result) => {
                    if (err) {
                        callback(err, null, 500);
                    }
                    else if (isAssigned) {
                        callback(new Error("L'utilisateur est déjà assigné à ce service"), null, 404);
                    }
                    else {
                        db.query('INSERT INTO serviceusers (id_service, id_user) VALUES (?, ?)', [serviceId, userId], (err, result) => {
                            if (err) {
                                callback(err, null, 500);
                            } else {
                                callback(null, result, 201);
                            }
                        });
                    }
                });
            }
        });
    }

    static removeUserFromService(serviceId: number, userId: number, callback: Function) {
        db.query('DELETE FROM serviceusers WHERE id_service = ? AND id_user = ?', [serviceId, userId], (err, result) => {
            if (err) {
                callback(err, 500);
            }
            else if (result.affectedRows == 0) {
                callback(new Error("L'utilisateur n'est pas assigné à ce service"), 404);
            }
            else {
                callback(null, 200);
            }
        });
    }

    static getUserFromService(serviceId: number, userId: number, callback: Function) {
        db.query('SELECT U.* FROM users U INNER JOIN serviceusers SU ON U.id = SU.id_user WHERE SU.id_service = ? AND SU.id_user = ?', [serviceId, userId], (err, result) => {
            if (err) {
                callback(err, null, 500);
            } else if (result.length == 0) {
                callback(new Error("Aucun utilisateur trouvé pour ce service"), null, 404);
            } else {
                callback(null, result[0], 200);
            }
        });
    }

    static userExists(userId: number, callback: Function) {
        db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
            if (err) {
                callback(err, false, 500);
            } 
            else if (result.length == 0) {
                callback(null, false, 404);
            }
            else {
                callback(null, true, 200);
            }
        });
    }

    static getAvailableSolde(user: number,callback: Function) {

        if (!user) {
            callback(new Error("Veuillez indiquer un utilisateur"), null, 500);
            return;
        }

        let totalTips = 0;
        let totalPayments = 0;

        // get tout ses services
        db.query('SELECT * FROM serviceusers WHERE id_user = ?', [user], (err, servicesUsers) => {
            if (err) {
                callback(err, null, 500);
                return;
            }
            console.log("service users = "+servicesUsers);
            
            const serviceCount = servicesUsers.length;
            console.log("service count = "+serviceCount);
            

            if (serviceCount === 0) {
                calculateSolde();
                return;
            }

            let servicesProcessed = 0;

            // pour chaque service
            servicesUsers.forEach(serviceUser => {
                const serviceId = serviceUser.id_service;

                // on récupère les tips
                db.query('SELECT * FROM tabletips WHERE id_service = ?', [serviceId], (err, tipsResult) => {
                    if (err) {
                        callback(err, null, 500);
                        return;
                    }
                    console.log("tips des services = "+tipsResult);
                    // on fait la somme des tips
                    let serviceTips = 0;
                    for (const tip of tipsResult) {
                        serviceTips += tip.tips;
                    }

                    // on récupère le nombre d'utilisateurs du service
                    db.query('SELECT COUNT(*) as user_count FROM serviceusers WHERE id_service = ?', [serviceId], (err, usersResult) => {
                        if (err) {
                            callback(err, null, 500);
                            return;
                        }
                        console.log("nb d'utilisateurs = "+usersResult);
                        const userCount = usersResult[0].user_count;

                        // on divise les tips par le nombre d'utilisateurs
                        totalTips += serviceTips / userCount;

                        servicesProcessed++;

                        if (servicesProcessed === serviceCount) {
                            calculateSolde();
                        }
                    });
                });
            });
        });

        function calculateSolde() {
            // on tout les paiements a l'utilisateur
            db.query('SELECT * FROM tipspayments WHERE id_user = ?', [user], (err, paymentsResult) => {
                if (err) {
                    callback(err, null, 500);
                    return;
                }
                console.log("paiements = "+paymentsResult);
                // on fait la somme
                for (const payment of paymentsResult) {
                    totalPayments += payment.amount;
                }

                // et on soustrait
                const availableBalance = totalTips - totalPayments;

                callback(null, availableBalance, 200);
            });
        }
    }

    static anonymiseUser(user: number, callback: Function) {

        // on get tt les utilisateur anonyme "anonyme-"
        db.query('SELECT COUNT(id) as id FROM users WHERE firstname LIKE "Anonyme-%" OR lastname LIKE "Anonyme-%"', (err, result) => {
            if (err) {
                callback(err, 500);
            } 
            else {
                let idAnonyme = result[0]["id"];
                db.query('UPDATE users SET firstname = ?, lastname = ?, active = ? WHERE id = ?', ["Anonyme-"+idAnonyme, "Anonyme-"+idAnonyme, false, user ], (err, result) => {
                    if (err) {
                        callback(err, 500);
                    }
                    else if(result.affectedRows == 0) {
                        callback(new Error("L'utilisateur n'existe pas"), 404);
                    }
                    else {
                        callback(null, 200);
                    }
                });

            }
        });
    }

}
export { User }