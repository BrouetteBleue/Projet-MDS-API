import { db } from '../config/database'
import { User } from './userModel'
import { Table } from './tableModel'

class Service {

    // properties
    private _id: number | null
    private _created: Date | null
    private _modified: Date | null
    private _shiftType: number | null
    private _shiftClosed: boolean | null
    private _users: User[] | null


    constructor(d : Service) {
        if(d == null) {
            this._id = null
            this._created = null
            this._modified = null
            this._shiftType = null
            this._shiftClosed = null
            this._users = null
        } else {
            this._id = d.id
            this.created = d.created
            this._modified = d.modified
            this._shiftType = d.shiftType
            this._shiftClosed = d.shiftClosed
            this._users = d.users
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
    get shiftType() : number | null {
        return this._shiftType
    }
    get shiftClosed() : boolean | null {
        return this._shiftClosed
    }
    get users() : User[] | null {
        return this._users
    }


    // setters (x = value)
    set id(x : number | null) {
        this._id = x
    }
    set created(x : Date | null) {
        this._created = x
    }
    set modified(x : Date | null) {
        this._modified = x
    }
    set shiftType(x : number | null) {
        this._shiftType = x
    }
    set shiftClosed(x : boolean | null) {
        this._shiftClosed = x
    }
    set users(x : User[] | null) {
        this._users = x
    }


    // methods

    // get all services
    static getAllServices(callback: Function) {
        db.query('SELECT * FROM services', (err, result) => {
            if(err) {
                callback(err, null, 500)
            } else {
                callback(null, result, 200)
            }
        })
    }

    // get service by id

    static getServiceById(id: number, callback: Function) {
        db.query('SELECT * FROM services WHERE id = ?', [id], (err, result) => {
            if(err) {
                callback(err, null, 500)
            }
            else if(result.length == 0) {
                callback(new Error("service introuvable"), null, 404)
            } 
            else {
                callback(null, result, 200)
            }
        })
    }

    // create service
    static createService(service: Service, callback: Function) {
        db.query('INSERT INTO services (shiftType, shiftClosed) VALUES (?,?)', [service._shiftType, service._shiftClosed], (err, result) => {
            if(err) {
                callback(err, null, 500)
            }
            else {
                callback(null, result, 201)
            }
        })
    }

    // update service
    static updateService(id: number, service: Service, callback: Function) {
        db.query('UPDATE services SET shiftType = ? , shiftClosed = ? WHERE id = ?', [service._shiftType, service._shiftClosed, id], (err, result) => {
            if(err) {
                callback(err, null, 500)
            }
            else if(result.affectedRows == 0) {
                    callback(new Error("Ce service n'existe pas"), null, 404)
                }
            else {
                callback(null, result, 200)
            }
        })
    }

    // delete service
    static deleteService(id: number, callback: Function) {
        db.query('DELETE FROM services WHERE id = ?', [id], (err, result) => {
            if(err) {
                callback(err, 500)
            } 
            else if(result.affectedRows == 0) {
                callback(new Error("Ce service n'existe pas"), 404)
            }
            else {
                callback(null, 200)
            }
        })
    }

    static getTipsByService = async (service: number, callback: Function) => {
        db.query('SELECT tip.`tips`,tip.`id_restaurantTable`,`id_service`,tip.`created_at`,tip.`modified_at`, tabl.name FROM tableTips tip JOIN restauranttable tabl ON tip.id_restaurantTable = tabl.id JOIN services s ON tip.id_service = s.id WHERE tip.id_service = ?', [service], (err, result) => {
            if(err) {
                callback(err, null, 500)
            }
            else if(result.length == 0) {
                callback(new Error("Aucun pourboire pour ce service"), null, 404)
            }
            else {
                // on crée un objet table pour chaque table
                for(let i = 0; i < result.length; i++){
                    let table = new Table(result[i].id_restaurantTable, result[i].name);
                    result[i].table = table;
                }
                // ensuite on nettoie l'ojet pour ne pas avoir de doublons
                result.forEach((element: any) => {
                    delete element.id_restaurantTable;
                    delete element.name;
                });
                callback(null, result, 200)
            }
        })
    }

    static getServicesByUserId(userId: number, callback: Function) {
        db.query('SELECT S.* FROM services S INNER JOIN serviceusers SU ON S.id = SU.id_service WHERE SU.id_user = ?', [userId], (err, result) => {
            if (err) {
                callback(err, null, 500);
            }
            else if (result.length == 0) {
                callback(new Error("Aucun service trouvé"), null, 404);
            }
            else {
                callback(null, result, 200);
            }
        });
    }

    static getServicesByDate(date: string, callback: Function) {
        db.query("SELECT * FROM services WHERE DATE(created_at) = ?", [date], (err, result) => {
            if (err) {
                callback(err, null, 500);
            } else if (result.length == 0) {
                callback(new Error("Aucun service trouvé pour cette date"), null, 404);
            } else {
                callback(null, result, 200);
            }
        });
    }

    static isUserAssignedToService(serviceId: number, userId: number, callback: Function) {
        db.query('SELECT * FROM serviceusers WHERE id_service = ? AND id_user = ?', [serviceId, userId], (err, result) => {
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

    static ServiceExist(id: number, callback: Function) {
        db.query('SELECT * FROM services WHERE id = ?', [id], (err, result) => {
            if(err) {
                callback(err, false, 500)
            }
            else if(result.length == 0) {
                callback(new Error("Ce service n'existe pas."), false, 404)
            }
            else {
                callback(null, true, 200)
            }
        })
    }

    static closeService(id: number, callback: Function) {
        db.query('UPDATE services SET shiftClosed = ? WHERE id = ?', [true, id], (err, result) => {
            if(err) {
                callback(err, 500)
            }
            else if(result.affectedRows == 0) {
                callback(new Error("Ce service n'existe pas"), 404)
            }
            else {               
                callback(null, 200)
            }
        })
    }



}
export {Service}