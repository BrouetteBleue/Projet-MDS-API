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

}
export {Service}