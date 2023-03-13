import { db } from '../config/database'

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
        if(d == null) {
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
    get id() : number | null {
        return this._id
    }
    get created() : Date | null {
        return this._created
    }
    get modified() : Date | null {
        return this._modified
    }
    get firstname() : string | null {
        return this._firstname
    }
    get lastname() : string | null {
        return this._lastname
    }
    get status() : boolean | null {
        return this._status
    }
    get active() : boolean | null {
        return this._active
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
    set firstname(x : string | null) {
        this._firstname = x
    }
    set lastname(x : string | null) {
        this._lastname = x
    }
    set status(x : boolean | null) {
        this._status = x
    }
    set active(x : boolean | null) {
        this._active = x
    }



    // methods

}
export { User }