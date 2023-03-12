let db = require('../config/database');

class Tip {

    // properties
    private _id: number | null
    private _created: Date | null
    private _modified: Date | null
    private _amount: number | null
    private _user: number | null


    constructor(d: Tip) {
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
    get user() : number | null {
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
    set user(x : number | null) {
        this._user = x
    }



    // methods

}
module.exports = Tip