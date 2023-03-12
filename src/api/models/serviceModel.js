let db = require('../config/database');

class Service {

    constructor(d) {
        if(d == null) {
            this._id = null
            this.created = null
            this._modified = null
            this._shiftType = null
            this._shiftClosed = null
        } else {
            this._id = d.id
            this.created = d.created
            this._modified = d.modified
            this._shiftType = d.shiftType
            this._shiftClosed = d.shiftClosed
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
    get shiftType() {
        return this._shiftType
    }
    get shiftClosed() {
        return this._shiftClosed
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
    set shiftType(x) {
        this._shiftType = x
    }
    set shiftClosed(x) {
        this._shiftClosed = x
    }


    // methods

}
module.exports = Service