let db = require('../config/database');

class Tip {

    constructor(d) {
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
    get id() {
        return this._id
    }
    get created() {
        return this._created
    }
    get modified() {
        return this._modified
    }
    get tips() {
        return this._tips
    }
    get table() {
        return this._table
    }
    get service() {
        return this._service
    }


    // setters (x = value)
    set id(x) {
        this._id = x
    }
    set created(x) {
        this._created = x
    }
    set modified(x) {
        this._modified = x
    }
    set tips(x) {
        this._tips = x
    }
    set table(x) {
        this._table = x
    }
    set service(x) {
        this._service = x
    }


    // methods

}
module.exports = Tip