import { db } from '../config/database'
import { User } from './userModel'

class TipPayment {

    // properties
    private _id: number | null
    private _created: Date | null
    private _modified: Date | null
    private _amount: number | null
    private _user: object | null


    constructor(d: TipPayment) {
        if(d == null) {
            this._id = null
            this._created = null
            this._modified = null
            this._amount = null
            this._user = null
        } else {
            this._id = d.id
            this.created = d.created
            this._modified = d.modified
            this._amount = d.amount
            this._user = d.user
        }
    }

    // getters
    get id() : number | null {
        return this._id
    }
    get created() : Date | null {
        return this._created
    }
    get modified() : Date | null {
        return this._modified
    }
    get amount() : number | null {
        return this._amount
    }
    get user() : object | null {
        return this._user
    }




    // setters (x = value)
    set id(x: number | null) {
        this._id = x
    }
    set created(x: Date | null) {
        this._created = x
    }
    set modified(x : Date | null) {
        this._modified = x
    }
    set amount(x : number | null) {
        this._amount = x
    }
    set user(x : object | null) {
        this._user = x
    }



    // methods

    // get all tip payments
    static async getAllTipPayments(callback: Function) {
        db.query('SELECT TP.id, TP.created_at, TP.modified_at, TP.amount, U.id as user_id, U.firstname, U.lastname FROM tipsPayments as TP JOIN users as U ON TP.id_user = U.id', (err, result) => {
            if(err) {
                callback(err, null, 500)
            } else {

                // on crée un objet user pour chaque user
                for(let i = 0; i < result.length; i++){
                    let user = {id: result[i].user_id, firstname: result[i].firstname,lastname: result[i].lastname};
                    result[i].user = user;
                }
                // ensuite on nettoie l'ojet pour ne pas avoir de doublons
                result.forEach((element: any) => {
                    delete element.id_user;
                    delete element.firstname;
                    delete element.lastname;
                });
                

                callback(null, result, 200)
            }
        })

    }

    // create a tip payment
    static async createTipPayment(amount: number, user: number , callback: Function) {
        
         User.userExists(user, (err, userExists: Boolean, result) => {
            if (err) {
                callback(err, null, 500);
            }
            else if (!userExists) {
                callback(new Error("L'utilisateur n'existe pas"), null, 400);
            }
            else { 
                db.query('INSERT INTO tipsPayments (amount, id_user) VALUES (?,?)', [amount,user], (err, result) => {
                    if(err) {
                        callback(err, null, 500)
                    } else {
                        callback(null, result, 200)
                    }
                })
            }
        })
    }

    // update a tip payment
    static async updateTipPayment(id: number, amount: number, user: number, callback: Function) {
        db.query('UPDATE tipsPayments SET amount = ?, id_user = ? WHERE id = ?', [amount, user, id], (err, result) => {
            if(err) {
                callback(err, null, 500)
            }
            else if(result.affectedRows == 0) {
                callback(new Error("Le paiement de pourboire n'existe pas"), null, 400)
            }
            else {
                callback(null, result, 200)
            }
        })
    }

    // delete a tip payment
    static async deleteTipPayment(id: number, callback: Function) {
        db.query('DELETE FROM tipsPayments WHERE id = ?', [id], (err, result) => {
            if(err) {
                callback(err,500)
            }
            else if(result.affectedRows == 0) {
                callback(new Error("Le paiement de pourboire n'existe pas"), 400)
            }
            else {
                callback(null, 200)
            }
        })
    }

    // get one tip payment
    static async getOneTipPayment(id: number, callback: Function) {
        db.query('SELECT TP.id, TP.created_at, TP.modified_at, TP.amount, U.id as user_id, U.firstname, U.lastname FROM tipsPayments as TP JOIN users as U ON TP.id_user = U.id WHERE TP.id = ?', [id], (err, result) => {
            if(err) {
                callback(err, null, 500)
            }
            else if(result.length == 0) {
                callback(new Error("Le paiement de pourboire n'existe pas"), null, 400)
            }
            else {
                // on crée un objet user pour chaque user
                for(let i = 0; i < result.length; i++){
                    let user = {id: result[i].user_id, firstname: result[i].firstname,lastname: result[i].lastname};
                    result[i].user = user;
                }
                // ensuite on nettoie l'ojet pour ne pas avoir de doublons
                result.forEach((element: any) => {
                    delete element.id_user;
                    delete element.firstname;
                    delete element.lastname;
                });

                callback(null, result, 200)
            }
        })
    }

    static async getSumTipsForUser(id: number, callback: Function) {
        db.query('SELECT SUM(amount) as total FROM tipsPayments WHERE id_user = ?', [id], (err, result) => {
            if(err) {
                callback(err, null, 500)
            }
            else if(result[0].total == null || result[0].total == 0) {
                callback(new Error("L'utilisateur n'a recu aucun pourboire."), null, 400)
            }
            else {
                callback(null, result, 200)
            }
        })
    }

}
export {TipPayment} 