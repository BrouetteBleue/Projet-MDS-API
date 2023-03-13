import { db } from '../config/database'
import { Table } from './tableModel'
import { Service } from './serviceModel'

class TableTip {

    private _id: number | null
    private _created: Date | null
    private _modified: Date | null
    private _tips: number | null
    private _table: Table | null
    private _service: Service | null

    constructor(d : TableTip) {
        if(d == null) {
            this._id = null
            this.created = null
            this._modified = null
            this._tips = null
            this._table = null
            this._service = null
        } else {
            this._id = d.id
            this.created = d.created
            this._modified = d.modified
            this._tips = d.tips
            this._table = d.table
            this._service = d.service
        }
    }

    // getters
    get id() : number | null{
        return this._id
    }
    get created() : Date | null {
        return this._created
    }
    get modified() : Date | null {
        return this._modified
    }
    get tips() : number | null {
        return this._tips
    }
    get table() : Table | null {
        return this._table
    }
    get service() : Service | null {
        return this._service
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
    set tips(x : number | null) {
        this._tips = x
    }
    set table(x : Table | null) {
        this._table = x
    }
    set service(x : Service | null) {
        this._service = x
    }


    // methods

}
export {TableTip}