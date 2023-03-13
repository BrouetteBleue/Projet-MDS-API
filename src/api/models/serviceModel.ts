import { db } from '../config/database'
import { User } from './userModel'

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
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }

    // get all services TEST
    // static getAllServicesTest(callback: Function) {
    //     db.query('SELECT * FROM services', (err, result) => {
    //         if(err) {
    //             callback(err, null)
    //         } else {
    //             db.query('SELECT * FROM users', (err, result2) => {
    //                 if(err) {
    //                     callback(err, null)
    //                 } else {
    //                     let services: Service[] = []
    //                     for(let i = 0; i < result.length; i++) {
    //                         let service = new Service(result[i])
    //                         let users: User[] = []
    //                         for(let j = 0; j < result2.length; j++) {
    //                             let user = new User(result2[j])
    //                             if(user.serviceId == service.id) {
    //                                 users.push(user)
    //                             }
    //                         }
    //                         service.users = users
    //                         services.push(service)
    //                     }
    //                     callback(null, services)
    //                 }
    //             })
            
    //             callback(null, result)
    //         }
    //     })
    // }


    // get service by id

    static getServiceById(id: number, callback: Function) {
        db.query('SELECT * FROM services WHERE id = ?', [id], (err, result) => {
            if(err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }

    // create service
    static createService(service: Service, callback: Function) {
        db.query('INSERT INTO services SET ?', [service], (err, result) => {
            if(err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }

    // update service
    static updateService(service: Service, callback: Function) {
        db.query('UPDATE services SET ? WHERE id = ?', [service, service.id], (err, result) => {
            if(err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }

    // delete service
    static deleteService(id: number, callback: Function) {
        db.query('DELETE FROM services WHERE id = ?', [id], (err, result) => {
            if(err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }



}
export {Service}