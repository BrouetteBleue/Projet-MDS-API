import { db } from '../config/database'

class Table {

    // properties
    private _id: number | null
    private _created: Date | null
    private _modified: Date | null
    private _name: string | null


    constructor(d: Table) {
        if(d == null) {
            this._id = null
            this._created = null
            this._modified = null
            this._name = null
        } else {
            this._id = d.id
            this.created = d.created
            this._modified = d.modified
            this._name = d.name
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
    get name() : string | null {
        return this._name
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
    set name(x : string | null) {
        this._name = x
    }



    // methods

}
export { Table }