import { db } from '../config/database'

class Admin {

    private _id: number | null
    private _created: Date | null
    private _modified: Date | null
    private _pincode: number | null

    constructor(d: Admin) {
        if(d == null) {
            this._id = null
            this._created = null
            this._modified = null
            this._pincode = null
        } else {
            this._id = d.id
            this.created = d.created
            this._modified = d.modified
            this._pincode = d.pincode
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
    get pincode() : number | null {
        return this._pincode
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
    set pincode(x : number | null) {
        this._pincode = x
    }

    // methods


    // login 
    static login = async (pincode: number, callback: Function) => {
       db.query("SELECT * FROM admin WHERE pincode = ?", [pincode] , (err, result) => {
            if(err) {
               callback(err, null, 500)
            } 
            else {
                if(result.length == 0) {
                    callback(new Error("Code pin incorrect."), null, 404)
                }
                callback(null, result[0], 200)             
            }
        })
    }

}

export { Admin }